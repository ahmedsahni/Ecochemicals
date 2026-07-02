const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'frontend', 'src', 'components');
const targetDir = path.join(__dirname, 'eco-chemicals-next', 'src', 'components');

const files = fs.readdirSync(sourceDir);

files.forEach(file => {
  if (file === 'Hero.jsx' || file === 'Partners.jsx') return; // Skip these, already built
  
  const sourceFile = path.join(sourceDir, file);
  const targetFile = path.join(targetDir, file);
  
  let content = fs.readFileSync(sourceFile, 'utf8');
  
  if (!content.startsWith('"use client";') && !content.startsWith("'use client';")) {
    content = '"use client";\n\n' + content;
  }
  
  fs.writeFileSync(targetFile, content);
  console.log(`Ported ${file}`);
});
