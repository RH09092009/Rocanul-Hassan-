import React, { useState } from 'react';
import { X, User, Mail, Lock, ArrowRight } from 'lucide-react';
import { Language, UserProfile } from '../types';
import { TRANSLATIONS } from '../constants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: UserProfile) => void;
  language: Language;
}

const AuthModal: React.FC<Props> = ({ isOpen, onClose, onLogin, language }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const t = TRANSLATIONS[language];
  const isBangla = language === 'bn';

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth
    onLogin({
      name: name || (isLogin ? 'Rahim Ahmed' : 'New User'),
      email: email
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 animate-fade-in backdrop-blur-sm">
      <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden ${isBangla ? 'font-bangla' : ''}`}>
        <div className="flex justify-end p-4">
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="px-8 pb-8 pt-2">
          <div className="text-center mb-8">
            <div className="mx-auto bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-teal-600">
              <User className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              {isLogin ? t.auth.login : t.auth.signup}
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              {isLogin ? 'Welcome back to MediFind' : 'Join MediFind for better health care'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t.auth.name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                  required={!isLogin}
                />
              </div>
            )}
            
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                placeholder={t.auth.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="password"
                placeholder={t.auth.password}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-teal-200 transition-all flex items-center justify-center group"
            >
              {t.auth.submit}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-teal-600 hover:text-teal-800 font-medium"
            >
              {isLogin ? t.auth.noAccount : t.auth.haveAccount}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;