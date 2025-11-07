# Google Sheets Integration Fix

## Problem
Only the timestamp is being saved to Google Sheets, but not the other form data (Nama, Alamat, etc).

## Solution
The Google Apps Script needs to be updated to properly parse and save all form data.

---

## Instructions for Client

### Step 1: Open Google Apps Script Editor
1. Open your Google Sheet
2. Click **Extensions** → **Apps Script**

### Step 2: Replace the Script Code
Delete all existing code and paste this:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the JSON data from the request
    var data = JSON.parse(e.postData.contents);
    
    // Prepare the row data in correct column order
    var rowData = [
      data.tanggal || '',           // Column A: Tanggal
      data.nama || '',              // Column B: Nama
      data.noWa || '',              // Column C: No. Whatsapp
      data.alamat || '',            // Column D: Alamat
      data.nominal || '',           // Column E: Nominal (RP)
      data.terbilang || '',         // Column F: Terbilang
      data.keterangan || '',        // Column G: Ket. Pembayaran
      data.catatan || '',           // Column H: Catatan Pembayaran
      data.program || '',           // Column I: Program
      '',                           // Column J: Catatan Program (empty for now, will be filled if program is "Lainnya")
      data.timestamp || ''          // Column K: Date Entry
    ];
    
    // If program is custom (Lainnya), add the custom program name
    if (data.program === 'Lainnya' || data.program === '') {
      rowData[9] = data.programCustom || data.program || '';
    }
    
    // Append the row to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'row': sheet.getLastRow()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    // Log error for debugging
    Logger.log('Error: ' + error.toString());
    
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'error': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Step 3: Save and Deploy
1. Click **Save** (disk icon) or press `Ctrl+S`
2. Click **Deploy** → **Manage deployments**
3. Click **Edit** (pencil icon) on the existing deployment
4. Click **Deploy**
5. Close the deployment window

### Step 4: Test
1. Go back to your donation form website
2. Fill in all fields
3. Click "Kirim WhatsApp"
4. Check Google Sheets - all data should now appear!

---

## Spreadsheet Column Structure

Make sure your Google Sheet has these column headers in Row 1:

| A | B | C | D | E | F | G | H | I | J | K |
|---|---|---|---|---|---|---|---|---|---|---|
| Tanggal | Nama | No. Whatsapp | Alamat | Nominal (RP) | Terbilang | Ket. Pembayaran | Catatan Pembayaran | Program | Catatan Program | Date Entry |

---

## What This Script Does

1. **Receives POST request** from your donation form website
2. **Parses JSON data** sent from the form
3. **Maps each field** to the correct column (A through K)
4. **Handles optional fields** (Catatan appears only if KESANGGUPAN is selected)
5. **Appends a new row** to your Google Sheet
6. **Returns success/error** message (though we can't read it due to CORS)

---

## Troubleshooting

**If data still doesn't save:**

1. Check that the script URL in `.env` file matches your deployment URL
2. Make sure the Google Apps Script is deployed with:
   - **Execute as:** Me (your Google account)
   - **Who has access:** Anyone
3. Try re-deploying the script (Step 3 above)
4. Check Apps Script execution logs:
   - In Apps Script Editor → Click **Executions** (clock icon on left sidebar)
   - Look for errors

**If you see errors in the execution log:**
- Take a screenshot
- Share with your developer for debugging

---

## Need Help?

Contact your developer and provide:
1. Screenshot of the Google Apps Script code
2. Screenshot of the Executions log (if there are errors)
3. Screenshot of what appears in the Google Sheet
