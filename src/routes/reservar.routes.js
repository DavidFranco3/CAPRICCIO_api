const express = require("express");
const router = express.Router();
const reservar = require("../models/reservar");

// Registro de reservar
router.post("/registro", async (req, res) => {
    const datoReservar = reservar(req.body);
    await datoReservar
        .save()
        .then((data) =>
            res.status(200).json(
                {
                    mensaje: "Reservacion registrada", datos: data
                }
            ))
        .catch((error) => res.json({ message: error }));
});

// Obtener las reservar
router.get("/listar", async (req, res) => {
    await reservar
        .find({ estado: "true" })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener las rservar activas con paginacion
router.get("/listarPaginando", async (req, res) => {
    await reservar
        .find()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener el total de reservar activas
router.get("/totalReservar", async (_req, res) => {
    await reservar
        .find()
        .count()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener las reeservar  activas con paginacion
router.get("/listarPaginandoActivas", async (req, res) => {
    await reservar
        .find({ estado: "true" })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener el total de reservar activas
router.get("/totalReservarActivas", async (_req, res) => {
    await reservar
        .find({ estado: "true" })
        .count()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener las reservar canceladas con paginacion
router.get("/listarPaginandoCanceladas", async (req, res) => {
    await reservar
        .find({ estado: "false" })
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener el total de reservar canceladas
router.get("/totalReservarCanceladas", async (_req, res) => {
    await reservar
        .find({ estado: "false" })
        .count()
        .sort({ _id: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener una reservacion en especifico
router.get("/obtener/:id", async (req, res) => {
    const { id } = req.params;
    await reservar
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Borrar una reservacion
router.delete("/eliminar/:id", async (req, res) => {
    const { id } = req.params;
    await reservar
        .deleteOne({ _id: id })
        .then((data) => res.status(200).json({ mensaje: "Reservaciion eliminada" }))
        .catch((error) => res.json({ message: error }));
});

// Cambiar el estado de una reservacion
router.put("/cancelar/:id", async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    await reservar
        .updateOne({ _id: id }, { $set: { estado } })
        .then((data) => res.status(200).json({ mensaje: "La reservacion fue cerrada exitosamente" }))
        .catch((error) => res.json({ message: error }));
});

// Actualizar datos de la categoria
router.put("/actualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, numeroPersonas } = req.body;
    await reservar
        .updateOne({ _id: id }, { $set: { nombre, numeroPersonas } })
        .then((data) => res.status(200).json({ mensaje: "Datos de la reservacion actualizados" }))
        .catch((error) => res.json({ message: error }));
});

module.exports = router;
