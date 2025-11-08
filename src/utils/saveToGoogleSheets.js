export const saveToGoogleSheets = async (formData) => {
  const sheetsUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;

  if (!sheetsUrl) {
    console.warn('Google Sheets URL not configured');
    return { success: false, error: 'Configuration missing' };
  }

  try {
    // Prepare data for Google Sheets
    const dataToSend = {
      tanggal: formData.tanggal,
      nama: formData.nama,
      noWa: formData.noWa,
      alamat: formData.alamat,
      program: formData.program,
      programCustom: formData.program === 'Other' ? (formData.programCustom || '') : '',
      nominal: formData.nominal,
      terbilang: formData.terbilang,
      pembayaran: formData.pembayaran,
      noted: formData.noted || ''
    };

    const response = await fetch(sheetsUrl, {
      method: 'POST',
      mode: 'no-cors', // Google Apps Script requires no-cors
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend)
    });

    // Note: With no-cors mode, we can't read the response
    // We assume success if no error was thrown
    return { success: true };

  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    return { success: false, error: error.message };
  }
};
