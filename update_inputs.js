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
    
    // We want to change `<input ... className="... bg-surface ..."` to `bg-transparent` 
    // or simply remove the bg color so it inherits the dark theme correctly.
    // The previous script replaced bg-gray-900 with bg-surface, which is #141414, but inside form elements it might look off against the pure black. Let's make all inputs transparent.
    content = content.replace(/(<input[^>]+className=["'][^"']*)bg-surface([^"']*["'])/g, '$1bg-transparent$2');
    content = content.replace(/(<textarea[^>]+className=["'][^"']*)bg-surface([^"']*["'])/g, '$1bg-transparent$2');

    fs.writeFileSync(filePath, content, 'utf8');
  }
});

console.log('Input backgrounds set to transparent.');
