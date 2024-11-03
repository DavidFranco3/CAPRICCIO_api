const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const usuariosModelo = require("../models/usuarios");
const bcrypt = require("bcrypt");

// Para validar los datos del inicio de sesion
router.post('/login', async (req, res) => {
    const { usuario, password } = req.body;

    // Buscar al usuario en la base de datos
    const usuarios = await usuariosModelo.findOne({ usuario });

    console.log(usuarios)

    // Verificar si el usuario no existe
    if (!usuarios) return res.status(401).json({ mensaje: "Usuario no registrado" });

    // Verificar si el usuario está activo
    if (usuarios.estadoUsuario == "true") {
        // Compara la contraseña proporcionada con la hasheada en la base de datos
        const passwordMatch = await bcrypt.compare(password, usuarios.password);
        console.log(passwordMatch);

        if (!passwordMatch) {
            return res.status(401).json({ mensaje: "Contraseña Incorrecta" });
        }

        // Generar el token si las credenciales son correctas
        const token = await jwt.sign({ _: usuarios._id }, 'secretkey', {
            expiresIn: 86400
        });

        res.status(200).json({ token });
    } else {
        return res.status(401).json({ mensaje: "Inicio de sesion no autorizado" });
    }
});
module.exports = router;
