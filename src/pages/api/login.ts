import { supabase } from '../../lib/supabase-client'
import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ request, cookies }) => {
  const body = await request.json()
  const { email, password, redirect = '/ludo' } = body

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 401 })
  }

  const token = data.session?.access_token

  cookies.set('sb:token', token, {
    httpOnly: true,
    secure: import.meta.env.PROD,
    path: '/',
    sameSite: 'Strict',
    maxAge: 60 * 60 * 24 * 7,
  })

  return new Response(JSON.stringify({ redirect }), { status: 200 })
}
