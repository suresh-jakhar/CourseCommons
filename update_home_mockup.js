const fs = require('fs');
const path = require('path');

const homePath = path.join(__dirname, 'client', 'src', 'pages', 'Home.jsx');

let content = fs.readFileSync(homePath, 'utf8');

// The dummy dashboard in Home.jsx uses gray classes to look like a light UI
// We need to convert them to look like the dark theme.
// Backgrounds
content = content.replace(/bg-white/g, 'bg-surface');
content = content.replace(/bg-gray-50/g, 'bg-base');
content = content.replace(/bg-gray-100/g, 'bg-card');
content = content.replace(/bg-gray-200/g, 'bg-btn');
content = content.replace(/bg-gray-300/g, 'bg-btn-hover');
content = content.replace(/bg-gray-400/g, 'bg-muted');

// Borders
content = content.replace(/border-gray-100/g, 'border-border');
content = content.replace(/border-gray-200/g, 'border-border');
content = content.replace(/border-gray-500/g, 'border-muted');

// Texts
content = content.replace(/text-gray-700/g, 'text-primary');
content = content.replace(/text-gray-800/g, 'text-primary');

fs.writeFileSync(homePath, content, 'utf8');

console.log('Home dummy dashboard dark themed.');
