import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { BottomNav } from './BottomNav';
import { AccessibilityToolbar } from './AccessibilityToolbar';
import { useLanguage } from '@/context/LanguageContext';

export function Layout() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-charcoal-50">
      <a href="#main-content" className="skip-link">
        {language === 'mr' ? 'मुख्य माहितीकडे जा' : 'Skip to main content'}
      </a>
      <Header />
      <main id="main-content" className="flex-1 mobile-main-pad">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
      <AccessibilityToolbar />
    </div>
  );
}
