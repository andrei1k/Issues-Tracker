import jwt from 'jsonwebtoken';

// Функция за създаване на JWT токен
export function createToken(userId: number): string {
  const secretKey = 'your_secret_key';
  const token = jwt.sign({ userId }, secretKey, { expiresIn: '20m' }); // Токенът изтича след 1 час
  return token;
}

export function verifyToken(token: string): void {
    try {
        const secretKey = 'your_secret_key';
        jwt.verify(token, secretKey);
    }
    catch {
        throw Error('');
    }
  }