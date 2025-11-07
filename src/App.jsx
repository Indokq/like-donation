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
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            {showQR ? 'Lihat Form' : 'Lihat QR Code'}
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
