import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle } from 'lucide-react';
import { Doctor, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor;
  language: Language;
}

const AppointmentModal: React.FC<Props> = ({ isOpen, onClose, doctor, language }) => {
  const t = TRANSLATIONS[language];
  const [step, setStep] = useState(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2); // Show success
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fade-in">
      <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden ${language === 'bn' ? 'font-bangla' : ''}`}>
        
        {/* Header */}
        <div className="bg-teal-600 px-6 py-4 flex justify-between items-center text-white">
          <h3 className="text-lg font-bold">{t.booking.title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-teal-700 rounded-full transition">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {step === 1 ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-teal-50 p-4 rounded-lg mb-4 border border-teal-100">
                <p className="font-bold text-gray-800">{doctor.name}</p>
                <p className="text-sm text-teal-700">{doctor.specialty}</p>
                <p className="text-xs text-gray-500 mt-1">{doctor.location}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.booking.patientName}</label>
                <input 
                  required
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.booking.selectDate}</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input 
                      required
                      type="date" 
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.booking.selectTime}</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <select 
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 outline-none focus:ring-2 focus:ring-teal-500 text-sm bg-white"
                    >
                      <option value="">--:--</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:30 AM">11:30 AM</option>
                      <option value="04:00 PM">04:00 PM</option>
                      <option value="06:30 PM">06:30 PM</option>
                      <option value="08:00 PM">08:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-teal-600 text-white font-bold py-3 rounded-xl shadow hover:bg-teal-700 transition mt-4"
              >
                {t.booking.confirm}
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-2">{t.booking.success}</h4>
              <p className="text-gray-500 text-sm mb-6">
                 We have sent your request to {doctor.name}.<br/>
                 You will receive an SMS confirmation shortly.
              </p>
              <button 
                onClick={onClose}
                className="bg-gray-100 text-gray-700 font-medium px-6 py-2 rounded-lg hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;