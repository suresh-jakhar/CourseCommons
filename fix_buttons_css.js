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

    // Replace the long messy tailwind utility classes with the clean, custom CSS classes.
    content = content.replace(
      /className=["']w-full rounded-lg bg-accent-blue[^"']+["']/g,
      'className="w-full cinematic-btn cinematic-btn-primary py-2.5 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"'
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
  }
}

console.log('Fixed primary buttons to use cinematic-btn-primary.');
