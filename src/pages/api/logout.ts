import { supabase } from '../../lib/supabase-client'
import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ cookies }) => {
  cookies.delete('sb:token', { path: '/' })
  return new Response(null, {
    status: 302,
    headers: { Location: '/login' }
  })
}

