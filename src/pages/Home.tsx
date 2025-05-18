import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, Mic, Settings, ArrowRight } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Mood Detection',
      description: 'Upload a selfie or use your camera to detect your current mood.',
      icon: <Camera className="h-8 w-8 text-primary-500" />,
      action: () => navigate('/capture')
    },
    {
      title: 'Voice Input',
      description: 'Tell us how you feel for more accurate recommendations.',
      icon: <Mic className="h-8 w-8 text-secondary-500" />,
      action: () => navigate('/voice')
    },
    {
      title: 'Preferences',
      description: 'Set your dietary restrictions, health goals, and allergies.',
      icon: <Settings className="h-8 w-8 text-accent-500" />,
      action: () => navigate('/preferences')
    }
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            <span className="text-primary-500">Eat</span> What Your{' '}
            <span className="text-accent-500">Mood</span> Needs
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            MoodMeal AI detects your emotions and recommends personalized recipes to match your mood, 
            dietary preferences, and health goals.
          </p>
          <button
            onClick={() => navigate('/capture')}
            className="btn-primary text-lg px-8 py-3 inline-flex items-center"
          >
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </motion.div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card p-6 flex flex-col items-center text-center"
              onClick={feature.action}
            >
              <div className="mb-4 p-3 bg-gray-50 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <button
                className="mt-auto btn-outline text-sm inline-flex items-center"
                onClick={feature.action}
              >
                Continue <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { step: '1', title: 'Capture Your Mood', description: 'Take a selfie or tell us how you feel' },
              { step: '2', title: 'Set Preferences', description: 'Select your dietary needs and health goals' },
              { step: '3', title: 'Get Personalized Recipes', description: 'Receive mood-matched meal recommendations' }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold text-lg mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;