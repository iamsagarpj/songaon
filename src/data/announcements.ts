import type { Announcement } from '@/types';

export const announcements: Announcement[] = [
  {
    id: '1',
    slug: 'gram-sabha-march-2026',
    title: {
      mr: 'ग्रामसभा बैठक — २० मार्च २०२६',
      en: 'Gram Sabha Meeting — 20 March 2026',
    },
    description: {
      mr: 'सोनेगाव त. सातारा ग्रामपंचायत कार्यालयात ग्रामसभा — सर्व नागरिकांना उपस्थित राहण्याचे आवाहन.',
      en: 'Gram Sabha at Sonegaon T. Satara Gram Panchayat office — all citizens invited.',
    },
    content: {
      mr: 'सोनेगाव त. सातारा ग्रामपंचायत कार्यालय (आ. पो. सोनेगाव त. सातारा, पिन ४१५००२) येथे २० मार्च २०२६ रोजी सकाळी १० वाजता ग्रामसभा बैठक आयोजित करण्यात आली आहे. विकास कामे, १५ वित्त आयोग निधी, पाणीपुरवठा आणि नागरिक तक्रारींवर चर्चा होईल.',
      en: 'A Gram Sabha meeting will be held on 20 March 2026 at 10 AM at Sonegaon T. Satara Gram Panchayat office (At Post Sonegaon T. Satara, PIN 415002). Development works, 15th Finance Commission funds, water supply and citizen complaints will be discussed.',
    },
    date: '2026-03-01',
    category: { mr: 'ग्रामसभा', en: 'Gram Sabha' },
    status: 'important',
    pinned: true,
  },
  {
    id: '2',
    slug: 'health-camp-sonegaon',
    title: {
      mr: 'मोफत आरोग्य तपासणी — सातारा',
      en: 'Free Health Checkup — Satara',
    },
    description: {
      mr: 'जवळच्या सरकारी आरोग्य केंद्रात मोफत तपासणी शिबिर.',
      en: 'Free checkup camp at nearby government health centre.',
    },
    content: {
      mr: '२५ मार्च २०२६ रोजी गोडोली (सातारा) शहरी आरोग्य केंद्र व सातारा जिल्हा रुग्णालय परिसरात मोफत आरोग्य तपासणी शिबिर. संपर्क: gpsongaontarf@gmail.com',
      en: 'Free health checkup camp on 25 March 2026 at Godoli (Satara) Urban Health Centre and Satara district hospital area. Contact: gpsongaontarf@gmail.com',
    },
    date: '2026-02-28',
    category: { mr: 'आरोग्य', en: 'Health' },
    status: 'new',
    pinned: true,
  },
  {
    id: '3',
    slug: 'school-admission-2026',
    title: {
      mr: 'जि.प. प्राथमिक शाळा — प्रवेश सुरू',
      en: 'ZP Primary School — Admissions Open',
    },
    description: {
      mr: '१९१३ पासून सेवा देणारी जि.प. प्राथमिक शाळा, सोनेगाव त. सातारा — नवीन प्रवेश.',
      en: 'ZP Primary School Sonegaon T. Satara (est. 1913) — new admissions.',
    },
    content: {
      mr: 'जिल्हा परिषद प्राथमिक शाळा, सोनेगाव त. सातारा (पिन ४१५००२) येथे २०२६-२७ शैक्षणिक वर्षासाठी प्रवेश सुरू. प्रवेशासाठी शाळेशी किंवा ग्रामपंचायत कार्यालयाशी संपर्क करा.',
      en: 'Admissions open for 2026-27 at Zilla Parishad Primary School, Sonegaon T. Satara (PIN 415002). Contact school or Gram Panchayat office.',
    },
    date: '2026-02-25',
    category: { mr: 'शिक्षण', en: 'Education' },
    status: 'new',
  },
  {
    id: '4',
    slug: 'jal-jeevan-mission-sonegaon',
    title: {
      mr: 'जल जीवन मिशन — नळ कनेक्शन नोंदणी',
      en: 'Jal Jeevan Mission — Tap Connection Registration',
    },
    description: {
      mr: 'प्रत्येक घराला नळ पाण्याचे कनेक्शन — नोंदणी सुरू.',
      en: 'Tap water connection to every household — registration open.',
    },
    content: {
      mr: 'जल जीवन मिशन अंतर्गत सोनेगाव त. सातारा ग्रामात नळ कनेक्शनसाठी नोंदणी सुरू. आवश्यक कागदपत्र: आधार, रहिवासी दाखला. ग्रामपंचायत कार्यालयात अर्ज करा.',
      en: 'Registration for tap connections under Jal Jeevan Mission in Sonegaon T. Satara. Required: Aadhaar, residence certificate. Apply at Gram Panchayat office.',
    },
    date: '2026-02-20',
    category: { mr: 'पाणी', en: 'Water' },
    status: 'urgent',
  },
];
