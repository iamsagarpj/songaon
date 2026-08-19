import type { FormDocument, EmergencyContact, BudgetRecord, NewsArticle, Event, GalleryItem, EducationInstitution, EmploymentOpportunity, TimelineEvent } from '@/types';
import { villageImages, topicImages } from '@/config/images';

export const forms: FormDocument[] = [
  {
    id: '1',
    slug: 'birth-certificate',
    name: { mr: 'जन्म प्रमाणपत्र अर्ज', en: 'Birth Certificate Application' },
    category: { mr: 'जन्म', en: 'Birth' },
    purpose: { mr: 'जन्म प्रमाणपत्र मिळवण्यासाठी', en: 'To obtain birth certificate' },
    documents: { mr: 'रुग्णालय दाखला, आधार, पालकांचे दाखले', en: 'Hospital certificate, Aadhaar, Parent documents' },
    instructions: { mr: 'सोनेगाव त. सातारा ग्रामपंचायत कार्यालयात अर्ज सादर करा', en: 'Submit at Sonegaon T. Satara Gram Panchayat office' },
    isSample: true,
  },
  {
    id: '2',
    slug: 'death-certificate',
    name: { mr: 'मृत्यू प्रमाणपत्र अर्ज', en: 'Death Certificate Application' },
    category: { mr: 'मृत्यू', en: 'Death' },
    purpose: { mr: 'मृत्यू प्रमाणपत्र मिळवण्यासाठी', en: 'To obtain death certificate' },
    documents: { mr: 'वैद्यकीय दाखला, आधार', en: 'Medical certificate, Aadhaar' },
    instructions: { mr: '७ दिवसांच्या आत ग्रामपंचायत कार्यालयात अर्ज', en: 'Submit within 7 days at Gram Panchayat office' },
    isSample: true,
  },
  {
    id: '3',
    slug: 'residence-certificate',
    name: { mr: 'रहिवासी दाखला', en: 'Residence Certificate' },
    category: { mr: 'रहिवासी', en: 'Residence' },
    purpose: { mr: 'रहिवासी दाखला मिळवण्यासाठी', en: 'To obtain residence certificate' },
    documents: { mr: 'आधार, रेशन कार्ड, १५ वर्षे राहण्याचा पुरावा', en: 'Aadhaar, Ration card, 15 years residence proof' },
    instructions: { mr: 'सोनेगाव त. सातारा ग्रामपंचायत कार्यालयात अर्ज', en: 'Apply at Sonegaon T. Satara Gram Panchayat office' },
    isSample: true,
  },
  {
    id: '4',
    slug: 'income-certificate',
    name: { mr: 'उत्पन्न दाखला', en: 'Income Certificate' },
    category: { mr: 'उत्पन्न', en: 'Income' },
    purpose: { mr: 'उत्पन्न दाखला मिळवण्यासाठी', en: 'To obtain income certificate' },
    documents: { mr: 'आधार, उत्पन्नाचा पुरावा', en: 'Aadhaar, Income proof' },
    instructions: { mr: 'सातारा तहसील कार्यालयात अर्ज', en: 'Apply at Satara Tahsildar office' },
    isSample: true,
  },
];

export const emergencyContacts: EmergencyContact[] = [
  { id: '1', name: { mr: 'पोलीस', en: 'Police' }, phone: '100', icon: 'shield' },
  { id: '2', name: { mr: 'ॲम्ब्युलन्स', en: 'Ambulance' }, phone: '108', icon: 'heart-pulse' },
  { id: '3', name: { mr: 'अग्निशमन', en: 'Fire' }, phone: '101', icon: 'flame' },
  { id: '4', name: { mr: 'सातारा जिल्हा रुग्णालय', en: 'Satara District Hospital' }, phone: '02162-233444', icon: 'stethoscope' },
  { id: '5', name: { mr: 'सोनेगाव त. सातारा ग्रामपंचायत', en: 'Sonegaon T. Satara Gram Panchayat' }, phone: '02162-234291', icon: 'landmark' },
];

export const budgetRecords: BudgetRecord[] = [
  {
    year: '2025-26',
    totalIncome: 1240000,
    governmentGrants: 950000,
    localRevenue: 290000,
    developmentBudget: 980000,
    spent: 720000,
    remaining: 520000,
    isSample: true,
  },
  {
    year: '2024-25',
    totalIncome: 1080000,
    governmentGrants: 820000,
    localRevenue: 260000,
    developmentBudget: 850000,
    spent: 790000,
    remaining: 290000,
    isSample: true,
  },
];

export const newsArticles: NewsArticle[] = [
  {
    id: '1',
    slug: 'zp-school-sports-day',
    title: { mr: 'जि.प. शाळा — क्रीडा दिन', en: 'ZP School — Sports Day' },
    summary: { mr: '१९१३ पासून सेवा देणाऱ्या जि.प. प्राथमिक शाळेचा वार्षिक क्रीडा दिन.', en: 'Annual sports day at ZP Primary School (est. 1913).' },
    content: {
      mr: 'जिल्हा परिषद प्राथमिक शाळा, सोनेगाव त. सातारा येथे वार्षिक क्रीडा दिन आयोजित करण्यात आला. विद्यार्थ्यांनी धाव, कबड्डी आणि इतर खेळांमध्ये सहभाग घेतला. शाळा १९१३ पासून गावात शिक्षण सेवा पुरवते.',
      en: 'Annual sports day held at Zilla Parishad Primary School, Sonegaon T. Satara. Students participated in running, kabaddi and other games. The school has served the village since 1913.',
    },
    date: '2026-02-15',
    category: { mr: 'शिक्षण', en: 'Education' },
    image: topicImages.sports,
  },
  {
    id: '2',
    slug: 'clean-village-sonegaon',
    title: { mr: 'स्वच्छ सोनेगाव मोहीम', en: 'Clean Sonegaon Drive' },
    summary: { mr: 'ग्रामपंचायत आणि नागरिकांनी मिळून स्वच्छता मोहीम.', en: 'Cleanliness drive by Gram Panchayat and citizens.' },
    content: {
      mr: 'सोनेगाव त. सातारा ग्रामात स्वच्छता मोहिमेत ग्रामपंचायत, अंगणवाडी workers आणि नागरिकांनी सहभाग घेतला. कचरा विलगीकरण आणि गाव स्वच्छ ठेवण्याचा संकल्प.',
      en: 'Gram Panchayat, anganwadi workers and citizens participated in cleanliness drive in Sonegaon T. Satara. Pledge for waste segregation and clean village.',
    },
    date: '2026-02-08',
    category: { mr: 'स्वच्छता', en: 'Cleanliness' },
    image: topicImages.cleanliness,
  },
];

export const events: Event[] = [
  {
    id: '1',
    slug: 'gram-sabha-march',
    title: { mr: 'ग्रामसभा बैठक', en: 'Gram Sabha Meeting' },
    description: { mr: 'विकास कामे, जल जीवन मिशन आणि योजनांवर चर्चा', en: 'Discussion on development, Jal Jeevan Mission and schemes' },
    date: '2026-03-20',
    time: '10:00',
    location: { mr: 'सोनेगाव त. सातारा ग्रामपंचायत कार्यालय', en: 'Sonegaon T. Satara GP Office' },
  },
  {
    id: '2',
    slug: 'health-camp-march',
    title: { mr: 'मोफत आरोग्य शिबिर', en: 'Free Health Camp' },
    description: { mr: 'गोडोली (सातारा) आरोग्य केंद्र — मोफत तपासणी', en: 'Free checkup at Godoli (Satara) health centre' },
    date: '2026-03-25',
    time: '09:00',
    location: { mr: 'गोडोली शहरी आरोग्य केंद्र, सातारा', en: 'Godoli Urban Health Centre, Satara' },
  },
  {
    id: '3',
    slug: 'tree-plantation-satara',
    title: { mr: 'वृक्षारोपण — सातारा परिसर', en: 'Tree Plantation — Satara Region' },
    description: { mr: 'ग्रामपंचायत अंतर्गत ५० झाडे लावण्याचा कार्यक्रम', en: 'Program to plant 50 trees under Gram Panchayat' },
    date: '2026-03-28',
    time: '07:00',
    location: { mr: 'सोनेगाव त. सातारा — गावाच्या सीमेवर', en: 'Sonegaon T. Satara — village boundary' },
  },
];

export const galleryItems: GalleryItem[] = [
  { id: '1', title: { mr: 'अजिंक्यतारा किल्ला — सातारा', en: 'Ajinkyatara Fort — Satara' }, category: { mr: 'पर्यटन', en: 'Tourism' }, image: villageImages.hero },
  { id: '2', title: { mr: 'यवतेश्वर मंदिर — सातारा', en: 'Yawateshwar Temple — Satara' }, category: { mr: 'मंदिर', en: 'Temple' }, image: villageImages.temple },
  { id: '3', title: { mr: 'अजिंक्यतारा व सातारा शहर', en: 'Ajinkyatara & Satara City' }, category: { mr: 'दृश्य', en: 'Landscape' }, image: villageImages.landscape },
  { id: '4', title: { mr: 'कृष्णा नदी — सातारा (ऐतिहासिक)', en: 'Krishna River — Satara (historic)' }, category: { mr: 'निसर्ग', en: 'Nature' }, image: villageImages.forest },
  { id: '5', title: { mr: 'खंबाटकी घाट — पुणे-सातारा मार्ग', en: 'Khambatki Ghat — Pune-Satara Route' }, category: { mr: 'रस्ते', en: 'Roads' }, image: villageImages.villageView },
  { id: '6', title: { mr: 'सातारा शहर — अजिंक्यतार्यावरून', en: 'Satara City from Ajinkyatara' }, category: { mr: 'शहर', en: 'City' }, image: villageImages.sataraView },
  { id: '7', title: { mr: 'वेणा तलाव — महाबळेश्वर परिसर', en: 'Venna Lake — Mahabaleshwar Region' }, category: { mr: 'पाणी', en: 'Water' }, image: villageImages.river },
];

export const educationInstitutions: EducationInstitution[] = [
  {
    id: '1',
    name: { mr: 'जिल्हा परिषद प्राथमिक शाळा, सोनेगाव त. सातारा', en: 'Zilla Parishad Primary School, Sonegaon T. Satara' },
    type: 'school',
    address: { mr: 'सोनेगाव त. सातारा, सातारा — ४१५००२', en: 'Sonegaon T. Satara, Satara — 415002' },
    contact: 'gpsongaontarf@gmail.com',
    students: 180,
    facilities: { mr: 'प्राथमिक व उच्च प्राथमिक — १९१३ पासून', en: 'Primary & upper primary — since 1913' },
    photo: topicImages.school,
  },
  {
    id: '2',
    name: { mr: 'दौलतराव भोसले इंग्रजी माध्यम शाळा', en: 'Daulatrao Bhosale English Medium School' },
    type: 'school',
    address: { mr: 'सोनेगाव त. सातारा', en: 'Sonegaon T. Satara' },
    contact: 'gpsongaontarf@gmail.com',
    facilities: { mr: 'माध्यमिक शिक्षण — १९७१ पासून', en: 'Secondary education — since 1971' },
    photo: topicImages.children,
  },
  {
    id: '3',
    name: { mr: 'अंगणवाडी केंद्र, सोनेगाव त. सातारा', en: 'Anganwadi Centre, Sonegaon T. Satara' },
    type: 'anganwadi',
    address: { mr: 'सोनेगाव त. सातारा', en: 'Sonegaon T. Satara' },
    contact: 'gpsongaontarf@gmail.com',
    students: 35,
    facilities: { mr: 'पोषण आहार, आरोग्य तपासणी, खेळ', en: 'Nutrition meal, health checkup, play' },
    photo: topicImages.children,
  },
];

export const employmentOpportunities: EmploymentOpportunity[] = [
  {
    id: '1',
    title: { mr: 'MGNREGA — ग्रामीण रोजगार', en: 'MGNREGA — Rural Employment' },
    category: { mr: 'रोजगार', en: 'Employment' },
    description: { mr: 'सोनेगाव त. सातारा ग्रामात MGNREGA अंतर्गत रस्ता दुरुस्ती आणि जल संधारण काम', en: 'Road repair and water conservation under MGNREGA in Sonegaon T. Satara' },
    contact: '02162-234291',
  },
  {
    id: '2',
    title: { mr: 'SHG — बचत गट प्रशिक्षण', en: 'SHG — Self-Help Group Training' },
    category: { mr: 'प्रशिक्षण', en: 'Training' },
    description: { mr: 'महिला बचत गटांसाठी स्वयंरोजगार प्रशिक्षण — सातारा ब्लॉक', en: 'Self-employment training for women SHGs — Satara block' },
    deadline: '2026-04-30',
  },
];

export const timelineEvents: TimelineEvent[] = [
  { year: 1913, title: { mr: 'जि.प. प्राथमिक शाळा सुरू', en: 'ZP Primary School Started' }, description: { mr: 'जिल्हा परिषद प्राथमिक शाळा, सोनेगाव त. सातारा स्थापना', en: 'Zilla Parishad Primary School, Sonegaon T. Satara established' } },
  { year: 1971, title: { mr: 'इंग्रजी माध्यम शाळा', en: 'English Medium School' }, description: { mr: 'दौलतराव भोसले इंग्रजी माध्यम माध्यमिक शाळा सुरू', en: 'Daulatrao Bhosale English medium secondary school started' } },
  { year: 2011, title: { mr: 'जनगणना २०११', en: 'Census 2011' }, description: { mr: 'लोकसंख्या २,३८४ | ४८९ कुटुंबे | ~७८% साक्षरता', en: 'Population 2,384 | 489 households | ~78% literacy' } },
  { year: 2020, title: { mr: 'CSC व डिजिटल सुविधा', en: 'CSC & Digital Services' }, description: { mr: 'ग्रामपंचायत कार्यालयात CSC, वाचनालय आणि Wi-Fi', en: 'CSC, library and Wi-Fi at Gram Panchayat office' } },
  { year: 2026, title: { mr: 'डिजिटल ग्रामपंचायत', en: 'Digital Gram Panchayat' }, description: { mr: 'सोनेगाव त. सातारा डिजिटल पोर्टल सुरू', en: 'Sonegaon T. Satara digital portal launched' } },
];

export const complaintCategories = [
  { mr: 'पाणी', en: 'Water' },
  { mr: 'रस्ते', en: 'Roads' },
  { mr: 'वीज', en: 'Electricity' },
  { mr: 'कचरा', en: 'Garbage' },
  { mr: 'स्वच्छता', en: 'Cleanliness' },
  { mr: 'इतर', en: 'Other' },
];
