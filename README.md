# 🎉 Birthday Countdown Website

A beautiful, animated birthday countdown website built with React, TypeScript, and Vite. Features automatic image downloading from Google Drive at midnight on the birthday, real-time countdown in IST timezone, and fully responsive design for all devices.

## ✨ Features

- **Countdown Timer**: Real-time countdown to January 7th in IST timezone
- **Birthday Display**: Special birthday greeting with rotating photo gallery on the actual day
- **Automatic Image Sync**: Downloads images from Google Drive at exactly 00:00:00 IST on birthday
- **Smart Caching**: Images are cached locally for fast loading
- **Post-Birthday Mode**: Automatically shows countdown to next year's birthday
- **Premium Design**: Glassmorphism effects, animated starry background, smooth transitions
- **Fully Responsive**: Optimized for phones, tablets, laptops, and ultra-wide monitors

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Google Drive API key (optional, for automatic image fetching)

### Installation

1. Navigate to the project directory:
```bash
cd C:\Users\shris\.gemini\antigravity\scratch\birthday-countdown
```

2. Install dependencies:
```bash
npm install
```

3. **Configure Google Drive Images** (choose one method):

#### Method 1: Automatic Fetching (Recommended)
1. Get a Google Drive API key:
   - Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   - Create a new project or select existing
   - Enable "Google Drive API"
   - Create credentials (API Key)
   - Copy the API key

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Add your API key to `.env`:
```
VITE_GOOGLE_API_KEY=your_actual_api_key_here
```

4. Make sure your Google Drive folder is publicly accessible:
   - Open https://drive.google.com/drive/folders/1tz2roZaVb2EYAGEYqDvIWN2RAman5YQI
   - Click "Share" → "Anyone with the link can view"

#### Method 2: Manual Image IDs (Fallback)
If you don't want to use the API, you can manually add image IDs:

1. Open `src/utils/imageDownloader.ts`
2. Find the `getFallbackImages()` function
3. Add your Google Drive image IDs:
```typescript
function getFallbackImages(): string[] {
  return [
    'https://drive.google.com/uc?export=view&id=FILE_ID_1',
    'https://drive.google.com/uc?export=view&id=FILE_ID_2',
    // Add more...
  ];
}
```

To get file IDs:
- Right-click each image in Google Drive → "Get link"
- Set to "Anyone with the link can view"
- Extract the ID from the URL: `https://drive.google.com/file/d/FILE_ID/view`

4. Start the development server:
```bash
npm run dev
```

5. Open your browser to `http://localhost:5173`

## 📸 How Image Downloading Works

### Automatic Midnight Refresh
- At exactly **00:00:00 IST on January 7th**, the website automatically:
  1. Clears all cached images from localStorage
  2. Fetches fresh image URLs from Google Drive
  3. Downloads and caches all images locally
  4. Displays them in the rotating gallery

### Caching Strategy
- Images are cached in browser localStorage
- Cache persists until midnight on the birthday
- Reduces API calls and improves performance
- Fallback to placeholder if download fails

### Manual Testing
To test the midnight refresh without waiting:
1. Open browser DevTools (F12)
2. Go to Application → Local Storage
3. Delete `cachedBirthdayImages` and `lastImageRefresh`
4. Refresh the page

## 📱 Responsive Design

The website is fully responsive with breakpoints for:

- **📱 Phones** (< 576px): 2-column timer grid, compact layout
- **📱 Landscape Phones** (576px - 767px): Optimized for horizontal viewing
- **📱 Tablets** (768px - 991px): 4-column timer grid, larger text
- **💻 Laptops** (992px - 1199px): Full desktop experience
- **🖥️ Large Desktops** (1200px - 1599px): Enhanced spacing and sizing
- **🖥️ Ultra-Wide Monitors** (1600px+): Maximum visual impact
- **🔄 Landscape Mode**: Special adjustments for short screens

## 🎨 Customization

### Change Birthday Date
Edit `src/App.tsx`:
```typescript
const BIRTHDAY_MONTH = 0; // January (0-indexed: 0=Jan, 11=Dec)
const BIRTHDAY_DAY = 7;
const BIRTH_YEAR = 2003;
```

Also update in `src/components/BirthdayGallery.tsx`:
```typescript
const BIRTHDAY_MONTH = 0;
const BIRTHDAY_DAY = 7;
```

### Change Name
Edit the name in:
- `src/components/Countdown.tsx` (line 63)
- `src/components/BirthdayGallery.tsx` (line 122)

### Adjust Photo Rotation Speed
Edit `src/components/BirthdayGallery.tsx`:
```typescript
}, 3000); // Change 3000 to desired milliseconds
```

### Change Google Drive Folder
Edit `src/utils/imageDownloader.ts`:
```typescript
const GOOGLE_DRIVE_FOLDER_ID = 'your_new_folder_id';
```

## 🏗️ Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder, ready to deploy.

## 🌐 Deployment

### Deploy to Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Add environment variable in Vercel dashboard:
   - Key: `VITE_GOOGLE_API_KEY`
   - Value: Your Google API key

### Deploy to Netlify
1. Build the project: `npm run build`
2. Drag and drop the `dist` folder to Netlify
3. Add environment variable in Netlify settings

### Deploy to GitHub Pages
1. Install gh-pages: `npm install -D gh-pages`
2. Add to `package.json`:
```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```
3. Run: `npm run deploy`

## 📱 How It Works

The website has three states:

1. **Before Birthday (Countdown Mode)**:
   - Shows countdown timer with days, hours, minutes, seconds
   - Displays "Counting down to the 23rd birthday!"

2. **On Birthday (January 7)**:
   - At 00:00:00 IST: Clears cache and downloads fresh images
   - Displays "Happy 23rd Birthday!" message
   - Shows rotating photo gallery with manual controls
   - Auto-rotates every 3 seconds

3. **After Birthday (Post-Birthday Mode)**:
   - Shows countdown to next year's birthday
   - Displays "Counting down to the 24th birthday!"
   - Age automatically increments each year

All times are calculated in **IST (Indian Standard Time, UTC+5:30)**.

## 🎯 Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS3** - Glassmorphism, animations, responsive design
- **Google Fonts** - Outfit font family
- **Google Drive API** - Automatic image fetching
- **LocalStorage** - Image caching

## 🔧 Project Structure

```
birthday-countdown/
├── src/
│   ├── components/
│   │   ├── Countdown.tsx          # Countdown timer component
│   │   ├── Countdown.css          # Countdown responsive styles
│   │   ├── BirthdayGallery.tsx    # Photo gallery with auto-download
│   │   └── BirthdayGallery.css    # Gallery responsive styles
│   ├── utils/
│   │   └── imageDownloader.ts     # Google Drive image fetching logic
│   ├── App.tsx                     # Main app with state management
│   ├── App.css                     # Global styles & animations
│   └── main.tsx                    # React entry point
├── .env.example                    # Environment variables template
├── index.html                      # HTML template
├── package.json                    # Dependencies
└── README.md                       # This file
```

## 🐛 Troubleshooting

### Images not loading?
1. Check if Google Drive folder is publicly accessible
2. Verify API key is correct in `.env`
3. Check browser console for errors
4. Try clearing localStorage and refreshing

### Countdown showing wrong time?
- The countdown uses IST timezone (UTC+5:30)
- Check your system time is correct
- The calculation is independent of your local timezone

### Website not responsive on mobile?
- Clear browser cache
- Try hard refresh (Ctrl+Shift+R)
- Check if viewport meta tag is present in `index.html`

## 📝 License

This project is created for personal use as a birthday celebration website.

---
