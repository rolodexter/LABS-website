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

// Prisma schema parsing utility
function parsePrismaSchema(): {
  models: string[];
  enums: string[];
  types: string[];
} {
  try {
    const schemaPath = path.join(PROJECT_ROOT, 'prisma', 'schema.prisma');
    const schemaContent = fs.readFileSync(schemaPath, 'utf8');
    
    const models = schemaContent.matchAll(/model\s+(\w+)\s*{/g);
    const enums = schemaContent.matchAll(/enum\s+(\w+)\s*{/g);
    const types = schemaContent.matchAll(/type\s+(\w+)\s*=/g);
    
    return {
      models: Array.from(models).map(match => match[1]),
      enums: Array.from(enums).map(match => match[1]),
      types: Array.from(types).map(match => match[1])
    };
  } catch (error) {
    console.error('Error reading Prisma schema:', error);
    return { models: [], enums: [], types: [] };
  }
}

// Validate imports in a single file
function validateFileImports(
  filePath: string, 
  validIdentifiers: {
    models: string[];
    enums: string[];
    types: string[];
  }
): { 
  invalidImports: string[];
  missingImportTypes: string[];
} {
  const result = {
    invalidImports: [] as string[],
    missingImportTypes: [] as string[]
  };
  
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
          
          // Check if imported name is a valid Prisma model, enum, or type
          const isValid = 
            validIdentifiers.models.includes(importedName) ||
            validIdentifiers.enums.includes(importedName) ||
            validIdentifiers.types.includes(importedName);
          
          if (!isValid) {
            result.invalidImports.push(importedName);
          }
        }
      });
    });

    // Find usages of Prisma-related identifiers not imported
    const identifiersUsed: string[] = [];
    const identifiersImported: string[] = [];

    // Collect imported identifiers
    prismaImports.forEach(importNode => {
      importNode.specifiers.forEach(specifier => {
        if (specifier.type === 'ImportSpecifier') {
          identifiersImported.push(specifier.imported.name);
        }
      });
    });

    // Collect used identifiers
    function traverseNode(node: any) {
      if (node && typeof node === 'object') {
        if (node.type === 'Identifier') {
          identifiersUsed.push(node.name);
        }
        
        // Recursively traverse all object properties
        Object.values(node).forEach(val => {
          if (val && typeof val === 'object') {
            traverseNode(val);
          }
        });
      }
    }

    traverseNode(ast);

    // Check for missing import types
    const missingTypes = identifiersUsed.filter(id => 
      (validIdentifiers.models.includes(id) ||
       validIdentifiers.enums.includes(id) ||
       validIdentifiers.types.includes(id)) &&
      !identifiersImported.includes(id)
    );

    result.missingImportTypes = missingTypes;

  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }

  return result;
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

// Main validation function
function runPrismaImportValidation() {
  console.log('🔍 Running Comprehensive Prisma Import Validation...');
  
  // Parse Prisma schema
  const validIdentifiers = parsePrismaSchema();
  console.log('📋 Prisma Schema Identifiers:');
  console.log(`   Models: ${validIdentifiers.models.join(', ')}`);
  console.log(`   Enums: ${validIdentifiers.enums.join(', ')}`);
  console.log(`   Types: ${validIdentifiers.types.join(', ')}`);

  // Collect all validation results
  const allInvalidImports: string[] = [];
  const allMissingImportTypes: string[] = [];

  // Search each directory for files
  SEARCH_PATHS.forEach(searchPath => {
    console.log(`\n📂 Validating ${path.basename(searchPath)}...`);
    
    const tsFiles = findTsFiles(searchPath);
    
    tsFiles.forEach(filePath => {
      const { invalidImports, missingImportTypes } = validateFileImports(
        filePath, 
        validIdentifiers
      );
      
      if (invalidImports.length > 0) {
        console.error(`❌ Invalid Prisma imports in ${path.basename(filePath)}:`);
        invalidImports.forEach(imp => 
          console.error(`   - Unrecognized import: ${imp}`)
        );
        allInvalidImports.push(...invalidImports);
      }

      if (missingImportTypes.length > 0) {
        console.warn(`⚠️ Missing Prisma type imports in ${path.basename(filePath)}:`);
        missingImportTypes.forEach(type => 
          console.warn(`   - Missing import: ${type}`)
        );
        allMissingImportTypes.push(...missingImportTypes);
      }
    });
  });

  // Final report
  console.log('\n📊 Validation Summary:');
  console.log(`   Invalid Imports: ${allInvalidImports.length}`);
  console.log(`   Missing Type Imports: ${allMissingImportTypes.length}`);

  if (allInvalidImports.length === 0 && allMissingImportTypes.length === 0) {
    console.log('✅ No Prisma import issues found!');
    process.exit(0);
  } else {
    console.error('❌ Prisma import validation failed.');
    process.exit(1);
  }
}

// Run the validation
runPrismaImportValidation();
