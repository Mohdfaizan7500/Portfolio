import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { Plus, Trash2, Edit2, X, Check } from 'lucide-react'

export default function PortfolioItemsPage() {
  const { data, updateData } = useData()
  const [saved, setSaved] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({ title: '', category: 'App', link: '', demoLink: '', description: '', demoSetKey: '' })

  const items = data.portfolioItems
  const demoKeys = Object.keys(data.demoImageSets)

  const resetForm = () => {
    setForm({ title: '', category: 'App', link: '', demoLink: '', description: '', demoSetKey: '' })
    setEditingId(null)
    setShowForm(false)
  }

  const handleEdit = (item) => {
    setForm({ title: item.title, category: item.category, link: item.link, demoLink: item.demoLink || '', description: item.description || '', demoSetKey: item.demoSetKey || '' })
    setEditingId(item.id)
    setShowForm(true)
  }

  const handleSubmit = () => {
    if (!form.title.trim()) return
    if (editingId) {
      updateData('portfolioItems', items.map(i => i.id === editingId ? { ...i, ...form } : i))
    } else {
      const newId = items.length ? Math.max(...items.map(i => i.id)) + 1 : 1
      updateData('portfolioItems', [...items, { id: newId, image: null, ...form }])
    }
    resetForm()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const deleteItem = (id) => {
    updateData('portfolioItems', items.filter(i => i.id !== id))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Portfolio Items</h1>
        <button onClick={() => { resetForm(); setShowForm(true) }} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm">
          <Plus size={16} /> Add Item
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">{editingId ? 'Edit Item' : 'Add New Item'}</h2>
            <button onClick={resetForm}><X size={20} className="text-gray-500 hover:text-gray-700" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none">
                <option>App</option>
                <option>Web</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Link</label>
              <input value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Demo Link</label>
              <input value={form.demoLink} onChange={e => setForm({ ...form, demoLink: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Demo Image Set</label>
              <select value={form.demoSetKey} onChange={e => setForm({ ...form, demoSetKey: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none">
                <option value="">None</option>
                {demoKeys.map(key => <option key={key} value={key}>{data.demoImageSets[key]?.label || key}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none" />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={resetForm} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">Cancel</button>
            <button onClick={handleSubmit} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm">
              {editingId ? 'Update' : 'Add'} Item
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Title</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Category</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Demo Set</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map(item => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{item.title}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${item.category === 'App' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                    {item.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{item.demoSetKey || '-'}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => handleEdit(item)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 size={16} /></button>
                  <button onClick={() => deleteItem(item.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg ml-1"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
