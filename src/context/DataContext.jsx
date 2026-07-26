import { createContext, useContext, useState, useEffect } from 'react'

const DataContext = createContext()

const DEFAULT_DATA = {
  personalInfo: {
    name: "Mohd Faizan Khan",
    jobTitle: "React Native Developer",
    greeting: "Hello, I'm",
    bio: "Hello, I'm Faizan. As a React Native Developer, I specialize in developing high-performance mobile applications using JavaScript and React Native. My skill set includes creating responsive UIs, integrating RESTful APIs, implementing native modules, and optimizing app performance. I thrive on solving complex problems and delivering robust mobile solutions.",
    profileImage: null,
    resumeURL: null,
    resumeFileName: "Mohd_Faizan_Khan_CV.pdf",
    aboutSectionTitle: "My Intro",
    aboutSectionHeading: "About Me",
    contactButtonLabel: "Contact me",
    downloadCVLabel: "Download CV",
    aboutButtonLabel: "About"
  },
  aboutStats: [
    { id: 1, title: "Experience", des: "1+ Years Working", icon: "award" },
    { id: 2, title: "Projects", des: "4+ Completed", icon: "bag" },
    { id: 3, title: "Clients", des: "2+ Happy Clients", icon: "support" }
  ],
  skills: {
    heading: "My Abilities",
    title: "My Experience",
    subHeading: "My Technical Stack",
    description: "Proficient in these technologies for creating modern, responsive applications",
    items: ['JavaScript', 'HTML', 'CSS', 'React Native', 'React', 'Tailwind CSS', 'Postman', 'Git', 'Github']
  },
  portfolioTabs: [
    { id: 1, tabName: 'All' },
    { id: 2, tabName: 'App' },
    { id: 3, tabName: 'Web' }
  ],
  portfolioItems: [
    {
      id: 1, title: 'Grocery App', category: 'App',
      link: 'https://github.com/rohitrkvarathe111/APP_TTB_Project',
      demoLink: 'https://grocery-app-demo.com', image: null, description: '',
      demoSetKey: 'grocery'
    },
    {
      id: 2, title: 'Notery Mate Web', category: 'Web',
      link: 'https://notarymate.in/',
      demoLink: '', image: null, description: '',
      demoSetKey: 'notary'
    },
    {
      id: 3, title: 'Notary Mate', category: 'App',
      link: 'https://github.com/lumetechgit/Notarymate-App-New',
      demoLink: 'https://notarymate-demo.com', image: null, description: '',
      demoSetKey: 'notary'
    },
    {
      id: 4, title: 'Lumetech Website', category: 'Web',
      link: 'https://lumetech.info/',
      demoLink: '', image: null, description: '',
      demoSetKey: ''
    },
    {
      id: 5, title: 'Todo List App', category: 'App',
      link: 'https://github.com/Mohdfaizan7500/ToDo',
      demoLink: 'https://todo-app-demo.com', image: null, description: '',
      demoSetKey: 'todo'
    },
    {
      id: 6, title: 'TopTenBazar website', category: 'Web',
      link: 'https://toptenbazar.in/',
      demoLink: '', image: null, description: '',
      demoSetKey: 'grocery'
    },
    {
      id: 7, title: 'Learnlyst', category: 'App',
      link: 'https://gitlab.com/dashboard/projects',
      demoLink: 'https://lernlyst-demo.com', image: null, description: '',
      demoSetKey: 'learnlyst'
    }
  ],
  demoImageSets: {
    notary: { label: 'Notary App', images: [] },
    grocery: { label: 'Grocery App', images: [] },
    learnlyst: { label: 'Learnlyst App', images: [] },
    todo: { label: 'ToDo App', images: [] }
  },
  contactInfo: {
    sectionSubtitle: "Get in touch",
    sectionTitle: "Contact Me",
    connectHeading: "Connect with me",
    formHeading: "Send me a message",
    email: "faizanpatha34@gmail.com",
    whatsapp: "+91 7078254220",
    whatsappLink: "https://wa.me/917078254220?text=Hello%20Faizan,%20I%20would%20like%20to%20connect%20with%20you",
    linkedinUsername: "mohd-faizan-khan-924211244",
    linkedinUrl: "https://www.linkedin.com/in/mohd-faizan-khan-924211244/",
    emailLink: "mailto:faizanpatha34@gmail.com?subject=Hello%20Faizan&body=I%20would%20like%20to%20connect%20with%20you",
    mailAction: "Mail me",
    textAction: "Text me",
    writeAction: "Write me",
    formNameLabel: "Your Name",
    formEmailLabel: "Your Email",
    formMessageLabel: "Your Message",
    privacyNote: "Your information is secure. I'll only use it to respond to your message.",
    sendButtonLabel: "Send Message",
    toEmail: "mohdfaizankhan7500F@gmail.com"
  },
  emailJS: {
    serviceId: 'service_zfhwpwe',
    templateId: 'template_w3nir4i',
    publicKey: 'MW7cCi7GZ9Wbyjkxm'
  },
  socialLinks: [
    { platform: 'linkedin', url: 'https://linkedin.com/in/mohd-faizan-khan-924211244', title: 'Connect on LinkedIn', active: true },
    { platform: 'github', url: 'https://github.com/Mohdfaizan7500', title: 'View GitHub Profile', active: true },
    { platform: 'instagram', url: 'https://instagram.com/pathan_sahab__91/', title: 'Follow on Instagram', active: true },
    { platform: 'whatsapp', url: 'https://wa.me/+917078254220', title: 'WhatsApp', active: true }
  ],
  footer: {
    name: "Mohd Faizan Khan",
    copyright: "© 2023 SSPK@. All rights reserved.",
    navLinks: [
      { name: 'Home', href: '#home' },
      { name: 'About', href: '#about' },
      { name: 'Skill', href: '#skills' },
      { name: 'Work', href: '#work' },
      { name: 'Contact', href: '#contact' }
    ]
  },
  bottomNav: [
    { id: 1, label: 'Home', href: '#home', key: 'home', icon: 'Home' },
    { id: 2, label: 'About', href: '#about', key: 'about', icon: 'User' },
    { id: 4, label: 'Skills', href: '#skills', key: 'skills', icon: 'FileText' },
    { id: 3, label: 'Work', href: '#work', key: 'work', icon: 'Briefcase' },
    { id: 5, label: 'Contact', href: '#contact', key: 'contact', icon: 'Mail' }
  ],
  sectionLabels: {
    portfolio: { subtitle: "My Portfolio", title: "Recent Works" },
    scrollDown: "Scroll Down"
  }
}

export function DataProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolioData')
      if (saved) {
        const parsed = JSON.parse(saved)
        return { ...DEFAULT_DATA, ...parsed, demoImageSets: { ...DEFAULT_DATA.demoImageSets, ...parsed.demoImageSets } }
      }
    } catch (e) { }
    return DEFAULT_DATA
  })

  useEffect(() => {
    try {
      localStorage.setItem('portfolioData', JSON.stringify(data))
    } catch (e) { }
  }, [data])

  const updateData = (section, value) => {
    setData(prev => ({ ...prev, [section]: value }))
  }

  const updateNested = (section, key, value) => {
    setData(prev => ({
      ...prev,
      [section]: { ...prev[section], [key]: value }
    }))
  }

  const resetData = () => {
    setData(DEFAULT_DATA)
    localStorage.removeItem('portfolioData')
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

  const importData = (jsonData) => {
    try {
      const parsed = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData
      setData({ ...DEFAULT_DATA, ...parsed })
      return true
    } catch (e) {
      return false
    }
  }

  return (
    <DataContext.Provider value={{ data, updateData, updateNested, resetData, exportData, importData }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
