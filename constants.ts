
import { Translation, Language, HealthArticle } from './types';

export const SPECIALTIES = [
  { key: 'general_physician', en: 'General Physician', bn: 'সাধারণ চিকিৎসক' },
  { key: 'gynecologist', en: 'Gynecologist', bn: 'স্ত্রীরোগ বিশেষজ্ঞ' },
  { key: 'pediatrician', en: 'Pediatrician', bn: 'শিশু বিশেষজ্ঞ' },
  { key: 'cardiologist', en: 'Cardiologist', bn: 'হৃদরোগ বিশেষজ্ঞ' },
  { key: 'dermatologist', en: 'Dermatologist', bn: 'চর্মরোগ বিশেষজ্ঞ' },
  { key: 'orthopedic', en: 'Orthopedic Surgeon', bn: 'অর্থোপেডিক সার্জন' },
  { key: 'neurologist', en: 'Neurologist', bn: 'নিউরোলজিস্ট' },
  { key: 'psychiatrist', en: 'Psychiatrist', bn: 'মনোরোগ বিশেষজ্ঞ' },
  { key: 'psychologist', en: 'Psychologist', bn: 'মনোবিজ্ঞানী' },
  { key: 'ent', en: 'ENT Specialist', bn: 'নাক-কান-গলা বিশেষজ্ঞ' },
  { key: 'dentist', en: 'Dentist', bn: 'দন্ত চিকিৎসক' },
  { key: 'urologist', en: 'Urologist', bn: 'ইউরোলজিস্ট' },
  { key: 'endocrinologist', en: 'Endocrinologist', bn: 'হরমোন বিশেষজ্ঞ' },
  { key: 'ophthalmologist', en: 'Eye Specialist', bn: 'চোখের ডাক্তার' },
  { key: 'gastroenterologist', en: 'Gastroenterologist', bn: 'গ্যাস্ট্রোএন্টেরোলজিস্ট' },
  { key: 'oncologist', en: 'Oncologist', bn: 'ক্যান্সার বিশেষজ্ঞ' },
  { key: 'nephrologist', en: 'Nephrologist', bn: 'কিডনি বিশেষজ্ঞ' },
  { key: 'pulmonologist', en: 'Pulmonologist', bn: 'বক্ষব্যাধি বিশেষজ্ঞ' },
  { key: 'nutritionist', en: 'Nutritionist', bn: 'পুষ্টিবিদ' },
  { key: 'physiotherapist', en: 'Physiotherapist', bn: 'ফিজিওথেরাপিস্ট' },
  { key: 'hematologist', en: 'Hematologist', bn: 'রক্তরোগ বিশেষজ্ঞ' },
  { key: 'rheumatologist', en: 'Rheumatologist', bn: 'বাতরোগ বিশেষজ্ঞ' },
  { key: 'surgeon', en: 'General Surgeon', bn: 'জেনারেল সার্জন' },
  { key: 'plastic_surgeon', en: 'Plastic Surgeon', bn: 'প্লাস্টিক সার্জন' },
  { key: 'fertility', en: 'Fertility Specialist', bn: 'বন্ধ্যাত্ব বিশেষজ্ঞ' },
  { key: 'critical_care', en: 'Critical Care Specialist', bn: 'ক্রিটিক্যাল কেয়ার বিশেষজ্ঞ' }
];

export const MOCK_ARTICLES: Record<Language, HealthArticle[]> = {
  en: [],
  bn: []
};

export const TRANSLATIONS: Record<Language, Translation> = {
  en: {
    nav: {
      home: "Home",
      emergency: "Emergency SOS",
      assistant: "AI Assistant",
      tools: "Health Tools",
      articles: "Health Tips",
      profile: "Profile"
    },
    hero: {
      title: "Your Complete Medical Companion",
      subtitle: "Find the best doctors, hospitals, and emergency services instantly.",
      emergencyBtn: "Emergency SOS"
    },
    search: {
      placeholder: "Search for doctors, hospitals, or services...",
      detectLocation: "Use My Location",
      voiceSearch: "Voice Search",
      listening: "Listening..."
    },
    filters: {
      title: "Filters",
      location: "Location / Area",
      specialty: "Department / Specialty",
      gender: "Doctor Gender",
      male: "Male",
      female: "Female",
      any: "Any",
      fee: "Consultation Fee",
      availability: "Availability",
      verified: "Verified Only"
    },
    tabs: {
      doctors: "Doctors",
      hospitals: "Hospitals",
      ambulance: "Ambulance",
      pharmacy: "Pharmacy",
      bloodBank: "Blood Bank",
      oxygen: "Oxygen"
    },
    tools: {
      title: "Smart Health Dashboard",
      bmi: "BMI Calculator",
      bmiDesc: "Check your Body Mass Index",
      pregnancy: "Pregnancy Tracker",
      pregnancyDesc: "Track your due date and weeks",
      vaccine: "Vaccination Schedule",
      vaccineDesc: "Child immunization tracker",
      calculate: "Calculate Now",
      result: "Result"
    },
    assistant: {
      title: "AI Health Assistant (Safe Mode)",
      subtitle: "Ask me about symptoms, doctors, or general health advice. I cannot provide medical diagnoses.",
      placeholder: "Type your health question here...",
      disclaimer: "This AI provides information, not medical advice. In emergencies, call 999.",
      send: "Send"
    },
    emergency: {
      title: "Emergency Services",
      call999: "Call 999 - National Emergency",
      ambulanceFinder: "Find Nearest Ambulance",
      bloodDonor: "Find Blood Donors"
    },
    common: {
      bookAppointment: "Book Appointment",
      viewProfile: "View Profile",
      callNow: "Call Now",
      directions: "Get Directions",
      loading: "Scanning medical database...",
      noResults: "No results found. Try expanding your search area.",
      error: "Connection error. Please try again.",
      verified: "Verified",
      experience: "Exp",
      fee: "Fee"
    },
    booking: {
      title: "Book Appointment",
      patientName: "Patient Name",
      selectDate: "Select Date",
      selectTime: "Select Time",
      confirm: "Confirm Booking",
      success: "Booking Successful!"
    },
    hospital: {
      emergency: "Emergency",
      departments: "Departments"
    },
    auth: {
      login: "Login",
      signup: "Create Account",
      name: "Full Name",
      email: "Email Address",
      password: "Password",
      submit: "Continue",
      haveAccount: "Already have an account?",
      noAccount: "Don't have an account?",
      logout: "Logout",
      welcome: "Welcome"
    }
  },
  bn: {
    nav: {
      home: "হোম",
      emergency: "জরুরি সেবা",
      assistant: "এআই অ্যাসিস্ট্যান্ট",
      tools: "হেলথ টুলস",
      articles: "স্বাস্থ্য টিপস",
      profile: "প্রোফাইল"
    },
    hero: {
      title: "আপনার নির্ভরযোগ্য স্বাস্থ্য সঙ্গী",
      subtitle: "সেরা ডাক্তার, হাসপাতাল এবং জরুরি সেবা খুঁজুন মুহূর্তের মধ্যে।",
      emergencyBtn: "জরুরি সেবা"
    },
    search: {
      placeholder: "ডাক্তার, হাসপাতাল বা সেবা খুঁজুন...",
      detectLocation: "আমার লোকেশন",
      voiceSearch: "ভয়েস সার্চ",
      listening: "শুনছি..."
    },
    filters: {
      title: "ফিল্টার",
      location: "লোকেশন / এলাকা",
      specialty: "বিভাগ / বিশেষজ্ঞ",
      gender: "ডাক্তারের লিঙ্গ",
      male: "পুরুষ",
      female: "মহিলা",
      any: "যেকোনো",
      fee: "কনসালটেশন ফি",
      availability: "এভেইলেবিলিটি",
      verified: "ভেরিফাইড"
    },
    tabs: {
      doctors: "ডাক্তার",
      hospitals: "হাসপাতাল",
      ambulance: "অ্যাম্বুলেন্স",
      pharmacy: "ফার্মেসি",
      bloodBank: "ব্লাড ব্যাংক",
      oxygen: "অক্সিজেন"
    },
    tools: {
      title: "স্মার্ট হেলথ ড্যাশবোর্ড",
      bmi: "BMI ক্যালকুলেটর",
      bmiDesc: "আপনার বডি মাস ইনডেক্স দেখুন",
      pregnancy: "প্রেগনেন্সি ট্র্যাকার",
      pregnancyDesc: "প্রসবের তারিখ এবং সপ্তাহ দেখুন",
      vaccine: "টিকা তালিকা",
      vaccineDesc: "শিশুর টিকার সময়সূচি",
      calculate: "হিসাব করুন",
      result: "ফলাফল"
    },
    assistant: {
      title: "এআই হেলথ অ্যাসিস্ট্যান্ট (সেফ মোড)",
      subtitle: "লক্ষণ, ডাক্তার বা সাধারণ স্বাস্থ্য সম্পর্কে জিজ্ঞাসা করুন। আমি চিকিৎসা পরামর্শ দিতে পারি না।",
      placeholder: "আপনার প্রশ্ন এখানে লিখুন...",
      disclaimer: "এটি কেবল তথ্য প্রদান করে, চিকিৎসা পরামর্শ নয়। জরুরি প্রয়োজনে ৯৯৯ কল করুন।",
      send: "পাঠান"
    },
    emergency: {
      title: "জরুরি সেবা",
      call999: "৯৯৯ - জাতীয় জরুরি সেবা",
      ambulanceFinder: "নিকটবর্তী অ্যাম্বুলেন্স",
      bloodDonor: "রক্তদাতা খুঁজুন"
    },
    common: {
      bookAppointment: "অ্যাপয়েন্টমেন্ট নিন",
      viewProfile: "প্রোফাইল দেখুন",
      callNow: "কল করুন",
      directions: "দিকনির্দেশনা",
      loading: "মেডিকেল ডেটাবেস স্ক্যান করা হচ্ছে...",
      noResults: "কোন ফলাফল পাওয়া যায়নি। অনুসন্ধান এলাকা বাড়ানোর চেষ্টা করুন।",
      error: "সংযোগ ত্রুটি। আবার চেষ্টা করুন।",
      verified: "ভেরিফাইড",
      experience: "অভিজ্ঞতা",
      fee: "ফি"
    },
    booking: {
      title: "অ্যাপয়েন্টমেন্ট বুক করুন",
      patientName: "রোগীর নাম",
      selectDate: "তারিখ নির্বাচন করুন",
      selectTime: "সময় নির্বাচন করুন",
      confirm: "বুকিং নিশ্চিত করুন",
      success: "বুকিং সফল হয়েছে!"
    },
    hospital: {
      emergency: "জরুরি",
      departments: "বিভাগসমূহ"
    },
    auth: {
      login: "লগইন",
      signup: "অ্যাকাউন্ট তৈরি করুন",
      name: "আপনার নাম",
      email: "ইমেইল ঠিকানা",
      password: "পাসওয়ার্ড",
      submit: "চালিয়ে যান",
      haveAccount: "ইতোমধ্যে একটি অ্যাকাউন্ট আছে?",
      noAccount: "কোনো অ্যাকাউন্ট নেই?",
      logout: "লগআউট",
      welcome: "স্বাগতম"
    }
  }
};
