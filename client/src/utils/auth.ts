import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token Decodifica el token y devuelve la información del perfil del usuario.
    //Decodifica el token y devuelve la información del perfil del usuario.
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null;
  }
  loggedIn() {
    // TODO: return a value that indicates if the user is logged in 
    //Devuelve true si el usuario está autenticado (token válido).
    const token = this.getToken();
    return token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    //Verifica si el token ha expirado.
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.exp) return true;
    const expirationTime = decoded.exp * 1000;
    return Date.now() > expirationTime;

  }

  getToken(): string {
    // TODO: return the token
    //Recupera el token del localStorage.
    return localStorage.getItem('id_token') || '';
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    // TODO: redirect to the home page
    //Guarda el token en el localStorage y redirige a la página principal
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    // TODO: remove the token from localStorage
    // TODO: redirect to the login page
    localStorage.removeItem('id_token');
    window.location.assign('/login');
  }
}

export default new AuthService();
