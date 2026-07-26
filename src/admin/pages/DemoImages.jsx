import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { useAdminAuth } from '../../context/AdminAuthContext'
import { Plus, Trash2, Upload, Loader2 } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'

export default function DemoImagesPage() {
  const { data, updateData, saveData, saving } = useData()
  const { getToken } = useAdminAuth()
  const [saved, setSaved] = useState(false)
  const [selectedSet, setSelectedSet] = useState('notary')
  const [newLabel, setNewLabel] = useState('')

  const sets = data.demoImageSets
  const currentSet = sets[selectedSet] || { label: '', images: [] }

  const handleLabelChange = (key) => {
    updateData('demoImageSets', {
      ...sets,
      [key]: { ...sets[key], label: newLabel || sets[key].label }
    })
  }

  const addImages = async (key, files) => {
    if (!files.length) return
    const token = getToken()
    if (!token) return

    const formData = new FormData()
    formData.append('setKey', key)
    for (const file of files) {
      formData.append('images', file)
    }

    try {
      const res = await fetch(`${API_URL}/demo-images/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })
      if (!res.ok) throw new Error('Upload failed')
      const result = await res.json()
      const newImages = result.images.map(img => img.image_data)
      updateData('demoImageSets', {
        ...sets,
        [key]: { ...sets[key], images: [...(sets[key]?.images || []), ...newImages] }
      })
    } catch (e) {
      console.error('Upload error:', e)
    }
  }

  const removeImage = async (key, index) => {
    const token = getToken()
    if (!token) return

    const imageData = currentSet.images[index]
    try {
      const res = await fetch(`${API_URL}/demo-images/set/${key}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error('Delete failed')
    } catch (e) {
      console.error('Delete error:', e)
    }

    const updated = sets[key].images.filter((_, i) => i !== index)
    updateData('demoImageSets', {
      ...sets,
      [key]: { ...sets[key], images: updated }
    })
  }

  const addNewSet = () => {
    const key = prompt('Enter a unique key for the new image set (e.g., myapp):')
    if (key && !sets[key]) {
      updateData('demoImageSets', {
        ...sets,
        [key]: { label: key, images: [] }
      })
      setSelectedSet(key)
    }
  }

  const deleteSet = (key) => {
    if (Object.keys(sets).length <= 1) return
    const { [key]: _, ...rest } = sets
    updateData('demoImageSets', rest)
    setSelectedSet(Object.keys(rest)[0])
  }

  const handleSave = async () => {
    const result = await saveData()
    setSaved(result.success)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Demo Images</h1>
        <button onClick={addNewSet} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm">
          <Plus size={16} /> New Set
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
        <div className="flex flex-wrap gap-2">
          {Object.keys(sets).map(key => (
            <button
              key={key}
              onClick={() => setSelectedSet(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedSet === key ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {sets[key].label || key}
              <span className="ml-2 text-xs opacity-60">({sets[key].images.length})</span>
            </button>
          ))}
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-500 mb-1">Set Label</label>
              <input value={newLabel || currentSet.label} onChange={e => setNewLabel(e.target.value)} onBlur={() => handleLabelChange(selectedSet)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-400 outline-none" />
            </div>
            <div className="flex items-end gap-2">
              <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm cursor-pointer">
                <Upload size={16} /> Upload Images
                <input type="file" multiple accept="image/*" onChange={e => { addImages(selectedSet, e.target.files); e.target.value = '' }} className="hidden" />
              </label>
              {Object.keys(sets).length > 1 && (
                <button onClick={() => deleteSet(selectedSet)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {currentSet.images.map((img, index) => (
              <div key={index} className="relative group aspect-[9/16] bg-gray-100 rounded-lg overflow-hidden">
                <img src={img} alt={`${selectedSet} ${index}`} className="w-full h-full object-cover" />
                <button onClick={() => removeImage(selectedSet, index)} className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 size={14} />
                </button>
                <span className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-2 py-0.5 rounded">{index + 1}</span>
              </div>
            ))}
            {currentSet.images.length === 0 && (
              <div className="col-span-full text-center py-8 text-gray-400 text-sm">No images uploaded yet. Click "Upload Images" to add screenshots.</div>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button onClick={handleSave} disabled={saving} className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2">
            {saving ? <Loader2 className="animate-spin" size={16} /> : null}
            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
