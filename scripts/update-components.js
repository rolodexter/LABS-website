const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '..', 'pages');

function updateImports(content) {
  // Replace flowbite-react imports with our custom components
  return content.replace(
    /import\s*{\s*([^}]+)\s*}\s*from\s*['"]flowbite-react['"];?/g,
    'import { $1 } from \'@/components/ui\';'
  );
}

function updateFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('flowbite-react')) {
      console.log(`Updating: ${filePath}`);
      const updatedContent = updateImports(content);
      fs.writeFileSync(filePath, updatedContent);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      updateFile(fullPath);
    }
  }
}

processDirectory(pagesDir);
