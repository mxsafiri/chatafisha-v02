// Simple script to generate a private key for thirdweb Auth
const crypto = require('crypto');

// Generate a random 32-byte (256-bit) private key
const privateKey = '0x' + crypto.randomBytes(32).toString('hex');

console.log('Generated AUTH_PRIVATE_KEY:');
console.log(privateKey);
console.log('\nAdd this to your .env file as:');
console.log(`AUTH_PRIVATE_KEY=${privateKey}`);
