import { useState, useEffect } from 'react';

export default function WelcomeScreen({ onEnter }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
      <div className={`text-center transition-all duration-1000 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}>
        <div className="mb-8 flex justify-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
            <img 
              src="/logo.jpg" 
              alt="LIKE Foundation" 
              className="h-32 sm:h-40 md:h-48 w-auto mx-auto"
            />
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Selamat Datang
        </h1>
        
        <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-md mx-auto">
          LIKE Foundation - Lingkar Insan Kebaikan
          <br />
          Bersama membangun kebaikan untuk sesama
        </p>

        <button
          onClick={onEnter}
          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-4 px-12 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg"
        >
          Masuk
        </button>
      </div>
    </div>
  );
}
