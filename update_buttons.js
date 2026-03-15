const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'client', 'src');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(srcDir, function(filePath) {
  if (filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // We previously mapped bg-blue-500 to `bg-btn`. We should revert primary form submission buttons to use `accent-blue` but keep them highly tailored to the dark theme (e.g. slight opacity or glow).
    // The user requested: "cont [continue] should have some color ig ( from theme only )" -> Accent Blue: #4DA3FF
    
    // Auth page primary buttons currently have: className="... bg-btn ... hover:bg-btn-hover ..."
    // Let's replace those with a sleek blue accent for the primary CTE
    
    // For specific auth pages:
    if (filePath.includes('Signup.jsx') || filePath.includes('Signin.jsx')) {
        content = content.replace(/bg-btn/g, 'bg-accent-blue/10 border border-accent-blue/30 text-accent-blue shadow-[0_0_15px_rgba(77,163,255,0.1)]');
        content = content.replace(/hover:bg-btn-hover/g, 'hover:bg-accent-blue/20 hover:border-accent-blue/50 hover:text-white transition-all duration-300');
    }

    fs.writeFileSync(filePath, content, 'utf8');
  }
});

console.log('Primary buttons updated with accent blue glowing style.');
