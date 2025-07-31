import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          req.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          req.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect main routes
  if (req.nextUrl.pathname.startsWith('/main')) {
    if (!user) {
      return NextResponse.redirect(new URL('/auth/login', req.url))
    }
  }

  // Redirect to main if already logged in and trying to access auth pages
  if (req.nextUrl.pathname.startsWith('/auth') && user) {
    return NextResponse.redirect(new URL('/main/dashboard', req.url))
  }

  // Redirect root to appropriate page
  if (req.nextUrl.pathname === '/') {
    if (user) {
      return NextResponse.redirect(new URL('/main/dashboard', req.url))
    } else {
      return NextResponse.redirect(new URL('/auth/login', req.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}