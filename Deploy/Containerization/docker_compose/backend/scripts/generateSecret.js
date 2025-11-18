import crypto from 'crypto';

// Generate a secure random string of 64 bytes and convert it to base64
const secret = crypto.randomBytes(64).toString('base64');

console.log('Generated JWT_SECRET: ');
console.log(secret);
console.log('\nMake sure to update the .env file with this value');