// lib/session.ts
import { auth } from './auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getSession() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    return session;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }
  return session;
}

export async function requireNoAuth() {
  const session = await getSession();
  if (session) {
    redirect('/dashboard');
  }
}

