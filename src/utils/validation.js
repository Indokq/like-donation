export function validatePhone(phone) {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Check if it starts with 08 or 628
  if (cleaned.startsWith('08')) {
    return cleaned.length >= 10 && cleaned.length <= 13;
  } else if (cleaned.startsWith('628')) {
    return cleaned.length >= 11 && cleaned.length <= 14;
  }
  
  return false;
}

export function formatPhoneForWhatsApp(phone) {
  // Remove all non-digit characters
  let cleaned = phone.replace(/\D/g, '');
  
  // Convert 08xxx to 628xxx
  if (cleaned.startsWith('08')) {
    cleaned = '62' + cleaned.substring(1);
  }
  
  return cleaned;
}

export function validateForm(formData) {
  const errors = {};
  
  if (!formData.nama || formData.nama.trim().length < 2) {
    errors.nama = 'Nama harus diisi minimal 2 karakter';
  }
  
  if (!formData.noWa) {
    errors.noWa = 'Nomor WhatsApp harus diisi';
  } else if (!validatePhone(formData.noWa)) {
    errors.noWa = 'Format nomor WhatsApp tidak valid (contoh: 081234567890)';
  }
  
  if (!formData.alamat || formData.alamat.trim().length < 5) {
    errors.alamat = 'Alamat harus diisi minimal 5 karakter';
  }
  
  if (!formData.nominal || formData.nominal < 1000) {
    errors.nominal = 'Nominal minimal Rp 1.000';
  }
  
  if (!formData.pembayaran) {
    errors.pembayaran = 'Keterangan pembayaran harus dipilih';
  }
  
  if (!formData.program || formData.program.trim().length < 2) {
    errors.program = 'Program harus diisi';
  }
  
  return errors;
}
