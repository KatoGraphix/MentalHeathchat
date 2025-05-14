import React from 'react';
import { Phone, Clock } from 'lucide-react';
import { crisisContacts } from '../data/crisis-contacts';

const CrisisHelp: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-purple-700 mb-2">Crisis Support</h2>
        <p className="text-gray-600">
          If you're experiencing a mental health emergency, please reach out to one of these crisis helplines immediately.
          These services provide immediate, confidential support from trained professionals.
        </p>
      </div>
      
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <Phone className="h-5 w-5 text-red-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-red-700">Emergency Help</h3>
            <p className="text-red-600">
              If you or someone else is in immediate danger, please call emergency services (911 in the US) right away.
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {crisisContacts.map(contact => (
          <div 
            key={contact.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg"
          >
            <div className="bg-purple-700 text-white p-4">
              <h3 className="font-semibold text-lg">{contact.name}</h3>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-3">
                <Phone size={18} className="text-purple-700 mr-2" />
                <a 
                  href={`tel:${contact.phone.replace(/\D/g, '')}`} 
                  className="text-xl font-bold text-purple-700 hover:underline"
                >
                  {contact.phone}
                </a>
              </div>
              <p className="text-gray-700 mb-4">{contact.description}</p>
              <div className="flex items-center text-gray-600">
                <Clock size={16} className="mr-2" />
                <span>{contact.hours}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="font-semibold text-lg text-blue-700 mb-2">Remember</h3>
        <ul className="list-disc pl-5 text-blue-600 space-y-2">
          <li>It's okay to ask for help.</li>
          <li>Mental health emergencies are real medical emergencies.</li>
          <li>You don't have to face difficult feelings alone.</li>
          <li>These services are confidential and available 24/7.</li>
        </ul>
      </div>
    </div>
  );
};

export default CrisisHelp;