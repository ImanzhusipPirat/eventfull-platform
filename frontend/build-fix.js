const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Выполняем установку зависимостей, если нужно
try {
  console.log('Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Копируем содержимое скрипта vue-cli-service во временный файл
  console.log('Creating temporary build script...');
  const vueCLIServicePath = path.join(__dirname, 'node_modules', '@vue', 'cli-service', 'bin', 'vue-cli-service.js');
  
  if (fs.existsSync(vueCLIServicePath)) {
    const content = fs.readFileSync(vueCLIServicePath, 'utf8');
    fs.writeFileSync('temp-build-script.js', content, 'utf8');
    
    console.log('Running build with temp script...');
    execSync('node temp-build-script.js build', { stdio: 'inherit' });
    
    // Удаляем временный файл
    fs.unlinkSync('temp-build-script.js');
    
    console.log('Build completed successfully!');
  } else {
    console.error('Could not find vue-cli-service.js script in node_modules!');
    console.log('Trying fallback direct build command...');
    execSync('npx vue-cli-service build', { stdio: 'inherit' });
  }
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
} 