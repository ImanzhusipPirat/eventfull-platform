const { execSync } = require('child_process');

try {
  console.log('Setting permissions and running build...');
  execSync('npx vue-cli-service build', { stdio: 'inherit' });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}