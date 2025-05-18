import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { motion } from 'framer-motion';
import { Camera, Upload, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { useMoodContext } from '../contexts/MoodContext';
import { detectMoodFromImage } from '../services/moodDetection';
import StepIndicator from '../components/ui/StepIndicator';

const CaptureImage = () => {
  const webcamRef = useRef<Webcam>(null);
  const navigate = useNavigate();
  const [captureMode, setCaptureMode] = useState<'camera' | 'upload'>('camera');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { setImage, setDetectedMood } = useMoodContext();

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
    }
  }, [webcamRef]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setCapturedImage(reader.result as string);
        setIsUploading(false);
      };
      
      reader.readAsDataURL(file);
    }
  };

  const resetCapture = () => {
    setCapturedImage(null);
  };

  const handleContinue = async () => {
    if (capturedImage) {
      setIsProcessing(true);
      setImage(capturedImage);
      
      // Simulate mood detection - would call actual AI API in production
      const mood = await detectMoodFromImage(capturedImage);
      setDetectedMood(mood);
      
      setIsProcessing(false);
      navigate('/voice');
    }
  };

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <StepIndicator currentStep={1} totalSteps={4} />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-2 text-center">Capture Your Mood</h1>
          <p className="text-gray-600 mb-8 text-center">
            We'll analyze your expression to suggest recipes that match your mood
          </p>

          {/* Toggle between camera and upload */}
          <div className="bg-white rounded-lg shadow-md p-1 flex mb-6 max-w-xs mx-auto">
            <button
              onClick={() => setCaptureMode('camera')}
              className={`flex-1 py-2 px-4 rounded ${
                captureMode === 'camera'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } transition-colors flex items-center justify-center`}
            >
              <Camera size={18} className="mr-2" /> Camera
            </button>
            <button
              onClick={() => setCaptureMode('upload')}
              className={`flex-1 py-2 px-4 rounded ${
                captureMode === 'upload'
                  ? 'bg-primary-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } transition-colors flex items-center justify-center`}
            >
              <Upload size={18} className="mr-2" /> Upload
            </button>
          </div>

          {/* Camera or Upload Section */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
            {captureMode === 'camera' ? (
              !capturedImage ? (
                <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    className="w-full h-auto"
                  />
                </div>
              ) : (
                <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                  <img 
                    src={capturedImage} 
                    alt="Captured" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              )
            ) : (
              <div className="p-8 flex flex-col items-center">
                {capturedImage ? (
                  <div className="w-full mb-4">
                    <img 
                      src={capturedImage} 
                      alt="Uploaded" 
                      className="max-w-full h-auto rounded-lg mx-auto"
                    />
                  </div>
                ) : (
                  <div className="w-full mb-4">
                    <label className="block w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                      <Upload size={32} className="text-gray-400 mb-2" />
                      <span className="text-gray-500">Click to upload an image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4">
            {captureMode === 'camera' && !capturedImage && (
              <button
                onClick={capture}
                className="btn-primary flex items-center"
                disabled={isProcessing}
              >
                <Camera size={18} className="mr-2" /> Capture
              </button>
            )}
            
            {captureMode === 'upload' && !capturedImage && (
              <label className="btn-primary flex items-center cursor-pointer">
                <Upload size={18} className="mr-2" />
                {isUploading ? 'Uploading...' : 'Upload Image'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={isUploading || isProcessing}
                />
              </label>
            )}
            
            {capturedImage && (
              <>
                <button
                  onClick={resetCapture}
                  className="btn-outline flex items-center"
                  disabled={isProcessing}
                >
                  <RefreshCw size={18} className="mr-2" /> Retake
                </button>
                <button
                  onClick={handleContinue}
                  className="btn-primary flex items-center"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw size={18} className="mr-2 animate-spin" /> Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={18} className="mr-2" /> Continue
                    </>
                  )}
                </button>
              </>
            )}
          </div>

          {/* Tips */}
          <div className="mt-8 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-2">Tips for better mood detection:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex items-start">
                <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                Ensure your face is clearly visible and well-lit
              </li>
              <li className="flex items-start">
                <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5" />
                Look directly at the camera with a natural expression
              </li>
              <li className="flex items-start">
                <XCircle size={16} className="text-red-500 mr-2 mt-0.5" />
                Avoid wearing sunglasses or items that cover your face
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CaptureImage;