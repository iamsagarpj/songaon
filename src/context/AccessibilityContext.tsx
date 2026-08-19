import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

export type TextSize = 'normal' | 'large' | 'xlarge';

interface AccessibilitySettings {
  textSize: TextSize;
  highContrast: boolean;
}

interface AccessibilityContextType extends AccessibilitySettings {
  increaseTextSize: () => void;
  decreaseTextSize: () => void;
  toggleHighContrast: () => void;
  resetAccessibility: () => void;
}

const defaultSettings: AccessibilitySettings = {
  textSize: 'normal',
  highContrast: false,
};

const STORAGE_KEY = 'gp-accessibility';

const textSizeMap: Record<TextSize, string> = {
  normal: '100%',
  large: '112.5%',
  xlarge: '125%',
};

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

function loadSettings(): AccessibilitySettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as AccessibilitySettings;
  } catch {
    /* ignore */
  }
  return defaultSettings;
}

function applySettings(settings: AccessibilitySettings) {
  document.documentElement.style.fontSize = textSizeMap[settings.textSize];
  document.documentElement.classList.toggle('high-contrast', settings.highContrast);
}

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(loadSettings);

  useEffect(() => {
    applySettings(settings);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const increaseTextSize = useCallback(() => {
    setSettings((s) => ({
      ...s,
      textSize: s.textSize === 'normal' ? 'large' : s.textSize === 'large' ? 'xlarge' : 'xlarge',
    }));
  }, []);

  const decreaseTextSize = useCallback(() => {
    setSettings((s) => ({
      ...s,
      textSize: s.textSize === 'xlarge' ? 'large' : s.textSize === 'large' ? 'normal' : 'normal',
    }));
  }, []);

  const toggleHighContrast = useCallback(() => {
    setSettings((s) => ({ ...s, highContrast: !s.highContrast }));
  }, []);

  const resetAccessibility = useCallback(() => {
    setSettings(defaultSettings);
  }, []);

  return (
    <AccessibilityContext.Provider
      value={{
        ...settings,
        increaseTextSize,
        decreaseTextSize,
        toggleHighContrast,
        resetAccessibility,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return ctx;
}
