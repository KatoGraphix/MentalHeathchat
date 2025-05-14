import React, { useState } from 'react';
import { ExternalLink, Search } from 'lucide-react';
import { resources } from '../data/resources';
import { Resource } from '../types';

const ResourcesSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const categories = Array.from(new Set(resources.map(r => r.category)));
  
  const filteredResources = resources.filter(resource => {
    const matchesSearch = !searchQuery || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = !activeCategory || resource.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-purple-700 mb-6">Mental Health Resources</h2>
      
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search resources..."
            className="pl-10 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-1 rounded-full text-sm ${
            activeCategory === null
              ? 'bg-purple-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          All
        </button>
        
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-1 rounded-full text-sm capitalize ${
              activeCategory === category
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.length > 0 ? (
          filteredResources.map((resource: Resource) => (
            <div key={resource.id} className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105">
              <h3 className="font-semibold text-lg mb-2">{resource.title}</h3>
              <div className="mb-3">
                <span className="inline-block px-3 py-1 rounded-full text-xs capitalize bg-purple-100 text-purple-700">
                  {resource.category}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{resource.description}</p>
              {resource.link && (
                <a 
                  href={resource.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:underline"
                >
                  View Resource
                  <ExternalLink size={16} className="ml-1" />
                </a>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            No resources match your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesSection;