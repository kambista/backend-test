const crypto = require('crypto');
const iv = Buffer.from('0000000000000000');

export const encrypt = (data, key) => {
  const decodeKey = crypto.createHash('sha256').update(key, 'utf-8').digest();
  const cipher = crypto.createCipheriv('aes-256-cbc', decodeKey, iv);
  return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
};

export const decrypt = (data, key) => {
  const encodeKey = crypto.createHash('sha256').update(key, 'utf-8').digest();
  const cipher = crypto.createDecipheriv('aes-256-cbc', encodeKey, iv);
  return cipher.update(data, 'hex', 'utf8') + cipher.final('utf8');
};
