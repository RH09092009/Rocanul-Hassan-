import React from 'react';
import { Language } from '../types';

interface Props {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageToggle: React.FC<Props> = ({ language, setLanguage }) => {
  return (
    <div className="flex bg-gray-100 rounded-full p-1 border border-gray-200">
      <button
        onClick={() => setLanguage('en')}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
          language === 'en'
            ? 'bg-white text-teal-700 shadow-sm'
            : 'text-gray-500 hover:text-teal-600'
        }`}
      >
        English
      </button>
      <button
        onClick={() => setLanguage('bn')}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all font-bangla ${
          language === 'bn'
            ? 'bg-white text-teal-700 shadow-sm'
            : 'text-gray-500 hover:text-teal-600'
        }`}
      >
        বাংলা
      </button>
    </div>
  );
};

export default LanguageToggle;