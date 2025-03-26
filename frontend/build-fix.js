const { execSync } = require('child_process');

// Выполняем установку зависимостей, если нужно
try {
  console.log('Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  console.log('Running Vue CLI build with npx...');
  // Используем npx напрямую вместо копирования файла
  execSync('npx @vue/cli-service build', { stdio: 'inherit' });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
} 