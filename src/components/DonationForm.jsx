import { useState, useEffect } from 'react';
import { numberToWords } from '../utils/numberToWords';
import { validateForm, formatPhoneForWhatsApp } from '../utils/validation';
import { generateDonationPDF } from '../utils/pdfGenerator';
import { saveToGoogleSheets } from '../utils/saveToGoogleSheets';

const paymentMethods = [
  'CASH',
  'TRANSFER',
  'KESANGGUPAN'
];

const programOptions = [
  'Inspiring Quran (6jt)',
  'Inspiring Quran (3jt)',
  'Inspiring Quran (1jt)',
  'Wakaf Produktif 10 pohon (3,5jt)',
  'Lainnya'
];

export default function DonationForm() {
  const [formData, setFormData] = useState({
    tanggal: new Date().toISOString().split('T')[0],
    nama: '',
    noWa: '',
    alamat: '',
    nominal: '',
    terbilang: '',
    pembayaran: '',
    program: '',
    noted: '',
    programCustom: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (formData.nominal) {
      const words = numberToWords(parseInt(formData.nominal) || 0);
      setFormData(prev => ({ ...prev, terbilang: words }));
    } else {
      setFormData(prev => ({ ...prev, terbilang: '' }));
    }
  }, [formData.nominal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // If payment method changes from KESANGGUPAN to something else, clear noted
    if (name === 'pembayaran' && formData.pembayaran === 'KESANGGUPAN' && value !== 'KESANGGUPAN') {
      setFormData(prev => ({ ...prev, [name]: value, noted: '' }));
    }
    // If program changes from Lainnya to something else, clear programCustom
    else if (name === 'program' && formData.program === 'Lainnya' && value !== 'Lainnya') {
      setFormData(prev => ({ ...prev, [name]: value, programCustom: '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleDownloadPDF = () => {
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    generateDonationPDF(formData);
  };

  const handleSendWhatsApp = async () => {
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    // Save to Google Sheets first
    await saveToGoogleSheets(formData);

    const whatsappNumber = import.meta.env.VITE_ADMIN_WA_NUMBER || '6281234567890';
    const formattedPhone = formatPhoneForWhatsApp(formData.noWa);
    
    // Format date for WhatsApp message
    const formattedDate = new Date(formData.tanggal).toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
    
    let message = `Like Foundation

DONASI BARU

  Tanggal : ${formattedDate}
  Nama : ${formData.nama}
  No. WA : ${formattedPhone}
  Alamat : ${formData.alamat}
  Nominal : Rp ${parseInt(formData.nominal).toLocaleString('id-ID')}
  Terbilang : ${formData.terbilang}
  Keterangan : ${formData.pembayaran}`;

    // Add noted if KESANGGUPAN is selected
    if (formData.pembayaran === 'KESANGGUPAN' && formData.noted) {
      message += `\n  Catatan : ${formData.noted}`;
    }

    // Add program - use custom program if Lainnya is selected
    const programName = formData.program === 'Lainnya' && formData.programCustom 
      ? formData.programCustom 
      : formData.program;
    
    message += `\n  Program : ${programName}

Semoga diberikan kemudahan dan keberkahan untuk kita semua`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Detect mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Mobile: Use location.href for better deep link support
      setTimeout(() => {
        window.location.href = whatsappUrl;
      }, 300);
    } else {
      // Desktop: Open in new tab
      window.open(whatsappUrl, '_blank');
      
      setTimeout(() => {
        setIsSubmitting(false);
        setFormData({
          tanggal: new Date().toISOString().split('T')[0],
          nama: '',
          noWa: '',
          alamat: '',
          nominal: '',
          terbilang: '',
          pembayaran: '',
          program: '',
          noted: '',
          programCustom: ''
        });
      }, 1000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 md:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Form Donasi</h1>
            <p className="text-sm sm:text-base text-gray-600">Terima kasih atas niat baik Anda untuk berdonasi</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tanggal Donasi
              </label>
              <input
                type="text"
                name="tanggal"
                value={new Date(formData.tanggal).toLocaleDateString('id-ID', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed text-gray-700 text-base"
                style={{ WebkitAppearance: 'none', appearance: 'none', minHeight: '44px' }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.nama ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.nama && <p className="mt-1 text-sm text-red-500">{errors.nama}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nomor WhatsApp <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="noWa"
                value={formData.noWa}
                onChange={handleChange}
                placeholder="081234567890"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.noWa ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.noWa && <p className="mt-1 text-sm text-red-500">{errors.noWa}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alamat <span className="text-red-500">*</span>
              </label>
              <textarea
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
                placeholder="Masukkan alamat lengkap"
                rows={3}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.alamat ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.alamat && <p className="mt-1 text-sm text-red-500">{errors.alamat}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nominal Donasi (Rp) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="nominal"
                value={formData.nominal}
                onChange={handleChange}
                placeholder="50000"
                min="1000"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.nominal ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.nominal && <p className="mt-1 text-sm text-red-500">{errors.nominal}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Terbilang
              </label>
              <input
                type="text"
                name="terbilang"
                value={formData.terbilang}
                readOnly
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                placeholder="Otomatis terisi berdasarkan nominal"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keterangan <span className="text-red-500">*</span>
              </label>
              <select
                name="pembayaran"
                value={formData.pembayaran}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.pembayaran ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="" disabled hidden>Pilih keterangan pembayaran</option>
                {paymentMethods.map(method => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
              {errors.pembayaran && <p className="mt-1 text-sm text-red-500">{errors.pembayaran}</p>}
            </div>

            {formData.pembayaran === 'KESANGGUPAN' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Catatan/Noted
                </label>
                <textarea
                  name="noted"
                  value={formData.noted}
                  onChange={handleChange}
                  placeholder="Tambahkan catatan untuk kesanggupan donasi"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Program <span className="text-red-500">*</span>
              </label>
              <select
                name="program"
                value={formData.program}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.program ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="" disabled hidden>Pilih program donasi</option>
                {programOptions.map(program => (
                  <option key={program} value={program}>{program}</option>
                ))}
              </select>
              {errors.program && <p className="mt-1 text-sm text-red-500">{errors.program}</p>}
            </div>

            {formData.program === 'Lainnya' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Program <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="programCustom"
                  value={formData.programCustom}
                  onChange={handleChange}
                  placeholder="Masukkan nama program"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            )}
          </form>

          <div className="mt-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-4 sm:p-6 border border-blue-200">
            <div className="mb-4 flex items-start gap-2 sm:gap-3">
              <div className="flex-shrink-0 text-blue-600 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="text-xs sm:text-sm text-gray-700">
                <p className="font-semibold">Jl. Mayjend Panjaitan - Karang Kulon</p>
                <p>Kel. Papahan, Kec. Tasikmadu,</p>
                <p>Kab. Karanganyar, Jawa Tengah.</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs sm:text-sm text-gray-700 mb-3 font-medium">Donasi dapat dikirimkan melalui nomor rekening:</p>
              <div className="space-y-3 sm:space-y-2 text-xs sm:text-sm">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <div className="flex items-center gap-2">
                    <img src="/bni-logo.jpg" alt="BNI" className="w-12 h-6 object-cover rounded flex-shrink-0" />
                    <span className="font-semibold">555 - 8800 - 585</span>
                  </div>
                  <span className="text-gray-600 text-xs sm:text-inherit ml-14 sm:ml-0">a.n. Lingkar Insan Kebaikan</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <div className="flex items-center gap-2">
                    <img src="/bsi-logo.jpeg" alt="BSI" className="w-12 h-6 object-cover rounded flex-shrink-0" />
                    <span className="font-semibold">730 - 8910 - 045</span>
                  </div>
                  <span className="text-gray-600 text-xs sm:text-inherit ml-14 sm:ml-0">a.n. Wakaf Produktif Kebaikan</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <div className="flex items-center gap-2">
                    <img src="/bsi-logo.jpeg" alt="BSI" className="w-12 h-6 object-cover rounded flex-shrink-0" />
                    <span className="font-semibold">730 - 8910 - 339</span>
                  </div>
                  <span className="text-gray-600 text-xs sm:text-inherit ml-14 sm:ml-0">a.n. Solidaritas Al Aqsha</span>
                </div>
              </div>
            </div>

            <div className="mb-5 pt-4 border-t border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <p className="text-xs sm:text-sm text-gray-700 font-medium">Konfirmasi ke nomor WhatsApp</p>
              </div>
              <div className="space-y-2 sm:space-y-1 text-xs sm:text-sm ml-6 sm:ml-7">
                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:gap-1">
                  <span className="font-semibold">0821 - 3636 - 3648</span> 
                  <span className="text-gray-600 text-xs sm:text-inherit">(Hotline LIKE Foundation)</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:gap-1">
                  <span className="font-semibold">083 - 800 - 100 - 888</span> 
                  <span className="text-gray-600 text-xs sm:text-inherit">(Hotline LIKE Foundation)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <button
                type="button"
                onClick={handleDownloadPDF}
                className="py-3 px-4 sm:px-6 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Download PDF</span>
              </button>

              <button
                type="button"
                onClick={handleSendWhatsApp}
                disabled={isSubmitting}
                className={`py-3 px-4 sm:px-6 rounded-lg font-semibold text-white transition-colors flex items-center justify-center gap-2 text-sm sm:text-base ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{isSubmitting ? 'Mengirim...' : 'Submit'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
