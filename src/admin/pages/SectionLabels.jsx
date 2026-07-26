import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { Loader2 } from 'lucide-react'

export default function SectionLabelsPage() {
  const { data, updateNested, saveData, saving } = useData()
  const [saved, setSaved] = useState(false)

  const handlePortfolio = (key, value) => {
    updateNested('sectionLabels', 'portfolio', { ...data.sectionLabels.portfolio, [key]: value })
  }

  const handleChange = (key, value) => {
    updateNested('sectionLabels', key, value)
  }

  const handleFooterChange = (key, value) => {
    updateNested('footer', key, value)
  }

  const handleSave = async () => {
    const result = await saveData()
    setSaved(result.success)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Section Labels</h1>

      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Hero Section</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Scroll Down Text</label>
              <input value={data.sectionLabels.scrollDown} onChange={e => handleChange('scrollDown', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Portfolio Section</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
              <input value={data.sectionLabels.portfolio.subtitle} onChange={e => handlePortfolio('subtitle', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input value={data.sectionLabels.portfolio.title} onChange={e => handlePortfolio('title', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Footer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input value={data.footer.name} onChange={e => handleFooterChange('name', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Copyright</label>
              <input value={data.footer.copyright} onChange={e => handleFooterChange('copyright', e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none" />
            </div>
          </div>

          <h3 className="text-md font-semibold text-gray-700 mt-4">Footer Nav Links</h3>
          {data.footer.navLinks.map((link, idx) => (
            <div key={idx} className="flex gap-3 items-center">
              <input value={link.name} onChange={e => {
                const newLinks = [...data.footer.navLinks]
                newLinks[idx] = { ...newLinks[idx], name: e.target.value }
                updateNested('footer', 'navLinks', newLinks)
              }} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-400 outline-none" placeholder="Name" />
              <input value={link.href} onChange={e => {
                const newLinks = [...data.footer.navLinks]
                newLinks[idx] = { ...newLinks[idx], href: e.target.value }
                updateNested('footer', 'navLinks', newLinks)
              }} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-400 outline-none" placeholder="#section" />
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button onClick={handleSave} disabled={saving} className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2">
            {saving ? <Loader2 className="animate-spin" size={16} /> : null}
            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
