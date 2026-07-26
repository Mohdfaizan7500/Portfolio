import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { Plus, Trash2, GripVertical } from 'lucide-react'

const iconOptions = [
  { value: 'award', label: 'Award' },
  { value: 'bag', label: 'Bag' },
  { value: 'support', label: 'Support' },
  { value: 'star', label: 'Star' },
  { value: 'heart', label: 'Heart' },
  { value: 'code', label: 'Code' },
]

export default function AboutStats() {
  const { data, updateData } = useData()
  const [saved, setSaved] = useState(false)

  const stats = data.aboutStats

  const handleChange = (id, field, value) => {
    updateData('aboutStats', stats.map(s => s.id === id ? { ...s, [field]: value } : s))
  }

  const addStat = () => {
    const newId = stats.length ? Math.max(...stats.map(s => s.id)) + 1 : 1
    updateData('aboutStats', [...stats, { id: newId, title: '', des: '', icon: 'award' }])
  }

  const deleteStat = (id) => {
    updateData('aboutStats', stats.filter(s => s.id !== id))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">About Stats</h1>
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
        {stats.map((stat, index) => (
          <div key={stat.id} className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg">
            <div className="mt-3 text-gray-400"><GripVertical size={20} /></div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Title</label>
                <input value={stat.title} onChange={e => handleChange(stat.id, 'title', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-400 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                <input value={stat.des} onChange={e => handleChange(stat.id, 'des', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-400 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Icon</label>
                <select value={stat.icon} onChange={e => handleChange(stat.id, 'icon', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-400 outline-none">
                  {iconOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
              <div className="flex items-end">
                <button onClick={() => deleteStat(stat.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between">
          <button onClick={addStat} className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
            <Plus size={16} /> Add Stat
          </button>
          <button onClick={handleSave} className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
