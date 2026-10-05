import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './components/landing/LandingPage';
import { Marketplace } from './components/buyer/Marketplace';
import { FarmerDashboard } from './components/farmer/FarmerDashboard';
import { ProcurementCenter } from './components/procurement/ProcurementCenter';
import { TransportDashboard } from './components/transport/TransportDashboard';
import { OrderTrackingView } from './components/tracking/OrderTrackingView';
import { CartDrawer } from './components/buyer/CartDrawer';
import { CheckoutModal } from './components/buyer/CheckoutModal';
import { NotificationDrawer } from './components/notifications/NotificationDrawer';
import { SellVegetableModal } from './components/farmer/SellVegetableModal';

const AppContent: React.FC = () => {
  const {
    activePage,
    isCartOpen,
    setIsCartOpen,
    isNotificationOpen,
    setIsNotificationOpen,
    isSellModalOpen,
    setIsSellModalOpen,
  } = useApp();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans antialiased text-stone-900">
      <Navbar />

      <main className="flex-1">
        {activePage === 'home' && <LandingPage />}
        {activePage === 'marketplace' && <Marketplace />}
        {activePage === 'farmer_dashboard' && <FarmerDashboard />}
        {activePage === 'procurement' && <ProcurementCenter />}
        {activePage === 'transport' && <TransportDashboard />}
        {activePage === 'tracking' && <OrderTrackingView />}
      </main>

      <Footer />

      {/* Slide-over Drawers and Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onOpenCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />

      <SellVegetableModal
        isOpen={isSellModalOpen}
        onClose={() => setIsSellModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
