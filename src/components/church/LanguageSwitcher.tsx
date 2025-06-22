
import { Language } from '@/pages/Index';

interface LanguageSwitcherProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageSwitcher = ({ language, setLanguage }: LanguageSwitcherProps) => {
  return (
    <div className="fixed top-4 right-4 z-50 bg-white rounded-full shadow-lg p-2">
      <div className="flex gap-1">
        <button
          onClick={() => setLanguage('es')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
            language === 'es'
              ? 'bg-amber-600 text-white'
              : 'text-amber-700 hover:bg-amber-100'
          }`}
        >
          ES
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
            language === 'en'
              ? 'bg-amber-600 text-white'
              : 'text-amber-700 hover:bg-amber-100'
          }`}
        >
          EN
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
