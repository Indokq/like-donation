# Donation Form - WhatsApp Integration

A simple React donation form that collects donor information and sends it to WhatsApp.

## Features

- ✅ Auto-fill current date
- ✅ Indonesian phone number validation
- ✅ Automatic number to words conversion (Indonesian)
- ✅ Form validation
- ✅ WhatsApp integration (wa.me link)
- ✅ QR code generation for easy sharing
- ✅ Responsive design
- ✅ No backend required

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure WhatsApp number:
- Copy `.env.example` to `.env`
- Update `VITE_ADMIN_WA_NUMBER` with your WhatsApp number (format: 628xxxxxxxxxx)

## Development

Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

## Configuration

Edit `.env` file to change settings:
- `VITE_ADMIN_WA_NUMBER`: WhatsApp number to receive donations (format: 628xxxxxxxxxx)

## Form Fields

1. **Tanggal Donasi** - Auto-filled with current date
2. **Nama Lengkap** - Donor's full name
3. **Nomor WhatsApp** - Donor's WhatsApp number
4. **Alamat** - Donor's address
5. **Nominal Donasi** - Amount in numbers
6. **Terbilang** - Auto-converted to Indonesian words
7. **Metode Pembayaran** - Payment method (dropdown)
8. **Program** - Donation category/program

## How It Works

1. User fills out the donation form
2. Form validates all inputs
3. On submit, it creates a formatted WhatsApp message
4. Opens WhatsApp with pre-filled message
5. User can send the message to confirm donation

## Technologies Used

- React + Vite
- TailwindCSS
- react-qrcode-logo
- WhatsApp API (wa.me)

## License

MIT
