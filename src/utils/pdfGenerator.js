import { jsPDF } from 'jspdf';

export const generateDonationPDF = (formData) => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a5'
  });

  // Set default font
  doc.setFont('helvetica');

  // Header - Blue box with white text
  doc.setFillColor(41, 98, 139);
  doc.rect(10, 10, 80, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.text('Bukti', 15, 20);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Penerimaan', 15, 28);
  doc.text('Donasi', 15, 36);

  // Organization info header (top right corner)
  doc.setTextColor(0, 0, 0);
  
  // LIKE Foundation logo + text
  const logo = '/logo.jpg';
  doc.addImage(logo, 'JPEG', 100, 10, 15, 15); // Logo image
  
  // "foundation" text next to logo
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('foundation', 117, 19);
  
  // Address - aligned with logo
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('Jl. Mayjend Panjaitan - Karang Kulon', 100, 28);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text('Kel. Papahan, Kec. Tasikmadu,', 100, 32);
  doc.text('Kab. Karanganyar, Jawa Tengah.', 100, 36);

  // Bank accounts section - aligned with header
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text('Donasi dapat dikirimkan melalui nomer rekening', 100, 42);
  
  // BNI Account with logo
  const bniLogo = '/bni-logo.jpg';
  doc.addImage(bniLogo, 'JPEG', 100, 45, 18, 6);
  
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('555 - 8800 - 585', 120, 49);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.text('a.n. Lingkar Insan Kebaikan', 155, 49);

  // BSI Account 1 with logo
  const bsiLogo = '/bsi-logo.jpeg';
  doc.addImage(bsiLogo, 'JPEG', 100, 53, 18, 6);
  
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('730 - 8910 - 045', 120, 57);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.text('a.n. Wakaf Produktif Kebaikan', 155, 57);

  // BSI Account 2 with logo
  doc.addImage(bsiLogo, 'JPEG', 100, 61, 18, 6);
  
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('730 - 8910 - 339', 120, 65);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.text('a.n. Solidaritas Al Aqsha', 155, 65);

  // WhatsApp confirmation - aligned with header
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text('Konfirmasi ke nomer WhatsApp', 100, 68);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('0821 - 3636 - 3648', 100, 73);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.text('(Hotline LIKE Foundation)', 133, 73);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('083-800-100-888', 100, 78);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.text('(Hotline LIKE Foundation)', 133, 78);

  // Form data section (left side)
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Alhamdulillah, telah terima donasi dari', 10, 55);

  // Form fields
  let yPos = 63;
  const labelX = 10;
  const colonX = 45;
  const valueX = 50;

  doc.setFont('helvetica', 'bold');
  doc.text('Nama', labelX, yPos);
  doc.text(':', colonX, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(formData.nama || '', valueX, yPos);

  yPos += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('No. WhatsApp', labelX, yPos);
  doc.text(':', colonX, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(formData.noWa || '', valueX, yPos);

  yPos += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Alamat', labelX, yPos);
  doc.text(':', colonX, yPos);
  doc.setFont('helvetica', 'normal');
  const alamatLines = doc.splitTextToSize(formData.alamat || '', 80);
  doc.text(alamatLines, valueX, yPos);
  yPos += (alamatLines.length - 1) * 5;

  yPos += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Nominal', labelX, yPos);
  doc.text(':', colonX, yPos);
  doc.text('Rp.', valueX, yPos);
  doc.setFont('helvetica', 'normal');
  const nominal = parseInt(formData.nominal || 0).toLocaleString('id-ID');
  doc.text(nominal, valueX + 10, yPos);

  yPos += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Terbilang', labelX, yPos);
  doc.text(':', colonX, yPos);
  doc.setFont('helvetica', 'normal');
  const terbilangLines = doc.splitTextToSize(formData.terbilang || '', 80);
  doc.text(terbilangLines, valueX, yPos);
  yPos += (terbilangLines.length - 1) * 5;

  yPos += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Keterangan', labelX, yPos);
  doc.text(':', colonX, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(`${formData.pembayaran || ''}`, valueX, yPos);

  // Add noted if KESANGGUPAN is selected
  if (formData.pembayaran === 'KESANGGUPAN' && formData.noted) {
    yPos += 7;
    doc.setFont('helvetica', 'bold');
    doc.text('Catatan', labelX, yPos);
    doc.text(':', colonX, yPos);
    doc.setFont('helvetica', 'normal');
    const notedLines = doc.splitTextToSize(formData.noted || '', 80);
    doc.text(notedLines, valueX, yPos);
    yPos += (notedLines.length - 1) * 5;
  }

  yPos += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Untuk Program', labelX, yPos);
  doc.text(':', colonX, yPos);
  doc.setFont('helvetica', 'normal');
  const programName = formData.program === 'Lainnya' && formData.programCustom 
    ? formData.programCustom 
    : formData.program;
  doc.text(programName || '', valueX, yPos);

  // Bottom section with date and signatures
  const bottomY = 120;
  
  // Date
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('Tanggal', 115, bottomY);
  doc.text(':', 135, bottomY);
  doc.setFont('helvetica', 'normal');
  doc.text(formData.tanggal || '', 140, bottomY);

  // Signature boxes
  const boxY = bottomY + 5;
  const boxWidth = 42;
  const box1X = 115;
  const box2X = 160;
  
  doc.setFillColor(41, 98, 139);
  doc.rect(box1X, boxY, boxWidth, 6, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('Nama Petugas', box1X + 8, boxY + 4);

  doc.setFillColor(41, 98, 139);
  doc.rect(box2X, boxY, boxWidth, 6, 'F');
  doc.text('Donatur', box2X + 13, boxY + 4);

  // Empty boxes for signatures
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.2);
  doc.rect(box1X, boxY + 6, boxWidth, 15);
  doc.rect(box2X, boxY + 6, boxWidth, 15);

  // Generate filename
  const fileName = `Bukti-Donasi-${formData.nama.replace(/\s+/g, '-')}-${formData.tanggal}.pdf`;

  // Detect mobile device
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  // Save the PDF with mobile-friendly approach
  if (isMobile) {
    const pdfBlob = doc.output('blob');
    
    // Try Web Share API first (modern mobile browsers)
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [new File([pdfBlob], fileName, { type: 'application/pdf' })] })) {
      const file = new File([pdfBlob], fileName, { type: 'application/pdf' });
      navigator.share({
        files: [file],
        title: 'Bukti Donasi',
        text: 'Download Bukti Donasi PDF'
      }).catch((error) => {
        console.log('Share cancelled or failed:', error);
        // Fallback to blob download
        fallbackBlobDownload(pdfBlob, fileName, isIOS);
      });
    } else {
      // Fallback for browsers without Web Share API
      fallbackBlobDownload(pdfBlob, fileName, isIOS);
    }
  } else {
    // Desktop: Original behavior
    doc.save(fileName);
  }
};

// Helper function for fallback download
function fallbackBlobDownload(blob, fileName, isIOS) {
  const pdfUrl = URL.createObjectURL(blob);
  
  if (isIOS) {
    // iOS Safari: Open in new tab with instruction
    window.open(pdfUrl, '_blank');
    setTimeout(() => {
      alert('PDF terbuka di tab baru.\n\nUntuk menyimpan:\n1. Tekan tombol "Share" (kotak dengan panah ↑)\n2. Pilih "Simpan ke Files" atau "Save to Files"');
    }, 500);
  } else {
    // Android: Try direct download
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL after a delay
    setTimeout(() => URL.revokeObjectURL(pdfUrl), 1000);
  }
}
