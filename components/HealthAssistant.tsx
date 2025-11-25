import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, AlertCircle, Sparkles } from 'lucide-react';
import { Language, ChatMessage } from '../types';
import { TRANSLATIONS } from '../constants';
import { chatWithHealthAssistant } from '../services/geminiService';

interface Props {
  language: Language;
}

const HealthAssistant: React.FC<Props> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: query,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setIsLoading(true);

    const responseText = await chatWithHealthAssistant(query, messages, language);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <div className={`bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 h-[600px] flex flex-col ${language === 'bn' ? 'font-bangla' : ''}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white flex items-center shadow-md">
        <div className="bg-white/20 p-2 rounded-full mr-3">
          <Bot className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="font-bold text-lg">{t.assistant.title}</h2>
          <p className="text-xs text-blue-100 opacity-90">{t.assistant.subtitle}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 p-8">
            <Sparkles className="h-12 w-12 mb-4 text-blue-300" />
            <p>{t.assistant.placeholder}</p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {['Symptoms of flu', 'Healthy diet tips', 'Find a cardiologist'].map((suggestion, i) => (
                <button 
                  key={i}
                  onClick={() => { setQuery(suggestion); }}
                  className="bg-white px-3 py-1 rounded-full text-xs border border-gray-200 hover:border-blue-300 transition"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm text-sm ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
            }`}>
              {msg.text.split('\n').map((line, i) => (
                <p key={i} className={line.startsWith('-') ? 'ml-4' : ''}>{line}</p>
              ))}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 border border-gray-100 shadow-sm flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-75"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 px-4 py-2 flex items-start text-xs text-yellow-800 border-t border-yellow-100">
        <AlertCircle className="h-3 w-3 mr-2 mt-0.5 shrink-0" />
        {t.assistant.disclaimer}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-200">
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.assistant.placeholder}
            className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
          <button 
            type="submit" 
            disabled={!query.trim() || isLoading}
            className="absolute right-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default HealthAssistant;