import { QRCode } from 'react-qrcode-logo';

export default function QRCodeDisplay() {
  const currentUrl = window.location.href;

  const handleDownload = () => {
    const canvas = document.getElementById('qr-code-canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'donation-qr-code.png';
      link.href = url;
      link.click();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Bagikan Form Donasi</h2>
      <p className="text-gray-600 mb-6">Scan QR Code ini untuk mengakses form donasi</p>
      
      <div className="flex justify-center mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <QRCode
            id="qr-code-canvas"
            value={currentUrl}
            size={250}
            qrStyle="dots"
            eyeRadius={5}
            bgColor="#ffffff"
            fgColor="#000000"
          />
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
      >
        Download QR Code
      </button>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-2">Link Form:</p>
        <p className="text-sm font-mono text-gray-800 break-all">{currentUrl}</p>
      </div>
    </div>
  );
}
