// ========================================
// GOOGLE APPS SCRIPT - DONATION FORM WITH APPROVAL SYSTEM
// ========================================
// Copy semua code ini ke Google Apps Script Editor
// Extensions → Apps Script → Paste code ini

// ========================================
// 1. HANDLE POST REQUEST FROM DONATION FORM
// ========================================
function doPost(e) {
  try {
    // Validate request
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(JSON.stringify({
        'result': 'error',
        'message': 'No POST data received. Make sure to send data via POST request.'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the JSON data from the request
    var data = JSON.parse(e.postData.contents);
    
    // Prepare the row data in correct column order
    var rowData = [
      data.tanggal || '',           // Column A: Tanggal Donasi
      data.nama || '',              // Column B: Nama Donatur
      data.noWa || '',              // Column C: No. WhatsApp
      data.alamat || '',            // Column D: Alamat
      data.program || '',           // Column E: Program
      data.programCustom || '',     // Column F: Catatan Program
      data.nominal || '',           // Column G: Nominal Donasi (Rp)
      data.terbilang || '',         // Column H: Donasi Terbilang
      data.pembayaran || '',        // Column I: Keterangan Pembayaran
      data.noted || '',             // Column J: Catatan Pembayaran
      'Pending',                    // Column K: Sts Approval (default: Pending)
      new Date()                    // Column L: Date Entry (timestamp)
    ];
    
    // Append the row to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'row': sheet.getLastRow(),
      'message': 'Data berhasil disimpan dengan status Pending'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    // Log error for debugging
    Logger.log('Error in doPost: ' + error.toString());
    
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'error': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ========================================
// 2. HANDLE GET REQUEST FOR ADMIN DASHBOARD
// ========================================
function doGet(e) {
  try {
    var action = e.parameter.action;
    
    if (!action) {
      return ContentService.createTextOutput(JSON.stringify({
        'result': 'error',
        'message': 'Parameter action tidak ditemukan'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Route berdasarkan action
    switch(action) {
      case 'list':
        return getDonationList(e.parameter.status);
      case 'approve':
        return updateApprovalStatus(e.parameter.row, 'Approved');
      case 'reject':
        return updateApprovalStatus(e.parameter.row, 'Rejected');
      default:
        return ContentService.createTextOutput(JSON.stringify({
          'result': 'error',
          'message': 'Action tidak valid: ' + action
        })).setMimeType(ContentService.MimeType.JSON);
    }
    
  } catch(error) {
    Logger.log('Error in doGet: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'error': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ========================================
// 3. GET DONATION LIST
// ========================================
function getDonationList(statusFilter) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  // Skip header row (row 1)
  var donations = [];
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    
    // Filter by status if provided
    var status = row[10]; // Column K: Sts Approval
    if (statusFilter && status.toLowerCase() !== statusFilter.toLowerCase()) {
      continue;
    }
    
    donations.push({
      rowNumber: i + 1,
      tanggal: row[0],
      nama: row[1],
      noWa: row[2],
      alamat: row[3],
      program: row[4],
      programCustom: row[5],
      nominal: row[6],
      terbilang: row[7],
      pembayaran: row[8],
      noted: row[9],
      approval: row[10],
      dateEntry: row[11]
    });
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    'result': 'success',
    'count': donations.length,
    'data': donations
  })).setMimeType(ContentService.MimeType.JSON);
}

// ========================================
// 4. UPDATE APPROVAL STATUS
// ========================================
function updateApprovalStatus(rowNumber, newStatus) {
  if (!rowNumber) {
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'message': 'Parameter row tidak ditemukan'
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var row = parseInt(rowNumber);
  
  // Validasi row number
  if (row < 2 || row > sheet.getLastRow()) {
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'message': 'Row number tidak valid: ' + row
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  // Update Column K (Sts Approval)
  sheet.getRange(row, 11).setValue(newStatus);
  
  // Get donation data for response
  var rowData = sheet.getRange(row, 1, 1, 12).getValues()[0];
  
  return ContentService.createTextOutput(JSON.stringify({
    'result': 'success',
    'message': 'Status berhasil diubah menjadi ' + newStatus,
    'data': {
      rowNumber: row,
      nama: rowData[1],
      nominal: rowData[6],
      approval: newStatus
    }
  })).setMimeType(ContentService.MimeType.JSON);
}

// ========================================
// 5. HELPER: Get Pending Count (untuk dashboard)
// ========================================
function getPendingCount() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  var count = 0;
  for (var i = 1; i < data.length; i++) {
    if (data[i][10] === 'Pending') {
      count++;
    }
  }
  
  return count;
}

// ========================================
// 6. TEST FUNCTION - Untuk Test Script
// ========================================
function testDoPost() {
  // Simulasi data dari form
  var testData = {
    tanggal: '8 November 2025',
    nama: 'Test User',
    noWa: '081234567890',
    alamat: 'Jakarta Selatan',
    program: 'Inspiring Quran (6jt)',
    programCustom: '',
    nominal: '6000000',
    terbilang: 'enam juta rupiah',
    pembayaran: 'TRANSFER',
    noted: ''
  };
  
  // Simulasi POST request
  var mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  // Call doPost
  var result = doPost(mockEvent);
  Logger.log(result.getContent());
  
  return 'Test completed. Check Execution log for result.';
}

// ========================================
// 7. OPTIONAL: Send WhatsApp Notification
// ========================================
// Uncomment jika ingin kirim notif WhatsApp setelah approval
/*
function sendApprovalNotification(phoneNumber, donationData, status) {
  // Implementasi kirim WhatsApp via API (e.g., Fonnte, Wablas, dll)
  // Contoh:
  var message = 'Yth. ' + donationData.nama + ',\n\n';
  
  if (status === 'Approved') {
    message += 'Donasi Anda sebesar Rp ' + donationData.nominal + ' telah disetujui.\n';
    message += 'Terima kasih atas kontribusi Anda!\n\n';
  } else {
    message += 'Maaf, donasi Anda sebesar Rp ' + donationData.nominal + ' ditolak.\n';
    message += 'Silakan hubungi admin untuk informasi lebih lanjut.\n\n';
  }
  
  message += 'LIKE Foundation';
  
  // TODO: Implement WhatsApp API call here
  // UrlFetchApp.fetch(whatsapp_api_url, options);
}
*/
