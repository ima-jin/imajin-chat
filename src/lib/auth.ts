import { NextRequest } from 'next/server';

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'https://auth.imajin.ai';

export interface Identity {
  id: string;           // DID
  publicKey: string;    // Ed25519 public key
  type: 'human' | 'agent' | 'presence';
}

export interface AuthResult {
  identity: Identity;
}

export interface AuthError {
  error: string;
  status: number;
}

/**
 * Verify token with auth service and return identity
 */
export async function requireAuth(request: NextRequest): Promise<AuthResult | AuthError> {
  const authHeader = request.headers.get('Authorization');
  
  if (!authHeader?.startsWith('Bearer ')) {
    return { error: 'Missing or invalid Authorization header', status: 401 };
  }
  
  const token = authHeader.slice(7);
  
  try {
    const response = await fetch(`${AUTH_SERVICE_URL}/api/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    
    if (!response.ok) {
      return { error: 'Invalid or expired token', status: 401 };
    }
    
    const data = await response.json();
    return { identity: data.identity };
  } catch (error) {
    console.error('Auth verification failed:', error);
    return { error: 'Auth service unavailable', status: 503 };
  }
}

/**
 * Optional auth - returns identity if present, null otherwise
 */
export async function optionalAuth(request: NextRequest): Promise<Identity | null> {
  const result = await requireAuth(request);
  if ('error' in result) {
    return null;
  }
  return result.identity;
}
