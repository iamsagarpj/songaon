import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileDock } from './MobileDock';
import { AccessibilityToolbar } from './AccessibilityToolbar';
import { useLanguage } from '@/context/LanguageContext';

export function Layout() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen w-full flex flex-col bg-charcoal-50 overflow-x-clip">
      <a href="#main-content" className="skip-link">
        {language === 'mr' ? 'मुख्य माहितीकडे जा' : 'Skip to main content'}
      </a>
      <Header />
      <main id="main-content" className="flex-1 mobile-main-pad">
        <Outlet />
      </main>
      <Footer />
      <MobileDock />
      <AccessibilityToolbar />
    </div>
  );
}
