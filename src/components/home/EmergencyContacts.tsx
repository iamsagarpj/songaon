import { Phone, Shield, Flame, HeartPulse, Landmark } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getLocalized } from '@/utils/helpers';
import type { EmergencyContact } from '@/types';

const iconMap: Record<string, typeof Phone> = {
  shield: Shield,
  'heart-pulse': HeartPulse,
  flame: Flame,
  stethoscope: HeartPulse,
  landmark: Landmark,
};

export function EmergencyContacts({ contacts }: { contacts: EmergencyContact[] }) {
  const { language } = useLanguage();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      {contacts.map((contact) => {
        const Icon = iconMap[contact.icon] || Phone;
        return (
          <a
            key={contact.id}
            href={`tel:${contact.phone.replace(/\s/g, '')}`}
            className="flex flex-col items-center gap-2 p-4 bg-red-50 border border-red-100 rounded-xl hover:bg-red-100 transition-colors min-h-[100px] justify-center"
          >
            <Icon className="w-8 h-8 text-red-600" aria-hidden="true" />
            <span className="font-semibold text-charcoal-800 text-sm text-center">
              {getLocalized(contact.name, language)}
            </span>
            <span className="text-red-700 font-bold">{contact.phone}</span>
          </a>
        );
      })}
    </div>
  );
}
