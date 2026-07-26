import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase.js'

const DataContext = createContext()

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'

async function getAuthHeaders() {
  const { data } = await supabase.auth.getSession()
  if (data?.session?.access_token) {
    return { Authorization: `Bearer ${data.session.access_token}`, 'Content-Type': 'application/json' }
  }
  return { 'Content-Type': 'application/json' }
}

async function fetchPortfolio() {
  const res = await fetch(`${API_URL}/portfolio`)
  if (!res.ok) throw new Error('Failed to fetch portfolio')
  const result = await res.json()
  return result
}

const EMPTY_DATA = {
  personalInfo: {
    name: '', jobTitle: '', greeting: '', bio: '',
    profileImage: null, resumeURL: null, resumeFileName: '',
    aboutSectionTitle: '', aboutSectionHeading: '',
    contactButtonLabel: '', downloadCVLabel: '', aboutButtonLabel: ''
  },
  aboutStats: [],
  skills: { heading: '', title: '', subHeading: '', description: '', items: [] },
  portfolioTabs: [{ id: 1, tabName: 'All' }, { id: 2, tabName: 'App' }, { id: 3, tabName: 'Web' }],
  portfolioItems: [],
  demoImageSets: {},
  contactInfo: {
    sectionSubtitle: '', sectionTitle: '', connectHeading: '', formHeading: '',
    email: '', whatsapp: '', whatsappLink: '', linkedinUsername: '', linkedinUrl: '',
    emailLink: '', mailAction: '', textAction: '', writeAction: '',
    formNameLabel: '', formEmailLabel: '', formMessageLabel: '',
    privacyNote: '', sendButtonLabel: '', toEmail: ''
  },
  emailJS: { serviceId: '', templateId: '', publicKey: '' },
  socialLinks: [],
  footer: { name: '', copyright: '', navLinks: [] },
  bottomNav: [],
  sectionLabels: { portfolio: { subtitle: '', title: '' }, scrollDown: '' }
}

function mapDBToFrontend(dbData) {
  if (!dbData || Object.keys(dbData).length === 0) return EMPTY_DATA
  return {
    personalInfo: { ...EMPTY_DATA.personalInfo, ...(dbData.personal_info || {}) },
    aboutStats: Array.isArray(dbData.about_stats) ? dbData.about_stats : [],
    skills: { ...EMPTY_DATA.skills, ...(dbData.skills || {}) },
    portfolioTabs: EMPTY_DATA.portfolioTabs,
    portfolioItems: Array.isArray(dbData.portfolio_items) ? dbData.portfolio_items : [],
    demoImageSets: dbData.demoImageSets || {},
    contactInfo: { ...EMPTY_DATA.contactInfo, ...(dbData.contact_info || {}) },
    emailJS: { ...EMPTY_DATA.emailJS, ...(dbData.emailjs || {}) },
    socialLinks: Array.isArray(dbData.social_links) ? dbData.social_links : [],
    footer: { ...EMPTY_DATA.footer, ...(dbData.footer || {}) },
    bottomNav: Array.isArray(dbData.bottom_nav) ? dbData.bottom_nav : [],
    sectionLabels: { ...EMPTY_DATA.sectionLabels, ...(dbData.section_labels || {}) },
  }
}

function mapFrontendToDB(data) {
  return {
    personal_info: data.personalInfo,
    about_stats: data.aboutStats,
    skills: data.skills,
    portfolio_items: data.portfolioItems,
    contact_info: data.contactInfo,
    emailjs: data.emailJS,
    social_links: data.socialLinks,
    footer: data.footer,
    bottom_nav: data.bottomNav,
    section_labels: data.sectionLabels,
  }
}

export function DataProvider({ children }) {
  const [data, setData] = useState(EMPTY_DATA)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPortfolio()
      .then((result) => {
        setData(mapDBToFrontend(result))
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load portfolio:', err)
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const updateData = (section, value) => {
    setData(prev => ({ ...prev, [section]: value }))
  }

  const updateNested = (section, key, value) => {
    setData(prev => ({ ...prev, [section]: { ...prev[section], [key]: value } }))
  }

  const saveData = async () => {
    setSaving(true)
    const headers = await getAuthHeaders()
    if (!headers.Authorization) {
      setSaving(false)
      return { success: false, error: 'Not authenticated' }
    }
    const dbData = mapFrontendToDB(data)
    try {
      const res = await fetch(`${API_URL}/portfolio`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(dbData),
      })
      setSaving(false)
      if (!res.ok) {
        const text = await res.text()
        return { success: false, error: text }
      }
      return { success: true }
    } catch (e) {
      setSaving(false)
      return { success: false, error: e.message }
    }
  }

  const resetData = async () => {
    setData(EMPTY_DATA)
    const headers = await getAuthHeaders()
    try {
      await fetch(`${API_URL}/portfolio/reset`, { method: 'POST', headers })
    } catch (e) {
      console.error('Reset error:', e)
    }
  }

  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'portfolio-data.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const importData = async (jsonData) => {
    try {
      const parsed = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData
      setData(parsed)
      const headers = await getAuthHeaders()
      if (!headers.Authorization) return false
      const dbData = mapFrontendToDB(parsed)
      const res = await fetch(`${API_URL}/portfolio`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(dbData),
      })
      if (!res.ok) throw new Error('Import failed')
      return true
    } catch (e) {
      console.error('Import error:', e)
      return false
    }
  }

  return (
    <DataContext.Provider value={{ data, updateData, updateNested, saveData, resetData, exportData, importData, loading, saving, error }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
