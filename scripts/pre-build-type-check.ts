import fs from 'fs';
import path from 'path';
import ts from 'typescript';

// Paths to check for type errors
const PATHS_TO_CHECK = [
  'lib',
  'components',
  'pages',
  'scripts'
];

// Logging utility
function log(message: string, type: 'info' | 'warn' | 'error' = 'info') {
  const colors = {
    info: '\x1b[36m',  // Cyan
    warn: '\x1b[33m',  // Yellow
    error: '\x1b[31m'  // Red
  };
  const reset = '\x1b[0m';
  console.log(`${colors[type]}${message}${reset}`);
}

// Find TypeScript files recursively
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

// Perform type checking
function performTypeCheck(files: string[]) {
  log('🔍 Running Pre-Build Type Validation...', 'info');
  
  // TypeScript compiler options
  const compilerOptions: ts.CompilerOptions = {
    noEmit: true,
    strict: true,
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.CommonJS,
    moduleResolution: ts.ModuleResolutionKind.Node10,
    esModuleInterop: true,
    resolveJsonModule: true,
    jsx: ts.JsxEmit.React,
    skipLibCheck: true
  };

  // Create program
  const program = ts.createProgram(files, compilerOptions);
  
  // Collect and report errors
  const diagnostics = ts.getPreEmitDiagnostics(program);
  
  const errors: string[] = [];
  const warnings: string[] = [];
  
  diagnostics.forEach(diagnostic => {
    if (diagnostic.file) {
      const { line, character } = ts.getLineAndCharacterOfPosition(
        diagnostic.file, 
        diagnostic.start || 0
      );
      
      const message = ts.flattenDiagnosticMessageText(
        diagnostic.messageText, 
        '\n'
      );
      
      const location = `${diagnostic.file.fileName}:${line + 1}:${character + 1}`;
      
      // Categorize diagnostics
      if (diagnostic.category === ts.DiagnosticCategory.Error) {
        errors.push(`❌ ${location}: ${message}`);
      } else if (diagnostic.category === ts.DiagnosticCategory.Warning) {
        warnings.push(`⚠️ ${location}: ${message}`);
      }
    }
  });

  // Report results
  log('\n📊 Type Validation Summary:', 'info');
  log(`   Files Checked: ${files.length}`, 'info');
  
  if (warnings.length > 0) {
    log('\n⚠️ Warnings:', 'warn');
    warnings.forEach(warning => log(warning, 'warn'));
  }
  
  if (errors.length > 0) {
    log('\n❌ Type Errors:', 'error');
    errors.forEach(error => log(error, 'error'));
    
    log('\n🚨 Pre-Build Type Validation Failed', 'error');
    process.exit(1);
  } else {
    log('✅ All files passed type validation!', 'info');
    process.exit(0);
  }
}

// Main function
function runPreBuildTypeCheck() {
  const projectRoot = path.resolve(__dirname, '..');
  
  const filesToCheck: string[] = [];
  
  PATHS_TO_CHECK.forEach(subPath => {
    const fullPath = path.join(projectRoot, subPath);
    filesToCheck.push(...findTsFiles(fullPath));
  });

  performTypeCheck(filesToCheck);
}

// Execute type check
runPreBuildTypeCheck();
