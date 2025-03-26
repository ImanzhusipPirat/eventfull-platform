const { execSync } = require('child_process');

try {
  console.log('Setting permissions and running build...');
  
  // Используем прямой путь к vue-cli-service через node
  execSync('node ./node_modules/@vue/cli-service/bin/vue-cli-service.js build', { stdio: 'inherit' });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}