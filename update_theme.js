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
    
    // Replace hardcoded Tailwind colors to map to the new theme
    
    // Borders
    content = content.replace(/border-white\/(?:[0-9]+)/g, 'border-border');
    content = content.replace(/border-\[\#[a-f0-9]+\]\/(?:[0-9]+)/gi, 'border-border');
    content = content.replace(/border-\[\#[a-f0-9]+\]/gi, 'border-border');
    
    // Backgrounds (Glass/Surface)
    content = content.replace(/bg-white\/(?:[2-9]|1[0-9]|20)/g, 'bg-glass'); // Low opacity white -> glass
    content = content.replace(/bg-\[rgba?\([^\]]+\)\]/g, 'bg-glass'); // rgba backgrounds -> glass
    content = content.replace(/bg-\[\#[a-f0-9]+\]\/(?:[0-9]+)/gi, 'bg-surface');
    content = content.replace(/bg-\[\#[a-f0-9]+\]/gi, 'bg-surface');
    
    // Text colors (white variations)
    // Pure white -> primary
    content = content.replace(/text-white(?![\/\-\w])/g, 'text-primary'); 
    // High opacity white -> secondary
    content = content.replace(/text-white\/(?:80|75|70|65|60)/g, 'text-secondary');
    // Low opacity white -> muted
    content = content.replace(/text-white\/(?:55|50|45)/g, 'text-muted');
    // Very low opacity -> disabled
    content = content.replace(/text-white\/(?:40|30|20|10)/g, 'text-disabled');
    
    // Hardcoded hex text colors 
    content = content.replace(/text-\[\#[a-f0-9]+\]/gi, 'text-secondary');
    
    fs.writeFileSync(filePath, content, 'utf8');
  }
});

console.log('Update complete.');
