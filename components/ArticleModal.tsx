
import React from 'react';
import { X, Clock, FileText } from 'lucide-react';
import { HealthArticle, Language } from '../types';

interface Props {
  article: HealthArticle | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

const ArticleModal: React.FC<Props> = ({ article, isOpen, onClose, language }) => {
  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 animate-fade-in backdrop-blur-sm">
      <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col ${language === 'bn' ? 'font-bangla' : ''}`}>
        
        {/* Header */}
        <div className="bg-white border-b border-gray-100 p-5 flex justify-between items-start sticky top-0 z-10">
          <div>
             <span className="inline-block px-2.5 py-1 text-xs font-bold text-teal-700 bg-teal-50 rounded-full mb-3 uppercase tracking-wide">
              {article.category}
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
              {article.title}
            </h2>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors ml-4 flex-shrink-0"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-6">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <Clock className="h-4 w-4 mr-1.5" /> 
            <span>Read Time: {article.readTime}</span>
          </div>

          <div className="prose prose-teal max-w-none text-gray-700 leading-relaxed text-base md:text-lg whitespace-pre-line">
            {article.content || article.summary}
          </div>
          
          <div className="pt-6 border-t border-gray-100 text-xs text-gray-400 italic">
            Disclaimer: This content is for informational purposes only and is not a substitute for professional medical advice.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;
