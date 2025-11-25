import React, { useState } from 'react';
import { Activity, Baby, Syringe, Calculator, CalendarCheck, Info } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface Props {
  language: Language;
}

const HealthTools: React.FC<Props> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [activeTool, setActiveTool] = useState('bmi');
  const isBangla = language === 'bn';
  
  // BMI State
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmiResult, setBmiResult] = useState<string | null>(null);

  // Pregnancy State
  const [lmp, setLmp] = useState('');
  const [edd, setEdd] = useState<string | null>(null);
  const [weeks, setWeeks] = useState<number | null>(null);

  // Vaccine State
  const [birthDate, setBirthDate] = useState('');
  const [vaccineSchedule, setVaccineSchedule] = useState<any[]>([]);

  const calculateBMI = () => {
    if (weight && height) {
      const hM = parseFloat(height) / 100;
      const w = parseFloat(weight);
      const bmi = (w / (hM * hM)).toFixed(1);
      setBmiResult(bmi);
    }
  };

  const calculatePregnancy = () => {
    if (lmp) {
      const lmpDate = new Date(lmp);
      const today = new Date();
      
      // EDD Rule: +280 days
      const dueDate = new Date(lmpDate.getTime() + 280 * 24 * 60 * 60 * 1000);
      setEdd(dueDate.toDateString());

      // Weeks Calculation
      const diffTime = Math.abs(today.getTime() - lmpDate.getTime());
      const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
      setWeeks(diffWeeks);
    }
  };

  const generateVaccineSchedule = () => {
    if (birthDate) {
      const dob = new Date(birthDate);
      const addDays = (date: Date, days: number) => new Date(date.getTime() + days * 24 * 60 * 60 * 1000).toDateString();
      
      const schedule = [
        { age: isBangla ? 'জন্মের সময়' : 'At Birth', vaccine: 'BCG, OPV0, HepB1', date: addDays(dob, 0) },
        { age: isBangla ? '৬ সপ্তাহ' : '6 Weeks', vaccine: 'Pentavalent1, OPV1, PCV1', date: addDays(dob, 42) },
        { age: isBangla ? '১০ সপ্তাহ' : '10 Weeks', vaccine: 'Pentavalent2, OPV2, PCV2', date: addDays(dob, 70) },
        { age: isBangla ? '১৪ সপ্তাহ' : '14 Weeks', vaccine: 'Pentavalent3, OPV3, PCV3, IPV', date: addDays(dob, 98) },
        { age: isBangla ? '৯ মাস' : '9 Months', vaccine: 'Measles-Rubella (MR1)', date: addDays(dob, 270) },
        { age: isBangla ? '১৫ মাস' : '15 Months', vaccine: 'Measles-Rubella (MR2)', date: addDays(dob, 450) },
      ];
      setVaccineSchedule(schedule);
    }
  };

  const tools = [
    { id: 'bmi', icon: Activity, title: t.tools.bmi, desc: t.tools.bmiDesc, color: 'bg-teal-500' },
    { id: 'pregnancy', icon: Baby, title: t.tools.pregnancy, desc: t.tools.pregnancyDesc, color: 'bg-pink-500' },
    { id: 'vaccine', icon: Syringe, title: t.tools.vaccine, desc: t.tools.vaccineDesc, color: 'bg-blue-500' },
  ];

  return (
    <div className={`max-w-4xl mx-auto ${isBangla ? 'font-bangla' : ''}`}>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{t.tools.title}</h2>
      
      {/* Tool Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`p-6 rounded-xl border text-left transition-all hover:shadow-lg ${
                activeTool === tool.id 
                  ? 'border-gray-300 bg-white shadow-md ring-2 ring-offset-2 ring-gray-200' 
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className={`p-3 rounded-lg ${tool.color} text-white w-fit mb-4`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg text-gray-900">{tool.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{tool.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Tool Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 animate-fade-in">
        
        {/* BMI CALCULATOR */}
        {activeTool === 'bmi' && (
          <div className="max-w-md mx-auto">
             <h3 className="text-xl font-bold mb-4">{t.tools.bmi}</h3>
             <div className="space-y-4">
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">{isBangla ? 'ওজন (কেজি)' : 'Weight (kg)'}</label>
                   <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full border p-2 rounded-lg outline-none focus:ring-2 focus:ring-teal-500" placeholder="70" />
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">{isBangla ? 'উচ্চতা (সেমি)' : 'Height (cm)'}</label>
                   <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full border p-2 rounded-lg outline-none focus:ring-2 focus:ring-teal-500" placeholder="175" />
                </div>
                <button onClick={calculateBMI} className="w-full bg-teal-600 text-white py-2 rounded-lg font-bold hover:bg-teal-700">
                  {t.tools.calculate}
                </button>
                {bmiResult && (
                   <div className="mt-4 p-4 bg-teal-50 rounded-lg text-center border border-teal-100 animate-fade-in">
                      <p className="text-sm text-teal-600 font-medium">{isBangla ? 'আপনার বিএমআই' : 'Your BMI'}</p>
                      <p className="text-3xl font-bold text-teal-800">{bmiResult}</p>
                      <p className="text-xs text-gray-500 mt-1">{isBangla ? 'স্বাভাবিক সীমা: ১৮.৫ - ২৪.৯' : 'Normal range: 18.5 - 24.9'}</p>
                   </div>
                )}
             </div>
          </div>
        )}
        
        {/* PREGNANCY TRACKER */}
        {activeTool === 'pregnancy' && (
           <div className="max-w-md mx-auto">
              <h3 className="text-xl font-bold mb-4">{t.tools.pregnancy}</h3>
              <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {isBangla ? 'শেষ মাসিকের প্রথম দিন (LMP)' : 'First Day of Last Period (LMP)'}
                    </label>
                    <input 
                      type="date" 
                      value={lmp} 
                      onChange={(e) => setLmp(e.target.value)} 
                      className="w-full border p-2 rounded-lg outline-none focus:ring-2 focus:ring-pink-500" 
                    />
                  </div>
                  <button onClick={calculatePregnancy} className="w-full bg-pink-500 text-white py-2 rounded-lg font-bold hover:bg-pink-600">
                    {t.tools.calculate}
                  </button>
                  
                  {edd && (
                    <div className="mt-4 p-4 bg-pink-50 rounded-lg border border-pink-100 animate-fade-in">
                       <div className="flex items-center mb-2">
                          <Baby className="h-5 w-5 text-pink-500 mr-2" />
                          <span className="font-bold text-gray-800">{isBangla ? 'আনুমানিক প্রসবের তারিখ' : 'Estimated Due Date'}</span>
                       </div>
                       <p className="text-2xl font-bold text-pink-700 mb-2">{edd}</p>
                       <div className="border-t border-pink-200 pt-2 mt-2">
                         <span className="text-sm text-gray-600">{isBangla ? 'বর্তমান গর্ভাবস্থা:' : 'Current Progress:'} </span>
                         <span className="font-bold text-pink-600">{weeks} {isBangla ? 'সপ্তাহ' : 'Weeks'}</span>
                       </div>
                    </div>
                  )}
              </div>
           </div>
        )}

        {/* VACCINE SCHEDULER */}
        {activeTool === 'vaccine' && (
           <div className="max-w-lg mx-auto">
              <h3 className="text-xl font-bold mb-4">{t.tools.vaccine}</h3>
              <div className="flex gap-2 mb-6">
                 <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                       {isBangla ? 'শিশুর জন্ম তারিখ' : "Child's Birth Date"}
                    </label>
                    <input 
                      type="date" 
                      value={birthDate} 
                      onChange={(e) => setBirthDate(e.target.value)} 
                      className="w-full border p-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                 </div>
                 <button onClick={generateVaccineSchedule} className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-600 h-[42px]">
                   {isBangla ? 'দেখুন' : 'Show'}
                 </button>
              </div>

              {vaccineSchedule.length > 0 && (
                <div className="space-y-3 animate-fade-in">
                   {vaccineSchedule.map((item, idx) => (
                      <div key={idx} className="flex items-start bg-blue-50 p-3 rounded-lg border border-blue-100">
                         <CalendarCheck className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                         <div>
                            <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">{item.age}</p>
                            <p className="font-medium text-gray-900">{item.vaccine}</p>
                            <p className="text-xs text-gray-500 mt-1">{isBangla ? 'তারিখ:' : 'Due Date:'} {item.date}</p>
                         </div>
                      </div>
                   ))}
                   <div className="bg-yellow-50 p-3 rounded-lg text-xs text-yellow-800 flex items-start mt-4">
                      <Info className="h-4 w-4 mr-2 shrink-0" />
                      {isBangla ? 'দ্রষ্টব্য: এটি একটি সাধারণ সময়সূচী। সঠিক তারিখের জন্য আপনার ডাক্তারের সাথে পরামর্শ করুন।' : 'Note: This is a standard schedule. Please consult your pediatrician for exact dates.'}
                   </div>
                </div>
              )}
           </div>
        )}

      </div>
    </div>
  );
};

export default HealthTools;