import React from 'react';
import { LayoutDashboard, ShoppingCart, Settings, Hammer, FileSpreadsheet, BarChart3, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SidebarItem = ({ id, label, icon: Icon, active, onClick }: any) => (
  <button
    onClick={() => onClick(id)}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      active 
      ? 'bg-blue-600 text-white shadow-md' 
      : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium text-sm">{label}</span>
  </button>
);

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 right-0 z-50 w-64 bg-white border-l border-gray-200 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        md:relative md:translate-x-0
      `}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
                R
              </div>
              <div>
                <h1 className="font-bold text-gray-800 text-lg">شرکت رنا</h1>
                <p className="text-xs text-gray-500">تولید درب‌های سکشنال</p>
              </div>
            </div>
            <button className="md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            <SidebarItem id="dashboard" label="داشبورد مدیریت" icon={LayoutDashboard} active={activeTab === 'dashboard'} onClick={setActiveTab} />
            <SidebarItem id="orders" label="سفارشات تولید" icon={ShoppingCart} active={activeTab === 'orders'} onClick={setActiveTab} />
            <SidebarItem id="bom" label="مدیریت BOM" icon={FileSpreadsheet} active={activeTab === 'bom'} onClick={setActiveTab} />
            <SidebarItem id="production" label="برنامه‌ریزی تولید" icon={Hammer} active={activeTab === 'production'} onClick={setActiveTab} />
            <SidebarItem id="costing" label="بهای تمام شده" icon={BarChart3} active={activeTab === 'costing'} onClick={setActiveTab} />
          </nav>

          <div className="p-4 border-t border-gray-100">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <p className="text-sm text-blue-800 font-medium mb-1">وضعیت سیستم</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs text-blue-600">آنلاین و پایدار</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white h-16 border-b border-gray-200 flex items-center justify-between px-6 shadow-sm z-10">
          <button className="md:hidden text-gray-600" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
          <div className="mr-auto flex items-center gap-4">
             <div className="text-left hidden sm:block">
                <p className="text-sm font-semibold text-gray-800">مهندس محمدی</p>
                <p className="text-xs text-gray-500">مدیر تولید</p>
             </div>
             <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden">
                <img src="https://picsum.photos/100/100" alt="Avatar" className="w-full h-full object-cover" />
             </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
      
      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Layout;