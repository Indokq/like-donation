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
  
  // BNI Account
  doc.setFont('helvetica', 'bold');
  doc.setFillColor(255, 102, 0);
  doc.rect(100, 46, 12, 4, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7);
  doc.text('BNI', 102.5, 49);
  
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('555 - 8800 - 585', 115, 49);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.text('a.n. Lingkar Insan Keb...', 150, 49);

  // BSI Account 1
  doc.setFillColor(0, 102, 204);
  doc.rect(100, 52, 12, 4, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7);
  doc.text('BSI', 102.5, 55);
  
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('730 - 8910 - 045', 115, 55);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.text('a.n. Wakaf Produktif K...', 150, 55);

  // BSI Account 2
  doc.setFillColor(0, 102, 204);
  doc.rect(100, 58, 12, 4, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7);
  doc.text('BSI', 102.5, 61);
  
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('730 - 8910 - 339', 115, 61);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  doc.text('a.n. Solidaritas Al Aqsha', 150, 61);

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

  // Save the PDF
  doc.save(fileName);
};
