import { jsPDF } from 'jspdf';

// Helper to load image as base64 using canvas
const convertImageToBase64 = (url: string): Promise<string | null> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      } else {
        resolve(null);
      }
    };
    img.onerror = () => {
      resolve(null);
    };
    img.src = url;
  });
};

export async function downloadResume() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;

  // --- 1. LEFT SIDEBAR BACKGROUND ---
  doc.setFillColor(46, 64, 87); // Primary dark slate gray-blue: #2e4057
  doc.rect(0, 0, 72, pageHeight, 'F');

  // --- 2. SIDEBAR PROFILE PIC / MONOGRAM ---
  // Try to load the user's avatar from the app
  const avatarUrl = '/src/assets/images/profile_kamran_1781114363890.png';
  let base64Avatar: string | null = null;
  try {
    base64Avatar = await convertImageToBase64(avatarUrl);
  } catch (e) {
    console.warn('Could not load avatar image directly, falling back to vector rendering in PDF.', e);
  }

  const picY = 12;
  const picX = 11;
  const picW = 50;
  const picH = 50;

  if (base64Avatar) {
    // White outer border for profile image
    doc.setFillColor(255, 255, 255);
    doc.rect(picX - 1, picY - 1, picW + 2, picH + 2, 'F');
    // Draw image
    doc.addImage(base64Avatar, 'PNG', picX, picY, picW, picH);
  } else {
    // Beautiful monogram fallback if external file not resolved
    doc.setFillColor(255, 255, 255);
    doc.rect(picX, picY, picW, picH, 'F');
    
    // Core colored container inside white card
    doc.setFillColor(60, 80, 105);
    doc.rect(picX + 2, picY + 2, picW - 4, picH - 4, 'F');
    
    // Initials "KA"
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(28);
    doc.text('KA', picX + picW / 2, picY + picH / 2 + 3.5, { align: 'center' });
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('KAMRAN ARSHAD', picX + picW / 2, picY + picH - 6, { align: 'center' });
  }

  // --- 3. SIDEBAR: CONTACT INFO ---
  let currentY = 72;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text('CONTACT', 10, currentY);
  
  // White thin line under heading
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.4);
  doc.line(10, currentY + 1.5, 62, currentY + 1.5);

  currentY += 6;
  doc.setFontSize(8);
  
  // Contact details drawing helper
  const drawContactItem = (label: string, value: string, iconPlaceholder: string) => {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(190, 205, 220); // soft blue contrast
    doc.text(label, 10, currentY);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(255, 255, 255);
    
    // Support multiline content like addresses
    const lines = doc.splitTextToSize(value, 52);
    doc.text(lines, 10, currentY + 3.5);
    currentY += 4.5 + (lines.length * 3.2);
  };

  drawContactItem('LOCATION', 'Latifabad Unit 8, Hyderabad,\nPakistan, 71000', '📍');
  drawContactItem('PHONE', '03282456532', '📞');
  drawContactItem('EMAIL', 'mrprogrammar17@gmail.com', '✉️');
  drawContactItem('WEBSITE', 'kamran-portfoliokamranarshad032.replit.app', '🌐');
  drawContactItem('LINKEDIN', 'linkedin.com/in/kamran-khan-764421312', '💼');

  // --- 4. SIDEBAR: SKILLS ---
  currentY += 1;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text('SKILLS', 10, currentY);
  
  // White thin line under heading
  doc.line(10, currentY + 1.5, 62, currentY + 1.5);
  currentY += 5;

  const drawSkillCategory = (title: string, items: string[]) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(190, 205, 220);
    doc.text(title.toUpperCase(), 10, currentY);
    currentY += 3.2;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(255, 255, 255);

    items.forEach((item) => {
      doc.text('• ' + item, 12, currentY);
      currentY += 3.0;
    });
    currentY += 2.0;
  };

  drawSkillCategory('Core Skills', ['HTML5 / CSS3', 'JavaScript (ES6+)', 'Tailwind CSS']);
  drawSkillCategory('Additional Skills', [
    'Responsive Web Design',
    'Basic Git & GitHub',
    'Basic API Handling',
    'Vanilla DOM Operations'
  ]);
  drawSkillCategory('Problem Solving', [
    'Quick Learner',
    'Team Work Collaboration',
    'Time Management'
  ]);

  // --- 5. MAIN CONTAINER (RIGHT COL) ---
  const rx = 80; // Right column offset
  let mainY = 16;

  // Name Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(30, 41, 59); // deep slate/charcoal gray #1e293b
  doc.text('Kamran Arshad', rx, mainY);

  // Subtitle
  mainY += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(71, 85, 105); // slate-600 #475569
  doc.text('Creative Web Developer Intern / Designer', rx, mainY);

  // Accent primary bar matching SMIT style
  mainY += 3.5;
  doc.setFillColor(46, 64, 87); // #2e4057 match sidebar
  doc.rect(rx, mainY, 120, 1.2, 'F');

  // Draw sections helper
  const drawMainSectionHeader = (title: string) => {
    mainY += 9;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(30, 41, 59);
    doc.text(title.toUpperCase(), rx, mainY);

    // Light gray horizontal guide
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.setLineWidth(0.3);
    doc.line(rx, mainY + 1.5, 200, mainY + 1.5);
    mainY += 5.5;
  };

  // --- SECTION: PROFESSIONAL SUMMARY ---
  drawMainSectionHeader('Professional Summary');
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85); // neutral-700
  
  const objText = 'I am a passionate beginner web developer with strong skills in HTML, CSS, and JavaScript, along with basic knowledge of Tailwind CSS. I am currently in the final month of my web development training and eager to apply my skills in a real-world internship environment while continuing to learn and grow.';
  const objLines = doc.splitTextToSize(objText, 120);
  doc.text(objLines, rx, mainY);
  mainY += (objLines.length * 3.5) + 1;

  // --- SECTION: WORK HISTORY ---
  drawMainSectionHeader('Work History');

  // Job Title Line
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(30, 41, 59);
  doc.text('Web Developer Intern', rx, mainY);
  
  // Date/Location
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(115, 115, 115); // gray-500
  doc.text('Ongoing  |  Saylani Mass IT Training (SMIT) (Hyderabad)', rx, mainY + 3.5);
  mainY += 7.5;

  // Job responsibilities
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);

  const bulletPoints = [
    'Spearheading front-end interface layouts coding, transforming custom UI designs into responsive, speed-optimized website templates.',
    'Building responsive user interfaces utilizing correct semantics, fluid CSS layouts, and modern standard utilities like Tailwind CSS.',
    'Learning best practices of layout optimization, cross-browser compatibility, and modular ES6 coding.',
    'Developing and testing small interactive features and DOM manipulations using standard modern components.'
  ];

  bulletPoints.forEach((bp) => {
    const wrappedBp = doc.splitTextToSize('• ' + bp, 116);
    doc.text(wrappedBp, rx + 2, mainY);
    mainY += (wrappedBp.length * 3.2);
  });
  mainY += 1;

  // --- SECTION: EDUCATION ---
  drawMainSectionHeader('Education');

  // Education Item 1
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(30, 41, 59);
  doc.text('Certificate of Higher Education: WEBSITE DEVELOPMENT', rx, mainY);

  // Institution & Date
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(115, 115, 115);
  doc.text('02/2024 - 04/2026  |  SMIT - Hyderabad, Sindh', rx, mainY + 3.8);
  mainY += 7.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);

  const eduText = 'Intense technical study program addressing advanced front-end development technologies. Covered in-depth web development mechanics, structural HTML elements styling rules, complex web design templates creation, fluid responsive viewports setups, and client-side web interactions.';
  const eduLines = doc.splitTextToSize(eduText, 120);
  doc.text(eduLines, rx, mainY);
  mainY += (eduLines.length * 3.4) + 2;

  // --- SECTION: PORTFOLIO SHOWCASE & PROJECTS ---
  drawMainSectionHeader('Key Portfolio Projects');

  const drawProjectDetails = (title: string, desc: string, tech: string, repo: string) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    doc.text(title, rx, mainY);
    mainY += 3.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);

    const descLines = doc.splitTextToSize(desc, 120);
    doc.text(descLines, rx, mainY);
    mainY += (descLines.length * 3.2);

    doc.setFont('helvetica', 'semibold');
    doc.setFontSize(7.5);
    doc.setTextColor(46, 64, 87);
    doc.text('Technologies: ' + tech, rx, mainY + 0.5);
    mainY += 3.0;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(115, 115, 115);
    doc.text('GitHub: ' + repo, rx, mainY + 0.5);
    mainY += 5.5;
  };

  drawProjectDetails(
    '1. Fully Responsive Portfolio Website',
    'Designed a modern, elegant, fully responsive web developer portfolio. Contains dynamic scroll triggers, subtle backdrop glassmorphic widgets, filterable interactive cards, and a custom functional message dispatch structure representation.',
    'HTML5, CSS, Tailwind CSS, Vanilla JavaScript (ES6+), motion',
    'github.com/mrprogrammar17-create'
  );

  drawProjectDetails(
    '2. Classic Interactive Utilities & Apps Collection',
    'Formulated multiple layouts including dental clinic hubs, French Michelin fine-dining cards, and pixel-aligned calculator expressions processors built to optimize viewport rendering speeds.',
    'HTML5, CSS3, DOM Manipulation APIs, responsive grids config',
    'github.com/mrprogrammar17-create'
  );

  // --- FOOTER NOTE / DECORATION ---
  mainY = pageHeight - 12;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  doc.text('Generatively compiled & updated. References available upon contract request.', rx, mainY);

  // Draw tiny bottom-right corner colored design accent
  doc.setFillColor(46, 64, 87);
  doc.rect(198, pageHeight - 6, 12, 6, 'F');

  // Save the PDF
  doc.save('Kamran_Arshad_Resume.pdf');
}
