import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, Wallet, ArrowRightLeft, Receipt, PieChart, Shield, LogOut, Menu, X, Tags, User, CreditCard, Activity, Bell, FileText, Flag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingCrops from './FloatingCrops';

const Layout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  let navLinks = [];
  
  if (user?.role === 'admin') {
    navLinks = [
      { path: '/admin', label: 'Admin Dashboard', icon: <Shield size={20} /> },
      { path: '/marketplace', label: 'Manage Inventory', icon: <Tags size={20} /> },
      { path: '/admin/financing', label: 'Financing Review', icon: <CreditCard size={20} /> },
      { path: '/admin/flagged', label: 'Fraud Monitoring', icon: <Flag size={20} /> },
      { path: '/admin/wallets', label: 'All Wallets', icon: <CreditCard size={20} /> },
      { path: '/admin/transactions', label: 'All Transactions', icon: <Activity size={20} /> },
      { path: '/admin/categories', label: 'Categories', icon: <Tags size={20} /> },
      { path: '/admin/reports', label: 'System Reports', icon: <FileText size={20} /> },
    ];
  } else {
    navLinks = [
      { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
      { path: '/marketplace', label: 'Marketplace', icon: <Tags size={20} /> },
      { path: '/financing', label: 'My Financing', icon: <CreditCard size={20} /> },
      { path: '/wallet', label: 'Wallet Vault', icon: <Wallet size={20} /> },
      { path: '/transactions', label: 'Activity Log', icon: <ArrowRightLeft size={20} /> },
      { path: '/expenses', label: 'Expenditure', icon: <Receipt size={20} /> },
      { path: '/budgets', label: 'Harvest Budget', icon: <PieChart size={20} /> },
      { path: '/reports', label: 'Wealth Reports', icon: <Activity size={20} /> },
      { path: '/notifications', label: 'Alerts', icon: <Bell size={20} /> },
      { path: '/profile', label: 'Heritage Profile', icon: <User size={20} /> },
    ];
  }

  const sidebarVariants = {
    open: { width: '280px', transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
    closed: { width: '88px', transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="min-h-screen bg-mesh flex overflow-hidden relative">
      <FloatingCrops count={8} opacity={0.03} />
      {/* Cinematic Background Glows */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-forest/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-terracotta/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      {/* Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        initial="open"
        animate={isSidebarOpen ? "open" : "closed"}
        className="relative z-20 h-[calc(100vh-2rem)] flex flex-col glass-panel border-white/20 m-4 rounded-[32px] overflow-hidden shadow-2xl bg-white/40"
      >
        <div className="p-8 flex items-center justify-between">
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-forest to-forest-light flex items-center justify-center shadow-xl border border-white/20 p-2.5 overflow-hidden">
                  <img src="/wheat_logo.png" alt="RuralPay Logo" className="w-full h-full object-contain brightness-110" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-forest-dark tracking-tighter leading-none">RuralPay</h2>
                  <span className="text-[9px] uppercase tracking-[0.2em] font-black text-forest bg-forest/10 px-2.5 py-1 rounded-full mt-1.5 inline-block">{user?.role || 'user'}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2.5 rounded-xl hover:bg-forest/5 text-forest transition-all ml-auto hover:rotate-180 duration-500"
          >
            {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <nav className="flex-1 px-5 py-6 space-y-3 overflow-y-auto overflow-x-hidden custom-scrollbar">
          {navLinks.map((link) => {
            const isActive = location.pathname.startsWith(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-500 group relative ${isActive
                    ? 'bg-forest text-wheat shadow-2xl scale-[1.02]'
                    : 'text-forest/60 hover:bg-white/60 hover:text-forest-dark'
                  }`}
                title={!isSidebarOpen ? link.label : ""}
              >
                <div className={`${isActive ? 'text-mint' : 'text-forest/40 group-hover:text-forest transition-colors duration-300'}`}>
                  {link.icon}
                </div>
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="font-bold text-sm whitespace-nowrap tracking-wide"
                    >
                      {link.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {isActive && isSidebarOpen && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute right-3 w-1.5 h-1.5 rounded-full bg-mint"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-forest/5 bg-white/20 backdrop-blur-md">
          <div className={`flex items-center gap-4 p-4 rounded-[24px] bg-white/40 border border-white/60 mb-3 ${!isSidebarOpen ? 'justify-center p-2' : ''}`}>
            <div className={`w-12 h-12 min-w-[48px] rounded-2xl overflow-hidden bg-gradient-to-br from-peach to-terracotta text-white flex items-center justify-center font-black shadow-lg border-2 border-white/20`}>
              {user?.profileImage ? (
                <img src={user.profileImage} className="w-full h-full object-cover" alt={user.name} />
              ) : (
                user?.name?.charAt(0).toUpperCase() || 'U'
              )}
            </div>
            {isSidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-forest-dark truncate leading-none mb-1">{user?.name || 'User'}</p>
                <p className="text-[10px] font-bold text-forest/40 truncate uppercase tracking-widest">{user?.email}</p>
              </div>
            )}
          </div>
          <button
            onClick={logout}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-error hover:bg-error/10 transition-all duration-300 group ${!isSidebarOpen ? 'justify-center' : ''}`}
            title={!isSidebarOpen ? "Logout" : ""}
          >
            <LogOut size={22} className="group-hover:-translate-x-1 transition-transform" />
            {isSidebarOpen && <span className="font-black text-sm uppercase tracking-widest">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto pb-12 pr-4 pl-0 lg:pl-4 pt-10 relative">
        <header className="flex justify-between items-end mb-12 ml-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="greeting"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-forest/40 mb-3 block">Rural Banking Reimagined</span>
            <h1 className="text-4xl lg:text-5xl font-black text-forest-dark tracking-tighter">
              Welcome, <span className="text-terracotta italic">{user?.name?.split(' ')[0] || 'Partner'}</span>
            </h1>
            <p className="text-forest/60 mt-2 font-medium">Cultivating your financial future, today.</p>
          </motion.div>

          <div className="flex gap-4 mr-6">
            <Link to="/notifications" className="w-12 h-12 rounded-2xl bg-white/60 border border-white/80 flex items-center justify-center text-forest shadow-sm cursor-pointer hover:bg-white transition-all">
              <Bell size={20} />
            </Link>
            <Link to="/profile" className="w-12 h-12 rounded-2xl overflow-hidden bg-white/60 border border-white/80 flex items-center justify-center text-forest shadow-sm cursor-pointer hover:bg-white transition-all">
              {user?.profileImage ? (
                <img src={user.profileImage} className="w-full h-full object-cover" alt={user.name} />
              ) : (
                <User size={20} />
              )}
            </Link>
          </div>
        </header>

        <div className="w-full h-full max-w-[1400px] mx-auto pl-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Layout;
