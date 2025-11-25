
export type Language = 'en' | 'bn';
export type SearchType = 'doctor' | 'hospital' | 'ambulance' | 'pharmacy' | 'blood_bank' | 'oxygen';
export type AppSection = 'home' | 'emergency' | 'assistant' | 'tools' | 'articles' | 'profile';

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualification: string;
  location: string;
  city: string;
  experience: string;
  visitingHours: string;
  fee: string;
  contactInfo: string;
  rating?: string;
  reviewCount?: number;
  gender?: string;
  isVerified?: boolean;
  languages?: string[];
  nextAvailable?: string;
  sourceUrl?: string;
  mapUrl?: string;
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  emergencyPhone?: string;
  departments: string[];
  features?: string[]; // ICU, NICU, etc.
  visitingHours: string;
  rating?: string;
  mapUrl?: string;
  website?: string;
  totalBeds?: string;
  ambulanceAvailable?: boolean;
}

export interface MedicalService {
  id: string;
  name: string;
  type: string;
  address: string;
  phone: string;
  isOpen24Hours: boolean;
  mapUrl?: string;
  deliveryAvailable?: boolean;
}

export interface SearchFilters {
  location: string;
  specialty: string;
  gender: string;
  feeRange: string;
  searchType: SearchType;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface HealthArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  readTime: string;
  imageUrl?: string;
}

export interface UserProfile {
  name: string;
  email: string;
}

export interface Translation {
  nav: {
    home: string;
    emergency: string;
    assistant: string;
    tools: string;
    articles: string;
    profile: string;
  };
  hero: {
    title: string;
    subtitle: string;
    emergencyBtn: string;
  };
  search: {
    placeholder: string;
    detectLocation: string;
    voiceSearch: string;
    listening: string;
  };
  filters: {
    title: string;
    location: string;
    specialty: string;
    gender: string;
    male: string;
    female: string;
    any: string;
    fee: string;
    availability: string;
    verified: string;
  };
  tabs: {
    doctors: string;
    hospitals: string;
    ambulance: string;
    pharmacy: string;
    bloodBank: string;
    oxygen: string;
  };
  tools: {
    title: string;
    bmi: string;
    bmiDesc: string;
    pregnancy: string;
    pregnancyDesc: string;
    vaccine: string;
    vaccineDesc: string;
    calculate: string;
    result: string;
  };
  assistant: {
    title: string;
    subtitle: string;
    placeholder: string;
    disclaimer: string;
    send: string;
  };
  emergency: {
    title: string;
    call999: string;
    ambulanceFinder: string;
    bloodDonor: string;
  };
  common: {
    bookAppointment: string;
    viewProfile: string;
    callNow: string;
    directions: string;
    loading: string;
    noResults: string;
    error: string;
    verified: string;
    experience: string;
    fee: string;
  };
  booking: {
    title: string;
    patientName: string;
    selectDate: string;
    selectTime: string;
    confirm: string;
    success: string;
  };
  hospital: {
    emergency: string;
    departments: string;
  };
  auth: {
    login: string;
    signup: string;
    name: string;
    email: string;
    password: string;
    submit: string;
    haveAccount: string;
    noAccount: string;
    logout: string;
    welcome: string;
  };
}
