import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { Plus, Trash2 } from 'lucide-react'

export default function SkillsPage() {
  const { data, updateNested } = useData()
  const [saved, setSaved] = useState(false)
  const [newSkill, setNewSkill] = useState('')
  const skills = data.skills

  const handleChange = (field, value) => {
    updateNested('skills', field, value)
  }

  const addSkill = () => {
    if (!newSkill.trim()) return
    handleChange('items', [...skills.items, newSkill.trim()])
    setNewSkill('')
  }

  const removeSkill = (index) => {
    handleChange('items', skills.items.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Skills</h1>
      <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section Heading</label>
            <input value={skills.heading} onChange={e => handleChange('heading', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
            <input value={skills.title} onChange={e => handleChange('title', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sub Heading</label>
            <input value={skills.subHeading} onChange={e => handleChange('subHeading', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none" />
          </div>
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input value={skills.description} onChange={e => handleChange('description', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Skill Items</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {skills.items.map((skill, index) => (
              <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                {skill}
                <button onClick={() => removeSkill(index)} className="hover:text-red-600"><Trash2 size={14} /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={newSkill} onChange={e => setNewSkill(e.target.value)} onKeyDown={e => e.key === 'Enter' && addSkill()} placeholder="Add a skill..." className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none text-sm" />
            <button onClick={addSkill} className="flex items-center gap-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm"><Plus size={16} /> Add</button>
          </div>
        </div>

        <div className="flex justify-end">
          <button onClick={handleSave} className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
