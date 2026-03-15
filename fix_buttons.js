const fs = require('fs');
const path = require('path');

const files = [
  'Signin.jsx',
  'Signup.jsx',
  'LearnerSignup.jsx',
  'InstructorSignup.jsx',
  'InstructorSignin.jsx'
];

for (const file of files) {
  const filePath = path.join(__dirname, 'client', 'src', 'pages', file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Strip out the corrupted button classes and replace with a solid accent blue button + glow on hover
    // The broken injected part: bg-accent-blue/10 border border-accent-blue/30 text-accent-blue shadow-[0_0_15px_rgba(77,163,255,0.1)]
    // We want the button to have exactly these classes:
    // w-full rounded-lg bg-accent-blue/90 px-4 py-2.5 text-sm font-semibold text-black hover:bg-accent-blue hover:shadow-[0_0_20px_rgba(77,163,255,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed

    // Fix the Signin/Signup button regex:
    // This regex looks for `<button type="submit"` block and replaces its className entirely
    content = content.replace(
      /className=["']w-full rounded-lg [^"']+["']/g,
      'className="w-full rounded-lg bg-accent-blue/90 px-4 py-2.5 text-sm font-semibold text-black hover:bg-accent-blue hover:shadow-[0_0_20px_rgba(77,163,255,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"'
    );
    
    // Some buttons might not have type="submit" but are w-full rounded-lg buttons inside the auth forms, e.g. Continue buttons
    
    fs.writeFileSync(filePath, content, 'utf8');
  }
}

console.log('Fixed primary buttons with solid accent blue and hover glow.');
