const express = require("express");
const router = express.Router();
const mesas = require("../models/mesas");

// Registro de mesas
router.post("/registro", async (req, res) => {
    const datoMesa = mesas(req.body);
    await datoMesa
        .save()
        .then((data) =>
            res.status(200).json(
                {
                    mensaje: "Mesa registrada", datos: data
                }
            ))
        .catch((error) => res.json({ message: error }));
});

// Obtener las mesas
router.get("/listar", async (req, res) => {
    try {
        const data = await mesas.find().sort({ _id: 1 });
        res.json(data);
    } catch (error) {
        res.json({ message: error });
    }
});

// Obtener las mesas activas con paginacion
router.get("/listarPaginando", async (req, res) => {
    await mesas
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener el total de mesas activas
router.get("/totalMesas", async (_req, res) => {
    await mesas
        .find()
        .count()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener las mesas activas con paginacion
router.get("/listarPaginandoActivas", async (req, res) => {
    await mesas
        .find({ estado: "true" })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener el total de mesas activas
router.get("/totalMesasActivas", async (_req, res) => {
    await mesas
        .find({ estado: "true" })
        .count()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener las mesas canceladas con paginacion
router.get("/listarPaginandoCanceladas", async (req, res) => {
    await mesas
        .find({ estado: "false" })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener el total de mesas canceladas
router.get("/totalMesasCanceladas", async (_req, res) => {
    await mesas
        .find({ estado: "false" })
        .count()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener una mesa en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    await mesas
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar una mesa
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    await mesas
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Mesa eliminada" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar el estado de una mesa
router.put("/ocuparDesocupar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado, idTicket } = req.body;
    const updateFields = { $set: { estado, idTicket } };

    await mesas
        .updateOne({ _id: id }, updateFields)
        .then((data) => res.status(200).json({ mensaje: "Estado de la mesa actualizado" }))
        .catch((error) => res.json({ message: error }));
});



// Actualizar datos de la categoria
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { numeroMesa, descrpcion, numeroPersonas } = req.body;
    await mesas
        .updateOne({ _id: id }, { $set: { numeroMesa, descrpcion, numeroPersonas } })
        .then((data) => res.status(200).json({ mensaje: "Datos de la mesa actualizados" }))
        .catch((error) => res.json({ message: error }));
});


//update mesas

module.exports = router;
