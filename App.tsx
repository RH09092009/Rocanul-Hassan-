
import React, { useState, useEffect } from 'react';
import { Activity, List as ListIcon, Phone, Bot, Calculator, Menu, X, User, Ambulance, Droplet, Map as MapIcon } from 'lucide-react';
import { Doctor, Hospital, MedicalService, Language, SearchFilters as FiltersType, AppSection, HealthArticle, UserProfile } from './types';
import { TRANSLATIONS } from './constants';
import { searchMedicalEntities, getHealthArticles } from './services/geminiService';
import LanguageToggle from './components/LanguageToggle';
import SearchFilters from './components/SearchFilters';
import DoctorCard from './components/DoctorCard';
import HospitalCard from './components/HospitalCard';
import HealthAssistant from './components/HealthAssistant';
import HealthTools from './components/HealthTools';
import AuthModal from './components/AuthModal';
import ArticleModal from './components/ArticleModal';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [activeSection, setActiveSection] = useState<AppSection>('home');
  const [results, setResults] = useState<(Doctor | Hospital | MedicalService)[]>([]);
  const [currentSearchType, setCurrentSearchType] = useState('doctor');
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Articles State
  const [articles, setArticles] = useState<HealthArticle[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<HealthArticle | null>(null);

  // User Auth State
  const [user, setUser] = useState<UserProfile | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const t = TRANSLATIONS[language];
  const isBangla = language === 'bn';

  // Fetch articles when entering the articles section
  useEffect(() => {
    if (activeSection === 'articles' && articles.length === 0) {
      const fetchArticles = async () => {
        setLoadingArticles(true);
        const data = await getHealthArticles(language);
        setArticles(data);
        setLoadingArticles(false);
      };
      fetchArticles();
    }
  }, [activeSection, language]);

  const handleSearch = async (filters: FiltersType, userCoords?: { lat: number; lng: number }) => {
    setActiveSection('home');
    setLoading(true);
    setError(null);
    setResults([]);
    setCurrentSearchType(filters.searchType);
    
    try {
      const data = await searchMedicalEntities(filters, language, userCoords);
      setResults(data);
      setHasSearched(true);
    } catch (err) {
      setError(t.common.error);
    } finally {
      setLoading(false);
    }
  };

  const navItems = [
    { id: 'home', label: t.nav.home, icon: Activity },
    { id: 'emergency', label: t.nav.emergency, icon: Phone },
    { id: 'assistant', label: t.nav.assistant, icon: Bot },
    { id: 'tools', label: t.nav.tools, icon: Calculator },
    { id: 'articles', label: t.nav.articles, icon: Activity }, // Updated Icon
  ];

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 ${language === 'bn' ? 'font-bangla' : ''}`}>
      
      {/* Navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            <div className="flex items-center cursor-pointer" onClick={() => { setActiveSection('home'); setHasSearched(false); }}>
              <div className="bg-teal-600 p-1.5 rounded-lg mr-2 shadow-sm">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                Medi<span className="text-teal-600">Find</span>
              </h1>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id as AppSection)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${
                      activeSection === item.id 
                        ? 'bg-teal-50 text-teal-700' 
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-1.5" />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center space-x-4">
              <LanguageToggle language={language} setLanguage={setLanguage} />
              
              {user ? (
                 <div className="hidden md:flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
                    <div className="bg-teal-100 text-teal-700 p-1 rounded-full">
                       <User className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{t.auth.welcome}, {user.name.split(' ')[0]}</span>
                    <button onClick={() => setUser(null)} className="text-xs text-red-500 hover:text-red-700 ml-2 font-bold">
                       {t.auth.logout}
                    </button>
                 </div>
              ) : (
                <button 
                  onClick={() => setAuthModalOpen(true)}
                  className="hidden md:flex items-center justify-center p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition"
                  title={t.auth.login}
                >
                  <User className="h-5 w-5" />
                </button>
              )}

              <button 
                className="md:hidden p-2 text-gray-600"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-1 shadow-lg">
             {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveSection(item.id as AppSection); setMobileMenuOpen(false); }}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium ${
                    activeSection === item.id ? 'bg-teal-50 text-teal-700' : 'text-gray-600'
                  }`}
                >
                  {item.label}
                </button>
             ))}
             <div className="border-t border-gray-100 pt-3 mt-2">
                {user ? (
                   <button onClick={() => { setUser(null); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-2 text-red-600 font-bold">
                     {t.auth.logout}
                   </button>
                ) : (
                   <button onClick={() => { setAuthModalOpen(true); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-2 text-teal-600 font-bold">
                     {t.auth.login} / {t.auth.signup}
                   </button>
                )}
             </div>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* HOME SECTION */}
        {activeSection === 'home' && (
          <>
            {/* Hero / Search */}
            {!hasSearched && !loading && (
              <div className="text-center mb-10 mt-4 animate-fade-in">
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                  {t.hero.title}
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                  {t.hero.subtitle}
                </p>
              </div>
            )}

            <SearchFilters language={language} onSearch={handleSearch} isLoading={loading} />

            {/* Results Header */}
            {hasSearched && !loading && !error && (
              <div className="flex justify-between items-center mb-6 animate-fade-in">
                <h3 className="text-lg font-bold text-gray-800">
                  {results.length} {t.common.loading.replace('...', '')} Results
                </h3>
              </div>
            )}

            {/* Loading State */}
            {loading && (
               <div className="flex flex-col items-center justify-center py-24 animate-fade-in">
                <div className="relative">
                  <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-25"></div>
                  <div className="relative rounded-full h-16 w-16 bg-teal-50 border-4 border-teal-100 flex items-center justify-center">
                    <Activity className="h-8 w-8 text-teal-600 animate-pulse" />
                  </div>
                </div>
                <p className="mt-6 text-teal-800 font-medium text-lg">{t.common.loading}</p>
              </div>
            )}

            {/* Results Grid */}
            {!loading && hasSearched && results.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in pb-12">
                {results.map((item, idx) => {
                  if (currentSearchType === 'doctor') {
                    return <DoctorCard key={idx} doctor={item as Doctor} language={language} />;
                  } else if (currentSearchType === 'hospital') {
                    return <HospitalCard key={idx} hospital={item as Hospital} language={language} />;
                  } else {
                     // Generic Service Card
                     const service = item as MedicalService;
                     return (
                       <div key={idx} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all flex flex-col h-full">
                         <div className="flex-1">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="font-bold text-xl text-gray-900">{service.name}</h3>
                                <p className="text-sm text-teal-600 font-medium uppercase mt-1">{service.type.replace('_', ' ')}</p>
                              </div>
                              {service.isOpen24Hours && (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold">24/7</span>
                              )}
                            </div>
                            <div className="text-sm text-gray-600 space-y-3 mb-4">
                                <p className="flex items-start"><MapIcon className="h-4 w-4 mr-2 text-gray-400 shrink-0 mt-0.5" /> {service.address}</p>
                                <p className="flex items-center font-bold text-gray-800"><Phone className="h-4 w-4 mr-2 text-gray-400 shrink-0" /> {service.phone}</p>
                            </div>
                         </div>
                         
                         <div className="mt-4 flex gap-3 pt-4 border-t border-gray-100">
                             {service.mapUrl && (
                               <a href={service.mapUrl} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2.5 rounded-lg text-sm font-medium transition">
                                 <MapIcon className="h-4 w-4 mr-2" /> {t.common.directions}
                               </a>
                             )}
                             <a href={`tel:${service.phone}`} className="flex-1 flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white py-2.5 rounded-lg text-sm font-medium transition">
                                <Phone className="h-4 w-4 mr-2" /> {t.common.callNow}
                             </a>
                         </div>
                       </div>
                     )
                  }
                })}
              </div>
            )}
            
            {!loading && hasSearched && results.length === 0 && (
              <div className="text-center py-16 animate-fade-in">
                <div className="inline-block p-4 bg-gray-50 rounded-full mb-4">
                   <ListIcon className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">{t.common.noResults}</h3>
              </div>
            )}
          </>
        )}

        {/* EMERGENCY SECTION */}
        {activeSection === 'emergency' && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-2xl font-bold text-red-600 mb-6 flex items-center">
              <Phone className="h-6 w-6 mr-2 animate-pulse" /> {t.emergency.title}
            </h2>
            <div className="grid gap-6">
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl shadow-sm flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-red-700 mb-1">{t.emergency.call999}</h3>
                  <p className="text-red-600 text-sm">Police, Ambulance, Fire</p>
                </div>
                <a href="tel:999" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center">
                  <Phone className="h-5 w-5 mr-2" /> 999
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button onClick={() => { setActiveSection('home'); handleSearch({ searchType: 'ambulance', location: '', specialty: '', feeRange: '', gender: '' }); }} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:border-red-300 transition-all text-left group">
                  <div className="bg-red-100 p-3 rounded-full w-fit mb-4 group-hover:scale-110 transition-transform">
                    <Ambulance className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900">{t.emergency.ambulanceFinder}</h3>
                  <p className="text-sm text-gray-500 mt-1">Locate nearest ambulance services</p>
                </button>

                <button onClick={() => { setActiveSection('home'); handleSearch({ searchType: 'blood_bank', location: '', specialty: '', feeRange: '', gender: '' }); }} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:border-red-300 transition-all text-left group">
                   <div className="bg-red-100 p-3 rounded-full w-fit mb-4 group-hover:scale-110 transition-transform">
                    <Droplet className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900">{t.emergency.bloodDonor}</h3>
                  <p className="text-sm text-gray-500 mt-1">Find blood banks and donors</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ASSISTANT SECTION */}
        {activeSection === 'assistant' && (
           <div className="max-w-4xl mx-auto animate-fade-in">
             <HealthAssistant language={language} />
           </div>
        )}

        {/* TOOLS SECTION */}
        {activeSection === 'tools' && (
          <div className="animate-fade-in">
            <HealthTools language={language} />
          </div>
        )}

        {/* ARTICLES SECTION */}
        {activeSection === 'articles' && (
          <div className="animate-fade-in">
             <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.nav.articles}</h2>
                <p className="text-gray-500">{isBangla ? 'সুস্থ থাকার জন্য বিশেষজ্ঞের পরামর্শ' : 'Expert advice for a healthier life'}</p>
             </div>
             
             {loadingArticles ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {[1,2,3].map(i => (
                     <div key={i} className="bg-white rounded-xl h-64 shadow-sm animate-pulse p-6">
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                     </div>
                   ))}
                </div>
             ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {articles.map((article) => (
                   <div 
                      key={article.id} 
                      onClick={() => setSelectedArticle(article)}
                      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 overflow-hidden cursor-pointer group flex flex-col h-full"
                    >
                      <div className="p-6 flex-1">
                        <span className="inline-block px-2 py-1 text-xs font-bold text-teal-700 bg-teal-50 rounded-md mb-3 uppercase">
                          {article.category}
                        </span>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                          {article.summary}
                        </p>
                      </div>
                      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
                         <span>{article.readTime} read</span>
                         <span className="font-bold text-teal-600 group-hover:underline">{t.common.viewProfile.replace('Profile', 'Article')} &rarr;</span>
                      </div>
                   </div>
                 ))}
               </div>
             )}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p className="mb-2">&copy; 2024 MediFind. All rights reserved.</p>
          <p className="text-xs text-gray-400">
            Disclaimer: MediFind is an aggregator. Please consult a verified doctor for medical advice. In emergencies, call 999.
          </p>
        </div>
      </footer>
      
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        onLogin={(u) => setUser(u)} 
        language={language} 
      />

      <ArticleModal 
        isOpen={!!selectedArticle} 
        onClose={() => setSelectedArticle(null)} 
        article={selectedArticle} 
        language={language} 
      />
      
    </div>
  );
};

export default App;
