import React from 'react';
import { Hospital, Language } from '../types';
import { MapPin, Phone, AlertCircle, Clock, Globe } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

interface Props {
  hospital: Hospital;
  language: Language;
}

const HospitalCard: React.FC<Props> = ({ hospital, language }) => {
  const t = TRANSLATIONS[language];
  const isBangla = language === 'bn';

  return (
    <div className={`bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full ${isBangla ? 'font-bangla' : ''}`}>
      <div className="p-5 flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{hospital.name}</h3>
        
        <div className="space-y-3 mt-4">
          <div className="flex items-start text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2 mt-0.5 text-teal-500 shrink-0" />
            <span>{hospital.address}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Phone className="h-4 w-4 mr-2 text-teal-500 shrink-0" />
            <span className="font-mono text-gray-800">{hospital.phone}</span>
          </div>

          {hospital.emergencyPhone && (
            <div className="flex items-center text-sm text-red-600 font-medium bg-red-50 p-2 rounded-lg">
              <AlertCircle className="h-4 w-4 mr-2 shrink-0" />
              <span>{t.hospital.emergency}: {hospital.emergencyPhone}</span>
            </div>
          )}

          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2 text-teal-500 shrink-0" />
            <span>{hospital.visitingHours}</span>
          </div>

          {hospital.departments && hospital.departments.length > 0 && (
            <div className="mt-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{t.hospital.departments}</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {hospital.departments.slice(0, 4).map((dept, i) => (
                  <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {dept}
                  </span>
                ))}
                {hospital.departments.length > 4 && (
                   <span className="text-xs text-gray-500 px-1 pt-1">+{hospital.departments.length - 4}</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex justify-end gap-3">
         {hospital.mapUrl && (
          <a
            href={hospital.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-white border border-gray-300 rounded text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center"
          >
            <MapPin className="h-3 w-3 mr-1" /> Map
          </a>
        )}
        {hospital.website && (
           <a
            href={hospital.website}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-teal-600 rounded text-xs font-medium text-white hover:bg-teal-700 flex items-center"
           >
             <Globe className="h-3 w-3 mr-1" /> Visit
           </a>
        )}
      </div>
    </div>
  );
};

export default HospitalCard;