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
  if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Buttons (blue -> dark theme)
    content = content.replace(/bg-blue-[5-6]00/g, 'bg-btn text-primary');
    content = content.replace(/hover:bg-blue-[4-5]00/g, 'hover:bg-btn-hover');
    
    // Text colors (blue -> theme text)
    content = content.replace(/text-blue-[3-4]00/g, 'text-secondary');
    content = content.replace(/hover:text-blue-[3-4]00/g, 'hover:text-primary');
    
    // Focus, rings, and hover borders (blue)
    content = content.replace(/focus:border-blue-500/g, 'focus:border-muted');
    content = content.replace(/focus:ring-blue-500/g, 'focus:ring-glass');
    content = content.replace(/hover:border-blue-[4-5]00(?:\/[0-9]+)?/g, 'hover:border-muted');
    
    // Backgrounds (gray -> surface/card)
    content = content.replace(/bg-gray-[8-9]00(?:\/[0-9]+)?/g, 'bg-surface');
    content = content.replace(/bg-gray-700/g, 'bg-card');
    
    // Borders (gray)
    content = content.replace(/border-gray-[7-9]00/g, 'border-border');
    content = content.replace(/border-gray-[6]00/g, 'border-muted');
    
    // Text colors (gray -> secondary)
    content = content.replace(/text-gray-[3-4]00/g, 'text-secondary');
    
    // Text muted/disabled (gray)
    content = content.replace(/text-gray-[5-6]00/g, 'text-muted');
    
    // Placeholders
    content = content.replace(/placeholder-gray-500/g, 'placeholder-muted');
    content = content.replace(/placeholder-gray-400/g, 'placeholder-secondary');

    fs.writeFileSync(filePath, content, 'utf8');
  }
});

console.log('Auth and gray/blue replacements complete.');
