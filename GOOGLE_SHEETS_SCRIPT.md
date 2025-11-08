# Google Sheets Integration with Approval System

## Overview
Script ini menangani:
1. **Penyimpanan data donasi** dari form website
2. **Approval system** untuk admin dashboard
3. **API endpoints** untuk manage donations

---

## Spreadsheet Column Structure

Pastikan Google Sheet Anda memiliki header berikut di **Row 1**:

| A | B | C | D | E | F | G | H | I | J | K | L |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Tanggal Donasi | Nama Donatur | No. WhatsApp | Alamat | Program | Catatan Program | Nominal Donasi (Rp) | Donasi Terbilang | Keterangan Pembayaran | Catatan Pembayaran | Sts Approval | Date Entry |

**Catatan:**
- **Kolom K (Sts Approval)**: Otomatis diisi "Pending" saat submit form
- **Kolom L (Date Entry)**: Otomatis diisi timestamp saat submit

---

## Instructions for Setup

### Step 1: Open Google Apps Script Editor
1. Open your Google Sheet
2. Click **Extensions** → **Apps Script**

### Step 2: Copy Script Code
1. Buka file **`GOOGLE_APPS_SCRIPT.js`** di project folder
2. Copy **SEMUA code** dari file tersebut
3. Paste ke Google Apps Script Editor (hapus code lama jika ada)

### Step 3: Save and Deploy
1. Click **Save** (disk icon) or press `Ctrl+S`
2. Click **Deploy** → **Manage deployments**
3. Click **Edit** (pencil icon) on the existing deployment
4. Click **Deploy**
5. Close the deployment window

### Step 4: Copy Deployment URL
1. Setelah deploy, akan muncul **Web app URL**
2. Copy URL tersebut
3. Paste ke file `.env` di project:
   ```
   VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/AKfycby.../exec
   ```

### Step 5: Test the Script
**Option A: Test dari Apps Script Editor (Recommended)**
1. Di Apps Script Editor, pilih function **`testDoPost`** dari dropdown (di toolbar atas)
2. Click tombol **Run** (▶️ play button)
3. Authorize script jika diminta
4. Check Google Sheet - harus muncul data test dengan status "Pending"
5. Check **Executions** log (icon jam di sidebar) - harus menunjukkan "success"

**Option B: Test dari Website**
1. Buka donation form website
2. Isi semua field
3. Click "Submit"
4. Check Google Sheets - data harus muncul dengan status "Pending"

---

## API Endpoints untuk Admin Dashboard

Script ini menyediakan API endpoints untuk admin dashboard:

### 1. **Get All Donations**
```
GET: https://script.google.com/.../exec?action=list
```

**Response:**
```json
{
  "result": "success",
  "count": 10,
  "data": [
    {
      "rowNumber": 2,
      "tanggal": "8 November 2025",
      "nama": "John Doe",
      "noWa": "081234567890",
      "alamat": "Jakarta",
      "program": "Inspiring Quran (6jt)",
      "programCustom": "",
      "nominal": "6000000",
      "terbilang": "enam juta rupiah",
      "pembayaran": "TRANSFER",
      "noted": "",
      "approval": "Pending",
      "dateEntry": "2025-11-08 15:30:00"
    }
  ]
}
```

### 2. **Get Donations by Status**
```
GET: https://script.google.com/.../exec?action=list&status=pending
GET: https://script.google.com/.../exec?action=list&status=approved
GET: https://script.google.com/.../exec?action=list&status=rejected
```

### 3. **Approve Donation**
```
GET: https://script.google.com/.../exec?action=approve&row=5
```

**Response:**
```json
{
  "result": "success",
  "message": "Status berhasil diubah menjadi Approved",
  "data": {
    "rowNumber": 5,
    "nama": "John Doe",
    "nominal": "6000000",
    "approval": "Approved"
  }
}
```

### 4. **Reject Donation**
```
GET: https://script.google.com/.../exec?action=reject&row=7
```

**Response:**
```json
{
  "result": "success",
  "message": "Status berhasil diubah menjadi Rejected",
  "data": {
    "rowNumber": 7,
    "nama": "Jane Smith",
    "nominal": "3000000",
    "approval": "Rejected"
  }
}
```

---

## What This Script Does

### From Donation Form (POST):
1. Receives POST request dari form website
2. Parse JSON data
3. Mapping data ke kolom A-L
4. Set "Sts Approval" = **"Pending"** (default)
5. Set "Date Entry" = timestamp otomatis
6. Append row baru ke Google Sheet

### From Admin Dashboard (GET):
1. **List donations** - dengan atau tanpa filter status
2. **Approve donation** - ubah status jadi "Approved"
3. **Reject donation** - ubah status jadi "Rejected"
4. Return JSON response untuk ditampilkan di dashboard

---

## Troubleshooting

### Error: "Cannot read properties of undefined (reading 'postData')"

**Penyebab:** Script dijalankan tanpa POST data (biasanya saat di-test dari Apps Script Editor tanpa data)

**Solusi:**
1. Gunakan function **`testDoPost()`** untuk testing
2. Atau test langsung dari website form

---

### Error: "Permission denied"

**Penyebab:** Script belum di-authorize atau deployment settings salah

**Solusi:**
1. Run function `testDoPost()` dari Apps Script Editor
2. Klik **Review Permissions** saat diminta
3. Pilih akun Google Anda
4. Klik **Advanced** → **Go to [Project Name] (unsafe)**
5. Klik **Allow**
6. Re-deploy script dengan settings:
   - **Execute as:** Me
   - **Who has access:** Anyone

---

### Data tidak muncul di Google Sheet

**Checklist:**
1. ✅ Script sudah di-deploy dengan benar?
2. ✅ URL deployment sudah di-copy ke `.env` file?
3. ✅ Google Sheet memiliki header di Row 1 (A-L)?
4. ✅ Test function `testDoPost()` berhasil?
5. ✅ Check Executions log - ada error?

**Jika masih bermasalah:**
- Buka **Executions** log di Apps Script Editor (icon jam ⏰)
- Screenshot error yang muncul
- Share dengan developer

---

### API tidak bisa diakses dari Admin Dashboard

**Penyebab:** CORS policy atau deployment settings

**Solusi:**
1. Pastikan deployment dengan **Who has access:** Anyone
2. Test API endpoint di browser:
   ```
   https://script.google.com/.../exec?action=list
   ```
3. Jika muncul download file JSON → berhasil!
4. Jika redirect ke login → check deployment settings

---

## Need Help?

Contact your developer and provide:
1. Screenshot of the Google Apps Script code
2. Screenshot of the Executions log (if there are errors)
3. Screenshot of what appears in the Google Sheet
