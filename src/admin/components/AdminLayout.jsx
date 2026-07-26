import { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../../context/AdminAuthContext'
import { LayoutDashboard, User, BarChart3, Code, Image, Link2, Mail, Tags, LogOut, Menu, X, FileImage } from 'lucide-react'

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/personal-info', icon: User, label: 'Personal Info' },
  { to: '/admin/about-stats', icon: BarChart3, label: 'About Stats' },
  { to: '/admin/skills', icon: Code, label: 'Skills' },
  { to: '/admin/portfolio-items', icon: Image, label: 'Portfolio Items' },
  { to: '/admin/demo-images', icon: FileImage, label: 'Demo Images' },
  { to: '/admin/social-links', icon: Link2, label: 'Social Links' },
  { to: '/admin/contact-info', icon: Mail, label: 'Contact Info' },
  { to: '/admin/section-labels', icon: Tags, label: 'Section Labels' },
]

export default function AdminLayout() {
  const { logout } = useAdminAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-indigo-900 text-white transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-indigo-800">
          <h1 className="text-xl font-bold">Portfolio CRM</h1>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X size={24} />
          </button>
        </div>
        <nav className="p-4 space-y-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 80px)' }}>
          {navItems.map(item => {
            const isActive = item.end ? location.pathname === item.to : location.pathname.startsWith(item.to)
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'}`}
              >
                <item.icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            )
          })}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-indigo-200 hover:bg-red-600 hover:text-white transition-colors w-full mt-4"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </nav>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
            <Menu size={24} />
          </button>
          <a href="/" target="_blank" className="text-sm text-indigo-600 hover:underline">View Website →</a>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
