import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Rutas públicas que no requieren autenticación
  const publicRoutes = ['/login', '/register'];
  
  // Rutas protegidas que requieren autenticación
  const protectedRoutes = ['/dashboard'];
  
  // Verificar si la ruta actual es pública
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  
  // Verificar si la ruta actual es protegida
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  // Obtener el token de autenticación del localStorage (simulado con cookie)
  const userCookie = request.cookies.get('user');
  const isAuthenticated = !!userCookie;
  
  // Si el usuario está autenticado y trata de acceder a login/register, redirigir al dashboard
  if (isAuthenticated && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // Si el usuario no está autenticado y trata de acceder a una ruta protegida, redirigir al login
  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Si el usuario no está autenticado y está en la página principal, redirigir al login
  if (!isAuthenticated && pathname === '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
