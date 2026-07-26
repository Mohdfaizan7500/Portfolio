import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { Plus, Trash2, GripVertical, Loader2 } from 'lucide-react'

const platformOptions = ['linkedin', 'github', 'instagram', 'whatsapp', 'twitter', 'youtube', 'facebook']

export default function SocialLinksPage() {
  const { data, updateData, saveData, saving } = useData()
  const [saved, setSaved] = useState(false)

  const links = data.socialLinks

  const handleChange = (index, field, value) => {
    updateData('socialLinks', links.map((l, i) => i === index ? { ...l, [field]: value } : l))
  }

  const addLink = () => {
    updateData('socialLinks', [...links, { platform: 'twitter', url: '', title: '', active: true }])
  }

  const deleteLink = (index) => {
    updateData('socialLinks', links.filter((_, i) => i !== index))
  }

  const toggleActive = (index) => {
    handleChange(index, 'active', !links[index].active)
  }

  const handleSave = async () => {
    const result = await saveData()
    setSaved(result.success)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Social Links</h1>
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
        {links.map((link, index) => (
          <div key={index} className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg">
            <div className="mt-3 text-gray-400"><GripVertical size={20} /></div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Platform</label>
                <select value={link.platform} onChange={e => handleChange(index, 'platform', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-400 outline-none">
                  {platformOptions.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">URL</label>
                <input value={link.url} onChange={e => handleChange(index, 'url', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-400 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Title</label>
                <input value={link.title} onChange={e => handleChange(index, 'title', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-400 outline-none" />
              </div>
              <div className="flex items-end gap-2">
                <button onClick={() => toggleActive(index)} className={`px-3 py-2 rounded-lg text-xs font-medium ${link.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {link.active ? 'Active' : 'Inactive'}
                </button>
                <button onClick={() => deleteLink(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
              </div>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between">
          <button onClick={addLink} className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
            <Plus size={16} /> Add Link
          </button>
          <button onClick={handleSave} disabled={saving} className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2">
            {saving ? <Loader2 className="animate-spin" size={16} /> : null}
            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
