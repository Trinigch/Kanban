import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
   // Obtener el token del encabezado Authorization
   const authHeader = req.headers.authorization;
   if(authHeader){

    const token = authHeader.split(' ')[1];  // Formato esperado: "Bearer <token>"
   
 
   // Verificar si el token existe
   if (!token) {
     res.status(401).json({ message: 'Token no proporcionado' });
     return ;
   }
 
   // Verificar y decodificar el token
   jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, decoded) => {
    console.log("decoded", decoded);
     if (err) {
       res.status(403).json({ message: 'Token no válido o expirado' });
       return ;
     }
 console.log("decoded", decoded);
     // Añadir los datos del usuario (decodificados) a la solicitud para usarlos en otras rutas
     req.user = decoded as JwtPayload;  // Asegura que el tipo de `req.user` es JwtPayload
     return next();
      // Garantiza que el callback siempre termina aquí
    
   });

  }
 //  return; 
};
