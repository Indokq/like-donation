import { useState } from 'react';
import DonationForm from './components/DonationForm';
import QRCodeDisplay from './components/QRCodeDisplay';

function App() {
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setShowQR(!showQR)}
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-2 sm:p-3"
          >
            <img 
              src="/logo.jpg" 
              alt="LIKE Foundation" 
              className="h-12 sm:h-16 w-auto"
            />
          </button>
        </div>

        {showQR ? (
          <div className="max-w-2xl mx-auto">
            <QRCodeDisplay />
          </div>
        ) : (
          <DonationForm />
        )}
      </div>
    </div>
  );
}

export default App;
