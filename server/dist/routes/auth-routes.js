import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
export const login = async (req, res) => {
    // TODO: If the user exists and the password is correct, return a JWT token
    const { username, password } = req.body;
    try {
        // Verificar si el usuario existe
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }
        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }
        console.log("before token");
        // Generar el token JWT
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' } // Token válido por 1 hora
        );
        console.log("after token");
        // Enviar el token al cliente
        return res.json({ token }); // Usa `return` para asegurar que la función finaliza
    }
    catch (error) {
        console.error('Error en el inicio de sesión:', error);
        return res.status(500).json({ message: '***Error interno del servidor' }); // `return` explícito aquí también
    }
};
const router = Router();
// POST /login - Login a user
router.post('/login', login);
export default router;
