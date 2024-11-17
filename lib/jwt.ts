import { SignJWT, jwtVerify } from 'jose';

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');

export async function signToken(payload: Record<string, unknown>, expiresIn = '2h'): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(expiresIn)
    .setIssuedAt()
    .sign(secretKey);
}

export async function verifyToken(token: string): Promise<any> {
  const { payload } = await jwtVerify(token, secretKey);
  return payload;
}
