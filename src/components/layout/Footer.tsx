import React from 'react';
import { Heart, Github, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">MoodMeal AI</h3>
            <p className="text-gray-300 text-sm">
              Your personal emotion-based recipe recommender. Find the perfect meal to match your mood.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-gray-300 hover:text-white transition">Home</a></li>
              <li><a href="/capture" className="text-gray-300 hover:text-white transition">Capture Mood</a></li>
              <li><a href="/preferences" className="text-gray-300 hover:text-white transition">Preferences</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} MoodMeal AI. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <span className="text-sm text-gray-400 flex items-center">
              Made with <Heart size={14} className="mx-1 text-red-500" /> for a better meal experience
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;