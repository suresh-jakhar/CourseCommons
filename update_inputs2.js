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
    
    // Change `<input ... className="... bg-transparent ..."` to `bg-[#141414]` or `bg-surface`
    // Sometimes browsers apply ugly blue backgrounds to `transparent` inputs if autofill or autocomplete triggers
    // Explicitly defining `bg-[#141414]` (surface) blocks browser overrides.
    content = content.replace(/(<input[^>]+className=["'][^"']*)bg-transparent([^"']*["'])/g, '$1bg-[#141414]$2');
    
    // Also ensuring no box-shadow or ring overrides create blue tints
    content = content.replace(/focus:border-muted/g, 'focus:border-[#2F2F2F] focus:ring-1 focus:ring-[#2F2F2F]');

    fs.writeFileSync(filePath, content, 'utf8');
  }
});

console.log('Inputs updated to strict #141414 dark background to prevent browser autofill/transparency rendering issues.');
