import jwt from 'jsonwebtoken';

export function createToken(userId: number): string {
  const secretKey = 'your_secret_key';
  const token = jwt.sign({ userId }, secretKey, { expiresIn: '20m' });
  return token;
}

export function verifyToken(token: string): void {
    try {
        const secretKey = 'your_secret_key';
        jwt.verify(token, secretKey);
    }
    catch {
        throw Error('wrong-key');
    }
  }