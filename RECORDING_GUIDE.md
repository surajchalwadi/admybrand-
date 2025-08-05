# 🎬 ADmyBRAND AI Suite - Demo Recording Guide

## Overview
This guide explains how to use the automated demo recording script for the ADmyBRAND AI Suite landing page.

## 📁 Files Created
- `record-demo.js` - Automated recording script
- Screenshots of each section (created automatically)
- Optional video recording (requires FFmpeg)

## 🚀 Quick Start

### 1. Screenshots Only (No FFmpeg Required)
```bash
node record-demo.js
```

This will:
- Start the development server
- Launch a browser
- Take screenshots of all sections
- Save them as PNG files

### 2. Full Video Recording (Requires FFmpeg)

#### Install FFmpeg on Windows:
**Option 1: Chocolatey**
```bash
choco install ffmpeg
```

**Option 2: winget**
```bash
winget install ffmpeg
```

**Option 3: Manual Download**
1. Visit https://ffmpeg.org/download.html
2. Download Windows builds
3. Extract and add to PATH

#### Run with Video Recording:
```bash
node record-demo.js
```

This will create:
- Screenshots of all sections
- `landing-demo.mp4` video file

## 📸 Generated Screenshots
- `hero-section.png` - Hero section with gradient background
- `features-section.png` - 6 feature cards with animations
- `pricing-section.png` - 3-tier pricing cards
- `testimonials-section.png` - Customer testimonials carousel
- `faq-section.png` - Accordion-style FAQ section
- `video-modal.png` - Video demo modal (if working)

## 🎥 Video Recording Features
- 1080p resolution (1920x1080)
- 30 FPS recording
- Smooth scrolling through all sections
- Video modal interaction (5 seconds)
- H.264 encoding for compatibility

## 🔧 Troubleshooting

### Port Already in Use
The script automatically detects if port 3000 is busy and uses the next available port.

### FFmpeg Not Found
If you see "FFmpeg not found", the script will still work for screenshots. Install FFmpeg for video recording.

### Browser Issues
The script uses Puppeteer with Chrome. Make sure Chrome is installed on your system.

### Video Modal Issues
If the video modal doesn't work, check that the "Watch Demo" button exists in the Hero section.

## 📋 Requirements
- Node.js 16+
- Chrome browser
- FFmpeg (optional, for video recording)
- 4GB+ RAM for smooth recording

## 🎯 What the Script Does
1. **Starts Development Server** - Launches Next.js on available port
2. **Launches Browser** - Opens Chrome in non-headless mode
3. **Navigates to Landing Page** - Goes to localhost:3000 (or next available port)
4. **Takes Screenshots** - Captures each section
5. **Tests Video Modal** - Opens and closes the demo video
6. **Records Video** - If FFmpeg is available, records the entire session
7. **Cleans Up** - Closes browser and stops server

## 📊 Performance Tips
- Close other applications during recording
- Ensure stable internet connection
- Use SSD for faster file I/O
- Close unnecessary browser tabs

## 🎨 Customization
Edit `record-demo.js` to:
- Change viewport size
- Modify recording duration
- Add custom interactions
- Adjust timing delays
- Change output file names

## 📞 Support
If you encounter issues:
1. Check that all dependencies are installed
2. Ensure Chrome is up to date
3. Verify FFmpeg installation (for video recording)
4. Check console output for error messages 