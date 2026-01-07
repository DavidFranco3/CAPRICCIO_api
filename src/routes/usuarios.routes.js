const express = require("express");
const router = express.Router();
const usuarios = require("../models/usuarios");
const bcrypt = require("bcrypt");

// Registro de administradores
router.post("/registro", async (req, res) => {
    const { usuario, password } = req.body;

    // Hashear la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Inicia validacion para no registrar usuarios con el mismo correo electronico
    const busqueda = await usuarios.findOne({ usuario });

    if (busqueda && busqueda.usuario === usuario) {
        return res.status(401).json({ mensaje: "Usuario ya registrado" });
    } else {
        const usuarioRegistrar = new usuarios({
            ...req.body,
            password: hashedPassword  // Guardar la contraseña hasheada
        });
        await usuarioRegistrar
            .save()
            .then((data) =>
                res.status(200).json(
                    {
                        mensaje: "Registro exitoso del usuario", datos: data
                    }
                ))
            .catch((error) => res.json({ message: error }));
    }
});

// Registro de administradores
router.post("/registroCliente", async (req, res) => {
    const { usuario } = req.body;

    // Inicia validacion para no registrar usuarios con el mismo correo electronico
    const busqueda = await usuarios.findOne({ usuario });

    if (busqueda && busqueda.usuario === usuario) {
        return res.status(401).json({ mensaje: "Usuario ya registrado" });
    } else {
        const usuarioRegistrar = usuarios(req.body);
        await usuarioRegistrar
            .save()
            .then((data) =>
                res.status(200).json(
                    {
                        mensaje: "Registro exitoso del usuario", datos: data
                    }
                ))
            .catch((error) => res.json({ message: error }));
    }
});

// Obtener todos los usuarios colaboradores
router.get("/listar", async (req, res) => {
    usuarios
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos los usuarios colaboradores
router.get("/listarCajeros", async (req, res) => {
    usuarios
        .find({ tipo: "interno", admin: "false", estadoUsuario: "true" })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos los usuarios colaboradores
router.get("/listarClientes", async (req, res) => {
    usuarios
        .find({ tipo: "externo", estadoUsuario: "true" })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener las ventas activas con paginacion
router.get("/listarPaginandoActivos", async (req, res) => {
    //console.log("Pagina ", pagina , " Limite ", limite)

    await usuarios
        .find({ tipo: "interno", estadoUsuario: "true" })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener el total de las ventas activas
router.get("/totalUsuariosActivos", async (_req, res) => {
    await usuarios
        .find({ tipo: "interno", estadoUsuario: "true" })
        .count()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener las ventas activas con paginacion
router.get("/listarPaginandoClientes", async (req, res) => {
    //console.log("Pagina ", pagina , " Limite ", limite)

    await usuarios
        .find({ tipo: "externo" })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener el total de las ventas activas
router.get("/totalClientes", async (_req, res) => {
    await usuarios
        .find({ tipo: "externo" })
        .count()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener las ventas canceladas con paginacion
router.get("/listarPaginandoCancelados", async (req, res) => {
    //console.log("Pagina ", pagina , " Limite ", limite)

    await usuarios
        .find({ tipo: "interno", estadoUsuario: "false" })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener el total de las ventas canceladas
router.get("/totalUsuariosCancelados", async (_req, res) => {
    await usuarios
        .find({ tipo: "interno", estadoUsuario: "false" })
        .count()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Listar paginando los usuarios
router.get("/listarPaginando", async (req, res) => {
    //console.log("Pagina ", pagina , " Limite ", limite)

    await usuarios
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener un usuario en especifico
router.get("/obtenerUsuario/:id", async (req, res) => {
    const { id } = req.params;
    //console.log("buscando")
    usuarios
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar un usuario administrador
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    usuarios
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Usuario eliminado" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar estado del usuario
router.put("/deshabilitar/:id", async (req, res) => {
    const { id } = req.params;
    const { estadoUsuario } = req.body;
    usuarios
        .updateOne({ _id: id }, { $set: { estadoUsuario } })
        .then((data) => res.status(200).json({ mensaje: "Estado del usuario actualizado" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos del usuario
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, usuario, password, admin, rol } = req.body;

    // Inicializa un objeto con los datos a actualizar
    const updateData = { nombre, usuario, admin, rol };

    // Si se proporciona una nueva contraseña, hashearla
    if (password) {
        const saltRounds = 10; // Puedes ajustar este número
        try {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            updateData.password = hashedPassword; // Añade la contraseña hasheada al objeto de actualización
        } catch (error) {
            return res.status(500).json({ mensaje: "Error al hashear la contraseña", error: error.message });
        }
    }

    // Inicia validacion para no registrar usuarios con el mismo correo electronico
    const busqueda = await usuarios.findOne({ usuario });

    if (busqueda && busqueda.usuario === usuario && busqueda._id != id) {
        return res.status(401).json({ mensaje: "Usuario ya registrado" });
    } else {
        await usuarios
            .updateOne({ _id: id }, { $set: updateData })
            .then((data) => res.status(200).json({ mensaje: "Datos del usuario actualizados" }))
            .catch((error) => res.json({ message: error }));
    }
});

module.exports = router;
