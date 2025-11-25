
import React from 'react';
import { Doctor, Language } from '../types';
import { MapPin, Star, Clock, Briefcase, ShieldCheck, Languages, Phone } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

interface Props {
  doctor: Doctor;
  language: Language;
}

const DoctorCard: React.FC<Props> = ({ doctor, language }) => {
  const t = TRANSLATIONS[language];
  const isBangla = language === 'bn';

  return (
    <div className={`bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full group ${isBangla ? 'font-bangla' : ''}`}>
      <div className="p-5 flex-1 relative">
        {/* Verified Badge */}
        {doctor.isVerified && (
          <div className="absolute top-4 right-4 text-blue-500" title={t.common.verified}>
            <ShieldCheck className="h-5 w-5" />
          </div>
        )}

        <div className="flex justify-between items-start mb-3">
          <div>
            <span className="inline-block px-2.5 py-1 text-xs font-bold text-teal-700 bg-teal-50 rounded-full mb-2 uppercase tracking-wide">
              {doctor.specialty}
            </span>
            <h3 className="text-xl font-bold text-gray-900 leading-tight mb-1 group-hover:text-teal-600 transition-colors">
              {doctor.name}
            </h3>
            <p className="text-sm text-gray-600">
              {doctor.qualification}
            </p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-4">
           {doctor.rating ? (
             <div className="flex items-center bg-yellow-50 px-2 py-0.5 rounded text-yellow-700 font-bold text-xs">
                <Star className="h-3.5 w-3.5 mr-1 fill-current" />
                {doctor.rating}
                <span className="text-gray-400 font-normal ml-1">({doctor.reviewCount || 0})</span>
             </div>
           ) : (
             <span className="text-xs text-gray-400">New Profile</span>
           )}
        </div>

        <div className="space-y-2.5 text-sm">
          <div className="flex items-start text-gray-600">
            <MapPin className="h-4 w-4 mr-2.5 mt-0.5 text-teal-500 shrink-0" />
            <span>
              <span className="font-medium text-gray-800">{doctor.location}</span>
              <br />
              <span className="text-gray-500 text-xs">{doctor.city}</span>
            </span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <Briefcase className="h-4 w-4 mr-2.5 text-teal-500 shrink-0" />
            <span>{t.common.experience}: {doctor.experience}</span>
          </div>

          <div className="flex items-start text-gray-600">
            <Clock className="h-4 w-4 mr-2.5 mt-0.5 text-teal-500 shrink-0" />
            <div className="flex-1">
              <span>{doctor.visitingHours}</span>
              {doctor.nextAvailable && (
                <p className="text-xs text-green-600 font-medium mt-0.5">Next: {doctor.nextAvailable}</p>
              )}
            </div>
          </div>
          
          {doctor.languages && (
             <div className="flex items-center text-gray-600">
                <Languages className="h-4 w-4 mr-2.5 text-teal-500 shrink-0" />
                <span className="text-xs text-gray-500">{doctor.languages.join(', ')}</span>
             </div>
          )}

          <div className="flex items-center text-gray-800 font-medium pt-2">
             <span className="text-teal-600 mr-2 text-lg">৳</span> {t.common.fee}: {doctor.fee}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex justify-between items-center gap-3">
        {doctor.mapUrl && (
          <a
            href={doctor.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:text-teal-600 flex items-center transition-colors px-2 py-2"
          >
            <MapPin className="h-3.5 w-3.5 mr-1.5" />
            Map
          </a>
        )}
        
        <a
          href={`tel:${doctor.contactInfo}`}
          className="flex-1 ml-2 text-center py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold rounded-lg transition-all shadow-sm hover:shadow-md flex items-center justify-center transform active:scale-95"
        >
          {t.common.callNow} <Phone className="h-3.5 w-3.5 ml-1.5" />
        </a>
      </div>
    </div>
  );
};

export default DoctorCard;
