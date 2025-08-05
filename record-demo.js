const puppeteer = require('puppeteer');
const { spawn } = require('child_process');

async function checkFFmpeg() {
  return new Promise((resolve) => {
    const ffmpeg = spawn('ffmpeg', ['-version'], { stdio: 'ignore' });
    ffmpeg.on('error', () => resolve(false));
    ffmpeg.on('close', (code) => resolve(code === 0));
  });
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function recordDemo() {
  let devServer;
  let browser;
  let page;
  let serverPort = 3000;

  try {
    console.log('🎬 ADmyBRAND AI Suite - Landing Page Demo Recorder');
    console.log('==================================================');
    
    // Check if FFmpeg is installed
    const hasFFmpeg = await checkFFmpeg();
    if (!hasFFmpeg) {
      console.log('❌ FFmpeg not found!');
      console.log('');
      console.log('📥 To install FFmpeg:');
      console.log('1. Download from: https://ffmpeg.org/download.html');
      console.log('2. Or use Chocolatey: choco install ffmpeg');
      console.log('3. Or use winget: winget install ffmpeg');
      console.log('');
      console.log('🔄 Running demo without video recording (screenshots only)...');
      console.log('');
    } else {
      console.log('✅ FFmpeg found - will record video');
    }

    console.log('🚀 Starting development server...');
    
    // Start the Next.js dev server
    devServer = spawn('npm', ['run', 'dev'], {
      stdio: 'pipe',
      shell: true
    });

    // Wait for server to start
    await new Promise((resolve, reject) => {
      let serverReady = false;
      
      devServer.stdout.on('data', (data) => {
        const output = data.toString();
        console.log('Server:', output.trim());
        
        if (output.includes('Ready in') || output.includes('Local:')) {
          if (!serverReady) {
            serverReady = true;
            console.log('✅ Development server is ready');
            
            // Extract port from output
            const portMatch = output.match(/Local:\s*http:\/\/localhost:(\d+)/);
            if (portMatch) {
              serverPort = parseInt(portMatch[1]);
              console.log(`📍 Server running on port ${serverPort}`);
            }
            
            setTimeout(resolve, 3000); // Wait 3 seconds for full startup
          }
        }
      });
      
      devServer.stderr.on('data', (data) => {
        console.log('Server Error:', data.toString());
      });
      
      // Timeout after 30 seconds
      setTimeout(() => {
        if (!serverReady) {
          reject(new Error('Server startup timeout'));
        }
      }, 30000);
    });

    console.log('🌐 Launching browser...');
    
    // Launch browser
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: { width: 1920, height: 1080 },
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    page = await browser.newPage();
    
    // Set viewport
    await page.setViewport({ width: 1920, height: 1080 });
    
    console.log(`📄 Navigating to landing page on port ${serverPort}...`);
    
    // Navigate to the page with retry logic
    let retries = 3;
    while (retries > 0) {
      try {
        await page.goto(`http://localhost:${serverPort}`, { 
          waitUntil: 'networkidle2',
          timeout: 30000 
        });
        break;
      } catch (error) {
        retries--;
        if (retries === 0) {
          throw error;
        }
        console.log(`Retrying navigation... (${retries} attempts left)`);
        await sleep(2000);
      }
    }
    
    // Wait for page to load
    await sleep(3000);
    
    console.log('📸 Taking screenshots of each section...');
    
    // Take screenshot of Hero section
    await page.screenshot({ path: 'hero-section.png', fullPage: false });
    console.log('✅ Hero section screenshot saved');
    
    // Scroll to Features section
    await page.evaluate(() => {
      const features = document.querySelector('#features');
      if (features) {
        features.scrollIntoView({ behavior: 'smooth' });
      }
    });
    await sleep(2000);
    await page.screenshot({ path: 'features-section.png', fullPage: false });
    console.log('✅ Features section screenshot saved');
    
    // Scroll to Pricing section
    await page.evaluate(() => {
      const pricing = document.querySelector('#pricing');
      if (pricing) {
        pricing.scrollIntoView({ behavior: 'smooth' });
      }
    });
    await sleep(2000);
    await page.screenshot({ path: 'pricing-section.png', fullPage: false });
    console.log('✅ Pricing section screenshot saved');
    
    // Scroll to Testimonials section
    await page.evaluate(() => {
      const testimonials = document.querySelector('#testimonials');
      if (testimonials) {
        testimonials.scrollIntoView({ behavior: 'smooth' });
      }
    });
    await sleep(2000);
    await page.screenshot({ path: 'testimonials-section.png', fullPage: false });
    console.log('✅ Testimonials section screenshot saved');
    
    // Scroll to FAQ section
    await page.evaluate(() => {
      const faq = document.querySelector('#faq');
      if (faq) {
        faq.scrollIntoView({ behavior: 'smooth' });
      }
    });
    await sleep(2000);
    await page.screenshot({ path: 'faq-section.png', fullPage: false });
    console.log('✅ FAQ section screenshot saved');
    
    // Test video modal
    console.log('🎥 Testing video modal...');
    try {
      await page.click('button:has-text("Watch Demo")');
      await sleep(2000);
      await page.screenshot({ path: 'video-modal.png', fullPage: false });
      console.log('✅ Video modal screenshot saved');
      
      // Close modal
      await page.click('button[aria-label="Close"]');
      await sleep(1000);
    } catch (error) {
      console.log('⚠️ Could not test video modal:', error.message);
    }
    
    if (hasFFmpeg) {
      console.log('🎬 Starting video recording...');
      
      // Start FFmpeg recording
      const ffmpeg = spawn('ffmpeg', [
        '-f', 'gdigrab',
        '-framerate', '30',
        '-i', 'desktop',
        '-c:v', 'libx264',
        '-preset', 'ultrafast',
        '-crf', '23',
        '-y',
        'landing-demo.mp4'
      ], {
        stdio: 'pipe'
      });
      
      // Wait for FFmpeg to start
      await sleep(2000);
      
      console.log('📱 Scrolling through sections...');
      
      // Scroll through sections with delays
      await page.evaluate(() => {
        const hero = document.querySelector('#hero');
        if (hero) hero.scrollIntoView({ behavior: 'smooth' });
      });
      await sleep(2000);
      
      await page.evaluate(() => {
        const features = document.querySelector('#features');
        if (features) features.scrollIntoView({ behavior: 'smooth' });
      });
      await sleep(2000);
      
      await page.evaluate(() => {
        const pricing = document.querySelector('#pricing');
        if (pricing) pricing.scrollIntoView({ behavior: 'smooth' });
      });
      await sleep(2000);
      
      await page.evaluate(() => {
        const testimonials = document.querySelector('#testimonials');
        if (testimonials) testimonials.scrollIntoView({ behavior: 'smooth' });
      });
      await sleep(2000);
      
      await page.evaluate(() => {
        const faq = document.querySelector('#faq');
        if (faq) faq.scrollIntoView({ behavior: 'smooth' });
      });
      await sleep(2000);
      
      // Test video modal
      try {
        await page.click('button:has-text("Watch Demo")');
        await sleep(5000); // Show modal for 5 seconds
        await page.click('button[aria-label="Close"]');
        await sleep(1000);
      } catch (error) {
        console.log('⚠️ Could not test video modal during recording');
      }
      
      // Stop recording
      ffmpeg.kill('SIGINT');
      
      console.log('✅ Video recording completed: landing-demo.mp4');
    }
    
    console.log('');
    console.log('🎉 Demo recording completed!');
    console.log('📁 Screenshots saved:');
    console.log('   - hero-section.png');
    console.log('   - features-section.png');
    console.log('   - pricing-section.png');
    console.log('   - testimonials-section.png');
    console.log('   - faq-section.png');
    console.log('   - video-modal.png');
    
    if (hasFFmpeg) {
      console.log('🎬 Video saved: landing-demo.mp4');
    }
    
  } catch (error) {
    console.error('❌ Error during recording:', error.message);
  } finally {
    // Cleanup
    if (browser) {
      await browser.close();
    }
    if (devServer) {
      devServer.kill();
    }
  }
}

recordDemo(); 