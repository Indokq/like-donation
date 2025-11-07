export default function QRCodeDisplay() {
  return (
    <div className="bg-white rounded-lg shadow-xl p-8 text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">LIKE Foundation</h2>
      <p className="text-gray-600 mb-6">Lingkar Insan Kebaikan</p>
      
      <div className="flex justify-center mb-6">
        <div className="bg-white p-8 rounded-lg">
          <img 
            src="/logo.jpg" 
            alt="LIKE Foundation Logo" 
            className="w-64 h-auto"
          />
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-700 font-semibold mb-2">Jl. Mayjend Panjaitan - Karang Kulon</p>
        <p className="text-sm text-gray-600">Kel. Papahan, Kec. Tasikmadu,</p>
        <p className="text-sm text-gray-600">Kab. Karanganyar, Jawa Tengah.</p>
      </div>
    </div>
  );
}
