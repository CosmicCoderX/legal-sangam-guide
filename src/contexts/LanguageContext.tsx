import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'bn' | 'ta';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navbar
    services: 'Services',
    findLawyers: 'Find Lawyers',
    about: 'About',
    contact: 'Contact',
    signIn: 'Sign In',
    getStarted: 'Get Started',
    
    // Hero
    trustBadge: "India's Most Trusted Legal Platform",
    heroTitle: 'Connect with',
    heroTitleHighlight: 'Verified Legal Experts',
    heroTitleEnd: 'Across India',
    heroDescription: 'Get instant legal advice, book consultations, and access verified lawyers near you. Your trusted partner for all legal needs with AI-powered assistance and transparent pricing.',
    findLegalHelp: 'Find Legal Help Now',
    browseLawyers: 'Browse Lawyers',
    
    // Trust indicators
    lawyersCount: '10,000+ Lawyers',
    verifiedProfessionals: 'Verified Professionals',
    legalAreas: '50+ Legal Areas',
    expertCoverage: 'Expert Coverage',
    successRate: '99% Success Rate',
    clientSatisfaction: 'Client Satisfaction',
  },
  
  hi: {
    // Navbar
    services: 'सेवाएं',
    findLawyers: 'वकील खोजें',
    about: 'हमारे बारे में',
    contact: 'संपर्क',
    signIn: 'साइन इन',
    getStarted: 'शुरू करें',
    
    // Hero
    trustBadge: 'भारत का सबसे भरोसेमंद कानूनी प्लेटफॉर्म',
    heroTitle: 'जुड़ें',
    heroTitleHighlight: 'सत्यापित कानूनी विशेषज्ञों',
    heroTitleEnd: 'से पूरे भारत में',
    heroDescription: 'तुरंत कानूनी सलाह प्राप्त करें, परामर्श बुक करें, और अपने नजदीकी सत्यापित वकीलों तक पहुंचें। एआई-संचालित सहायता और पारदर्शी मूल्य निर्धारण के साथ आपका विश्वसनीय साथी।',
    findLegalHelp: 'अभी कानूनी मदद पाएं',
    browseLawyers: 'वकील देखें',
    
    // Trust indicators
    lawyersCount: '10,000+ वकील',
    verifiedProfessionals: 'सत्यापित पेशेवर',
    legalAreas: '50+ कानूनी क्षेत्र',
    expertCoverage: 'विशेषज्ञ कवरेज',
    successRate: '99% सफलता दर',
    clientSatisfaction: 'ग्राहक संतुष्टि',
  },
  
  bn: {
    // Navbar
    services: 'সেবা',
    findLawyers: 'আইনজীবী খুঁজুন',
    about: 'আমাদের সম্পর্কে',
    contact: 'যোগাযোগ',
    signIn: 'সাইন ইন',
    getStarted: 'শুরু করুন',
    
    // Hero
    trustBadge: 'ভারতের সবচেয়ে বিশ্বস্ত আইনি প্ল্যাটফর্ম',
    heroTitle: 'সংযোগ করুন',
    heroTitleHighlight: 'যাচাইকৃত আইনি বিশেষজ্ঞদের',
    heroTitleEnd: 'সাথে সমগ্র ভারতে',
    heroDescription: 'তাৎক্ষণিক আইনি পরামর্শ পান, পরামর্শ বুক করুন, এবং আপনার কাছের যাচাইকৃত আইনজীবীদের অ্যাক্সেস করুন। AI-চালিত সহায়তা এবং স্বচ্ছ মূল্যের সাথে আপনার বিশ্বস্ত অংশীদার।',
    findLegalHelp: 'এখনই আইনি সাহায্য পান',
    browseLawyers: 'আইনজীবী দেখুন',
    
    // Trust indicators
    lawyersCount: '১০,০০০+ আইনজীবী',
    verifiedProfessionals: 'যাচাইকৃত পেশাদার',
    legalAreas: '৫০+ আইনি ক্ষেত্র',
    expertCoverage: 'বিশেষজ্ঞ কভারেজ',
    successRate: '৯৯% সফলতার হার',
    clientSatisfaction: 'ক্লায়েন্ট সন্তুষ্টি',
  },
  
  ta: {
    // Navbar
    services: 'சேவைகள்',
    findLawyers: 'வழக்கறிஞர்களைக் கண்டறியவும்',
    about: 'எங்களை பற்றி',
    contact: 'தொடர்பு',
    signIn: 'உள்நுழை',
    getStarted: 'தொடங்கவும்',
    
    // Hero
    trustBadge: 'இந்தியாவின் மிகவும் நம்பகமான சட்ட தளம்',
    heroTitle: 'இணைக்கவும்',
    heroTitleHighlight: 'சரிபார்க்கப்பட்ட சட்ட நிபுணர்களுடன்',
    heroTitleEnd: 'இந்தியா முழுவதும்',
    heroDescription: 'உடனடி சட்ட ஆலோசனை பெறுங்கள், ஆலோசனைகளை புக் செய்யுங்கள், மற்றும் உங்கள் அருகிலுள்ள சரிபார்க்கப்பட்ட வழக்கறிஞர்களை அணுகுங்கள். AI-இயங்கும் உதவி மற்றும் வெளிப்படையான விலையுடன் உங்கள் நம்பகமான கூட்டாளர்.',
    findLegalHelp: 'இப்போது சட்ட உதவி பெறுங்கள்',
    browseLawyers: 'வழக்கறிஞர்களைப் பார்க்கவும்',
    
    // Trust indicators
    lawyersCount: '10,000+ வழக்கறிஞர்கள்',
    verifiedProfessionals: 'சரிபார்க்கப்பட்ட நிபுணர்கள்',
    legalAreas: '50+ சட்ட பகுதிகள்',
    expertCoverage: 'நிபுணர் கவரேஜ்',
    successRate: '99% வெற்றி விகிதம்',
    clientSatisfaction: 'வாடிக்கையாளர் திருப்தி',
  },
};

export const languageNames = {
  en: 'English',
  hi: 'हिन्दी',
  bn: 'বাংলা',
  ta: 'தமிழ்',
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
  };

  const t = (key: string): string => {
    return translations[currentLanguage][key as keyof typeof translations[typeof currentLanguage]] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};