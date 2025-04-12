import fs from 'fs';
import path from 'path';
import { parse } from '@typescript-eslint/typescript-estree';

// Paths to search for Prisma imports
const PROJECT_ROOT = path.resolve(__dirname, '..');
const SEARCH_PATHS = [
  path.join(PROJECT_ROOT, 'lib'),
  path.join(PROJECT_ROOT, 'components'),
  path.join(PROJECT_ROOT, 'pages'),
  path.join(PROJECT_ROOT, 'scripts')
];

// Read Prisma schema to get valid model names
function getPrismaModelNames(): string[] {
  try {
    const schemaPath = path.join(PROJECT_ROOT, 'prisma', 'schema.prisma');
    const schemaContent = fs.readFileSync(schemaPath, 'utf8');
    const modelMatches = schemaContent.matchAll(/model\s+(\w+)\s*{/g);
    return Array.from(modelMatches).map(match => match[1]);
  } catch (error) {
    console.error('Error reading Prisma schema:', error);
    return [];
  }
}

// Audit imports in a single file
function auditFileImports(filePath: string, validModelNames: string[]): string[] {
  const issues: string[] = [];
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const ast = parse(fileContent, {
      loc: true,
      range: true,
      comment: true,
      jsx: true,
      sourceType: 'module',
    });

    // Find Prisma import declarations
    const prismaImports = ast.body.filter(node => 
      node.type === 'ImportDeclaration' && 
      node.source.value === '@prisma/client'
    );

    prismaImports.forEach(importNode => {
      importNode.specifiers.forEach(specifier => {
        if (specifier.type === 'ImportSpecifier') {
          const importedName = specifier.imported.name;
          
          // Check if imported name is a valid Prisma model
          if (!validModelNames.includes(importedName)) {
            issues.push(`Invalid Prisma import: ${importedName} in ${path.basename(filePath)}`);
          }
        }
      });
    });

  } catch (error) {
    issues.push(`Error processing ${filePath}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  return issues;
}

// Recursively search directories for TypeScript/TSX files
function findTsFiles(directory: string): string[] {
  const tsFiles: string[] = [];
  
  function traverse(dir: string) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        tsFiles.push(fullPath);
      }
    });
  }
  
  traverse(directory);
  return tsFiles;
}

// Main audit function
function runPrismaImportAudit() {
  console.log('🔍 Running Prisma Import Audit...');
  
  // Get valid Prisma model names
  const validModelNames = getPrismaModelNames();
  console.log(`📋 Valid Prisma Models: ${validModelNames.join(', ')}`);

  // Collect all issues
  const allIssues: string[] = [];

  // Search each directory for files
  SEARCH_PATHS.forEach(searchPath => {
    console.log(`\n📂 Auditing ${path.basename(searchPath)}...`);
    
    const tsFiles = findTsFiles(searchPath);
    
    tsFiles.forEach(filePath => {
      const fileIssues = auditFileImports(filePath, validModelNames);
      
      if (fileIssues.length > 0) {
        allIssues.push(...fileIssues);
        console.error(`❌ Found ${fileIssues.length} import issues in ${path.basename(filePath)}:`);
        fileIssues.forEach(issue => console.error(`   - ${issue}`));
      }
    });
  });

  // Final report
  if (allIssues.length === 0) {
    console.log('✅ No invalid Prisma imports found!');
    process.exit(0);
  } else {
    console.error(`❌ Found ${allIssues.length} Prisma import issues.`);
    process.exit(1);
  }
}

// Run the audit
runPrismaImportAudit();
