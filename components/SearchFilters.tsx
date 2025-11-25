import React, { useState, useEffect } from 'react';
import { MapPin, Search, Filter, Mic, Stethoscope, Building2, Ambulance, Pill, HeartPulse, Wind, Navigation } from 'lucide-react';
import { SPECIALTIES, TRANSLATIONS } from '../constants';
import { Language, SearchFilters as FilterType, SearchType } from '../types';

interface Props {
  language: Language;
  onSearch: (filters: FilterType, userLatLong?: { lat: number; lng: number }) => void;
  isLoading: boolean;
}

const SearchFilters: React.FC<Props> = ({ language, onSearch, isLoading }) => {
  const t = TRANSLATIONS[language];
  const [activeTab, setActiveTab] = useState<SearchType>('doctor');
  const [location, setLocation] = useState('');
  const [specialty, setSpecialty] = useState(SPECIALTIES[0].key);
  const [gender, setGender] = useState('any');
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | undefined>(undefined);
  const [isListening, setIsListening] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const handleGeolocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserCoords(coords);
          
          // Reverse Geocoding to get City/Area name
          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}`);
            const data = await response.json();
            
            // Extract the most relevant location name
            const address = data.address;
            const locationName = address.suburb || address.city || address.town || address.village || address.state_district || (language === 'en' ? 'Current Location' : 'বর্তমান অবস্থান');
            
            setLocation(locationName);
          } catch (error) {
            // Fallback if reverse geocoding fails
            setLocation(language === 'en' ? 'Current Location' : 'বর্তমান অবস্থান');
          } finally {
            setIsLocating(false);
          }
        },
        (error) => {
          alert(language === 'en' ? "Could not detect location. Please check permissions." : "লোকেশন শনাক্ত করা যায়নি। অনুগ্রহ করে অনুমতি পরীক্ষা করুন।");
          setIsLocating(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setIsLocating(false);
    }
  };

  const startVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'bn' ? 'bn-BD' : 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setLocation(transcript);
      };
      recognition.start();
    } else {
      alert("Voice search not supported in this browser.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      location: location === (language === 'en' ? 'Current Location' : 'বর্তমান অবস্থান') ? '' : location,
      specialty: SPECIALTIES.find(s => s.key === specialty)?.[language === 'en' ? 'en' : 'bn'] || specialty,
      gender,
      feeRange: 'any',
      searchType: activeTab
    }, userCoords);
  };

  const tabs = [
    { id: 'doctor', label: t.tabs.doctors, icon: Stethoscope },
    { id: 'hospital', label: t.tabs.hospitals, icon: Building2 },
    { id: 'ambulance', label: t.tabs.ambulance, icon: Ambulance },
    { id: 'pharmacy', label: t.tabs.pharmacy, icon: Pill },
    { id: 'blood_bank', label: t.tabs.bloodBank, icon: HeartPulse },
    { id: 'oxygen', label: t.tabs.oxygen, icon: Wind },
  ];

  return (
    <div className={`bg-white rounded-xl shadow-lg mb-8 border border-teal-100 overflow-hidden ${language === 'bn' ? 'font-bangla' : ''}`}>
      
      <div className="flex overflow-x-auto bg-gray-50 border-b border-gray-200 hide-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SearchType)}
              className={`flex items-center px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                isActive 
                  ? 'bg-white text-teal-700 border-b-2 border-teal-600' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className={`h-4 w-4 mr-2 ${isActive ? 'text-teal-600' : 'text-gray-400'}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          <div className={`${activeTab === 'doctor' || activeTab === 'hospital' ? 'md:col-span-5' : 'md:col-span-10'} relative`}>
            <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">{t.filters.location}</label>
            <div className="relative group">
              <MapPin className={`absolute left-3 top-3 h-5 w-5 ${isLocating ? 'text-teal-600 animate-bounce' : 'text-teal-500'}`} />
              <input
                type="text"
                placeholder={isLocating ? (language === 'bn' ? 'শনাক্ত করা হচ্ছে...' : 'Detecting location...') : t.search.placeholder}
                value={location}
                onChange={(e) => {
                   setLocation(e.target.value);
                   // Clear coords if user types manually to avoid mismatch
                   if (Math.abs(e.target.value.length - location.length) > 2) {
                     setUserCoords(undefined);
                   }
                }}
                className="w-full pl-10 pr-20 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition"
              />
              
              <div className="absolute right-2 top-2 flex items-center space-x-1">
                 <button
                  type="button"
                  onClick={startVoiceSearch}
                  className={`p-1.5 rounded transition ${isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'hover:bg-gray-100 text-gray-500'}`}
                  title={t.search.voiceSearch}
                >
                  <Mic className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleGeolocation}
                  disabled={isLocating}
                  className={`p-1.5 rounded transition flex items-center ${isLocating ? 'bg-teal-50 text-teal-700' : 'text-teal-600 hover:bg-teal-50'}`}
                  title={t.search.detectLocation}
                >
                  {isLocating ? (
                    <div className="h-4 w-4 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Navigation className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Helper Text Option */}
            {!location && !isLocating && (
              <button 
                type="button"
                onClick={handleGeolocation}
                className="absolute right-0 -bottom-6 text-xs text-teal-600 hover:text-teal-800 font-medium flex items-center py-1 px-2 rounded hover:bg-teal-50 transition"
              >
                <Navigation className="h-3 w-3 mr-1" />
                {t.search.detectLocation}
              </button>
            )}
          </div>

          {(activeTab === 'doctor' || activeTab === 'hospital') && (
            <div className="md:col-span-5">
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">{t.filters.specialty}</label>
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white"
              >
                {SPECIALTIES.map((s) => (
                  <option key={s.key} value={s.key}>
                    {language === 'en' ? s.en : s.bn}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="md:col-span-2 flex items-end">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg shadow-md transition-colors flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  {t.hero.emergencyBtn.replace('SOS', 'Search').replace('জরুরি সেবা', 'অনুসন্ধান')}
                </>
              )}
            </button>
          </div>
        </div>

        {activeTab === 'doctor' && (
          <div className="pt-2 border-t border-gray-100 mt-2">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-sm font-semibold text-gray-500 flex items-center">
                <Filter className="h-3 w-3 mr-1" /> {t.filters.title}:
              </span>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-gray-600">{t.filters.gender}:</span>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="any"
                    checked={gender === 'any'}
                    onChange={() => setGender('any')}
                    className="text-teal-600 focus:ring-teal-500"
                  />
                  <span className="ml-1 text-gray-700">{t.filters.any}</span>
                </label>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === 'male'}
                    onChange={() => setGender('male')}
                    className="text-teal-600 focus:ring-teal-500"
                  />
                  <span className="ml-1 text-gray-700">{t.filters.male}</span>
                </label>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === 'female'}
                    onChange={() => setGender('female')}
                    className="text-teal-600 focus:ring-teal-500"
                  />
                  <span className="ml-1 text-gray-700">{t.filters.female}</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchFilters;