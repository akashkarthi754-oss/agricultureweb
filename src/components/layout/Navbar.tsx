import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  Sprout,
  ShoppingBag,
  PlusCircle,
  Truck,
  Briefcase,
  Bell,
  ShoppingCart,
  Globe,
  Menu,
  X,
  Compass,
  CheckCircle2,
  ChevronDown,
  Activity,
  Layers,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    t,
    language,
    setLanguage,
    currentRole,
    setCurrentRole,
    activePage,
    setActivePage,
    setIsSellModalOpen,
    setIsCartOpen,
    setIsNotificationOpen,
    unreadCount,
    cart,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const roleLabels: Record<UserRole, { en: string; ta: string; icon: any; color: string }> = {
    guest: { en: 'Public / Guest', ta: 'பொதுப் பார்வை', icon: Compass, color: 'text-stone-600 bg-stone-100' },
    farmer: { en: 'Farmer View', ta: 'விவசாயி பார்வை', icon: Sprout, color: 'text-emerald-700 bg-emerald-100 border-emerald-300' },
    buyer: { en: 'Buyer View', ta: 'வாங்குபவர் பார்வை', icon: ShoppingBag, color: 'text-amber-700 bg-amber-100 border-amber-300' },
    procurement: { en: 'Procurement Admin', ta: 'கொள்முதல் நிர்வாகம்', icon: Briefcase, color: 'text-blue-700 bg-blue-100 border-blue-300' },
    transport: { en: 'Transport Fleet', ta: 'போக்குவரத்து பிரிவு', icon: Truck, color: 'text-purple-700 bg-purple-100 border-purple-300' },
  };

  const handleRoleSelect = (role: UserRole) => {
    setCurrentRole(role);
    setRoleDropdownOpen(false);
    if (role === 'farmer') setActivePage('farmer_dashboard');
    else if (role === 'procurement') setActivePage('procurement');
    else if (role === 'transport') setActivePage('transport');
    else if (role === 'buyer') setActivePage('marketplace');
    else setActivePage('home');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-all shadow-xs">
      {/* Top Banner Notice: Clear Business Proposition */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>
              {language === 'en'
                ? 'AgriMarket Direct: We procure directly from farmers, test quality, manage cold/dry transit, and sell to buyers with 100% price transparency.'
                : 'அக்ரிமார்க்கெட் நேரடி விநியோகம்: விவசாயிகளிடம் நியாய விலையில் வாங்கி, போக்குவரத்தை நிர்வகித்து, வாங்குபவர்களுக்கு வழங்குகிறோம்.'}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-emerald-200 text-xs">
            <span>📞 1800-425-AGRI</span>
            <span>|</span>
            <span>📍 Tamil Nadu Supply Network</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActivePage('home')}
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-stone-900">
                  Agri<span className="text-emerald-600">Market</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                  Procure & Move
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-medium hidden sm:block">
                {t.brandTagline}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => setActivePage('home')}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                activePage === 'home'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-stone-700 hover:text-emerald-700 hover:bg-stone-50'
              }`}
            >
              {t.navHome}
            </button>

            <button
              onClick={() => setActivePage('marketplace')}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activePage === 'marketplace'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-stone-700 hover:text-emerald-700 hover:bg-stone-50'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              {t.navMarketplace}
            </button>

            <button
              onClick={() => setActivePage('farmer_dashboard')}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activePage === 'farmer_dashboard'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-stone-700 hover:text-emerald-700 hover:bg-stone-50'
              }`}
            >
              <Sprout className="w-4 h-4" />
              {t.navSellVegetables}
            </button>

            <button
              onClick={() => setActivePage('procurement')}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activePage === 'procurement'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-stone-700 hover:text-emerald-700 hover:bg-stone-50'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              {t.navProcurement}
            </button>

            <button
              onClick={() => setActivePage('transport')}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activePage === 'transport'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-stone-700 hover:text-emerald-700 hover:bg-stone-50'
              }`}
            >
              <Truck className="w-4 h-4" />
              {t.navTransport}
            </button>

            <button
              onClick={() => setActivePage('tracking')}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activePage === 'tracking'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-stone-700 hover:text-emerald-700 hover:bg-stone-50'
              }`}
            >
              <Activity className="w-4 h-4 text-emerald-600" />
              {t.navTrackOrder}
            </button>
          </nav>

          {/* Right Utilities: Language, Role Switcher, Notifications, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector */}
            <div className="relative inline-flex items-center bg-stone-100 rounded-xl p-1 border border-stone-200">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  language === 'en'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ta')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  language === 'ta'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
                title="தமிழுக்கு மாறவும்"
              >
                தமிழ்
              </button>
            </div>

            {/* Role Switcher Pill / Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-2xs ${
                  roleLabels[currentRole].color
                }`}
                title="Switch Active Persona / View"
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {language === 'en' ? roleLabels[currentRole].en : roleLabels[currentRole].ta}
                </span>
                <ChevronDown className="w-3 h-3 ml-0.5 opacity-70" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1.5 border-b border-stone-100 mb-1">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                      {language === 'en' ? 'Simulate User Role' : 'பயனர் பார்வையை மாற்றுக'}
                    </p>
                  </div>
                  {(Object.keys(roleLabels) as UserRole[]).map((role) => {
                    const info = roleLabels[role];
                    const Icon = info.icon;
                    return (
                      <button
                        key={role}
                        onClick={() => handleRoleSelect(role)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium hover:bg-stone-50 transition-colors ${
                          currentRole === role ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-stone-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 text-emerald-600" />
                          <span>{language === 'en' ? info.en : info.ta}</span>
                        </div>
                        {currentRole === role && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <button
              onClick={() => setIsNotificationOpen(true)}
              className="relative p-2 rounded-xl text-stone-600 hover:text-emerald-700 hover:bg-stone-100 transition-colors"
              title={t.navNotifications}
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-xl text-stone-600 hover:text-emerald-700 hover:bg-stone-100 transition-colors"
              title={t.navCart}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black shadow-xs">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Quick Action: Sell Produce */}
            <button
              onClick={() => setIsSellModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white text-xs font-bold hover:from-emerald-700 hover:to-green-700 shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t.btnSellVegetables}</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-stone-600 hover:bg-stone-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-150">
          <button
            onClick={() => {
              setActivePage('home');
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-stone-800 hover:bg-stone-50"
          >
            <Compass className="w-4 h-4 text-emerald-600" />
            {t.navHome}
          </button>

          <button
            onClick={() => {
              setActivePage('marketplace');
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-stone-800 hover:bg-stone-50"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-600" />
            {t.navMarketplace}
          </button>

          <button
            onClick={() => {
              setActivePage('farmer_dashboard');
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-stone-800 hover:bg-stone-50"
          >
            <Sprout className="w-4 h-4 text-emerald-600" />
            {t.navSellVegetables} ({t.navDashboard})
          </button>

          <button
            onClick={() => {
              setActivePage('procurement');
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-stone-800 hover:bg-stone-50"
          >
            <Briefcase className="w-4 h-4 text-emerald-600" />
            {t.navProcurement}
          </button>

          <button
            onClick={() => {
              setActivePage('transport');
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-stone-800 hover:bg-stone-50"
          >
            <Truck className="w-4 h-4 text-emerald-600" />
            {t.navTransport}
          </button>

          <button
            onClick={() => {
              setActivePage('tracking');
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-stone-800 hover:bg-stone-50"
          >
            <Activity className="w-4 h-4 text-emerald-600" />
            {t.navTrackOrder}
          </button>

          <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsSellModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              {t.btnSellVegetables}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
