import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { User, Code, Image, Mail, BarChart3, Download, Upload, RotateCcw } from 'lucide-react'

export default function AdminDashboard() {
  const { data, exportData, importData, resetData } = useData()
  const [importStatus, setImportStatus] = useState('')
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const stats = [
    { icon: User, label: 'Personal Info Fields', value: '10+' },
    { icon: BarChart3, label: 'About Stats', value: data.aboutStats.length },
    { icon: Code, label: 'Skills', value: data.skills.items.length },
    { icon: Image, label: 'Portfolio Items', value: data.portfolioItems.length },
    { icon: Mail, label: 'Social Links', value: data.socialLinks.length },
  ]

  const handleImport = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const success = importData(event.target.result)
      setImportStatus(success ? 'Data imported successfully!' : 'Failed to import data. Invalid JSON.')
      setTimeout(() => setImportStatus(''), 3000)
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const handleReset = () => {
    resetData()
    setShowResetConfirm(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex gap-2">
          <button onClick={exportData} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
            <Download size={16} /> Export
          </button>
          <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm cursor-pointer">
            <Upload size={16} /> Import
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
          <button onClick={() => setShowResetConfirm(true)} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">
            <RotateCcw size={16} /> Reset
          </button>
        </div>
      </div>

      {importStatus && (
        <div className={`mb-4 px-4 py-3 rounded-lg text-sm ${importStatus.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {importStatus}
        </div>
      )}

      {showResetConfirm && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm mb-3">Are you sure you want to reset all data to defaults? This cannot be undone.</p>
          <div className="flex gap-2">
            <button onClick={handleReset} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700">Yes, Reset</button>
            <button onClick={() => setShowResetConfirm(false)} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-400">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <s.icon className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{s.value}</p>
              <p className="text-sm text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Personal Info Preview</h2>
        <div className="space-y-2 text-sm">
          <p><span className="text-gray-500">Name:</span> {data.personalInfo.name}</p>
          <p><span className="text-gray-500">Title:</span> {data.personalInfo.jobTitle}</p>
          <p><span className="text-gray-500">Email:</span> {data.contactInfo.email}</p>
          <p><span className="text-gray-500">WhatsApp:</span> {data.contactInfo.whatsapp}</p>
          <p><span className="text-gray-500">Skills:</span> {data.skills.items.join(', ')}</p>
        </div>
      </div>
    </div>
  )
}
