const express = require("express");
const router = express.Router();
const ventas = require("../models/ventas");
const mesas = require("../models/mesas");
const { map } = require("lodash");
const moment = require("moment-timezone");

// Registro de ventas
router.post("/registro", async (req, res) => {
  const datoVentas = ventas(req.body);
  await datoVentas
    .save()
    .then((data) =>
      res.status(200).json({
        mensaje: "Se ha registrado una nueva venta",
        datos: data,
      })
    )
    .catch((error) => res.json({ message: error }));
});

// Obtener las ventas
router.get("/listar", async (req, res) => {
  await ventas
    .find()
    .sort({ _id: -1 })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Obtener las ventas activas con paginacion
router.get("/listarPaginandoCajerosActivas", async (req, res) => {
  const { pagina, limite, usuario } = req.query;
  //console.log("Pagina ", pagina , " Limite ", limite)

  const skip = (pagina - 1) * limite;

  await ventas
    .find({ usuario, estado: "true" })
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limite)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Obtener el total de las ventas activas
router.get("/totalVentasCajerosActivas", async (req, res) => {
  const { usuario } = req.query;
  await ventas
    .find({ usuario, estado: "true" })
    .count()
    .sort({ _id: -1 })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Obtener las ventas canceladas con paginacion
router.get("/listarPaginandoCajerosCanceladas", async (req, res) => {
  const { pagina, limite, usuario } = req.query;
  //console.log("Pagina ", pagina , " Limite ", limite)

  const skip = (pagina - 1) * limite;

  await ventas
    .find({ usuario, estado: "false" })
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limite)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Obtener el total de las ventas canceladas
router.get("/totalVentasCajerosCanceladas", async (req, res) => {
  const { usuario } = req.query;
  await ventas
    .find({ usuario, estado: "false" })
    .count()
    .sort({ _id: -1 })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Obtener las ventas activas con paginacion
router.get("/listarPaginandoActivas", async (req, res) => {
  const { pagina, limite } = req.query;
  //console.log("Pagina ", pagina , " Limite ", limite)

  const skip = (pagina - 1) * limite;

  await ventas
    .find({ estado: "true" })
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limite)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Obtener el total de las ventas activas
router.get("/totalVentasActivas", async (_req, res) => {
  await ventas
    .find({ estado: "true" })
    .count()
    .sort({ _id: -1 })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Obtener las ventas activas con paginacion
router.get("/listarPaginandoActivasTicket", async (req, res) => {
  const { pagina, limite, numeroTiquet } = req.query;
  //console.log("Pagina ", pagina , " Limite ", limite)

  const skip = (pagina - 1) * limite;

  await ventas
    .find({ numeroTiquet, estado: "true" })
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limite)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Obtener el total de las ventas activas
router.get("/totalVentasActivasTicket", async (req, res) => {
  const { numeroTiquet } = req.query;
  await ventas
    .find({ numeroTiquet, estado: "true" })
    .count()
    .sort({ _id: -1 })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Obtener las ventas canceladas con paginacion
router.get("/listarPaginandoCanceladas", async (req, res) => {
  const { pagina, limite } = req.query;
  //console.log("Pagina ", pagina , " Limite ", limite)

  const skip = (pagina - 1) * limite;

  await ventas
    .find({ estado: "false" })
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limite)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Obtener el total de las ventas canceladas
router.get("/totalVentasCanceladas", async (_req, res) => {
  await ventas
    .find({ estado: "false" })
    .count()
    .sort({ _id: -1 })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Obtener las ventas canceladas con paginacion
router.get("/listarPaginandoCanceladasTicket", async (req, res) => {
  const { pagina, limite, numeroTiquet } = req.query;
  //console.log("Pagina ", pagina , " Limite ", limite)

  const skip = (pagina - 1) * limite;

  await ventas
    .find({ numeroTiquet, estado: "false" })
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limite)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Obtener el total de las ventas canceladas
router.get("/totalVentasCanceladasTicket", async (req, res) => {
  const { numeroTiquet } = req.query;
  await ventas
    .find({ numeroTiquet, estado: "false" })
    .count()
    .sort({ _id: -1 })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Obtener las ventas canceladas
router.get("/listarPaginando", async (req, res) => {
  const { pagina, limite } = req.query;
  //console.log("Pagina ", pagina , " Limite ", limite)

  const skip = (pagina - 1) * limite;

  await ventas
    .find()
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limite)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Obtener el total de las ventas
router.get("/totalVentas", async (_req, res) => {
  await ventas
    .find()
    .count()
    .sort({ _id: -1 })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Obtener las ventas con paginacion segun el dia
router.get("/listarPaginandoDia", async (req, res) => {
  const { pagina, limite, dia } = req.query;
  //console.log("Pagina ", pagina , " Limite ", limite)

  const skip = (pagina - 1) * limite;

  await ventas
    .find({
      estado: "COBR",
      fecha: {
        $gte: new Date(dia + "T00:00:00.000Z"),
        $lte: new Date(dia + "T23:59:59.999Z"),
      },
    })
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limite)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Obtener las ventas
router.get("/listarVentasDia", async (req, res) => {
  const { dia } = req.query;

  await ventas
    .find({
      estado: "COBR",
      fecha: {
        $gte: new Date(dia + "T00:00:00.000Z"),
        $lte: new Date(dia + "T23:59:59.999Z"),
      },
    })
    .sort({ _id: -1 })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// OBTENER VENTAS POR FECHAS EN ESPECIFICO
router.get("/listarVentasRangoFechas", async (req, res) => {
  const { fechaInicial, fechaFinal } = req.query;

  await ventas
    .find({
      estado: "COBR",
      fecha: {
        $gte: new Date(fechaInicial + "T00:00:00.000Z"),
        $lte: new Date(fechaFinal + "T23:59:59.999Z"),
      },
    })
    .sort({ fecha: -1 })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.get("/listarVentasPorTurno", async (req, res) => {
  const { turno } = req.query;

  await ventas
    .find({
      estado: "COBR",
      turno: turno,
    })
    .sort({ fecha: -1 })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Obtener las ventas
router.get("/listarVentasSemana", async (req, res) => {
  const { semana, año } = req.query;

  await ventas
    .find({ estado: "COBR", semana, semana, año: año })
    .sort({ _id: -1 })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Obtener los totales segun el dia
router.get("/listarTotalVentasDia", async (req, res) => {
  const { dia } = req.query;
  await ventas
    .find({
      estado: "COBR",
      fecha: {
        $gte: new Date(dia + "T00:00:00.000Z"),
        $lte: new Date(dia + "T23:59:59.999Z"),
      },
    })
    .sort({ _id: -1 })
    .then((data) => {
      //console.log(data)
      let postres_vendidos = 0;
      let tacos_vendidos = 0;
      let promociones_vendidas = 0;
      let productos_vendidos = 0;
      let bebidas_vendidas = 0;
      let extras_vendidos = 0;
      let sandwiches_vendidos = 0;
      let desayunos_vendidos = 0;
      let hamburguesas_vendidas = 0;
      let cafeteria_vendida = 0;
      let envios_vendidos = 0;

      let efectivo = 0;
      let tarjeta = 0;
      let pendiente = 0;
      let transferencia = 0;
      map(data, (totales, indexPrincipal) => {
        // Sumatoria de artículos vendidos
        map(totales.productos, (producto, index) => {
          if (
            producto.categoria === "623b7f2fe94614410f810a47" ||
            producto.categoria === "623b7f24e94614410f810a44" ||
            producto.categoria === "623b7f1be94614410f810a41" ||
            producto.categoria === "623b7f0be94614410f810a3e"
          ) {
            productos_vendidos += 1;
          }
          if (producto.categoria === "62397cbaf67f5c7c54a0560b") {
            bebidas_vendidas += 1;
          }
          if (producto.categoria === "625d8b798bb242960f22ae56") {
            extras_vendidos += 1;
          }
          if (producto.categoria === "627a86119d083324e156bda8") {
            sandwiches_vendidos += 1;
          }
          if (producto.categoria === "631b541c05ab0cb5a3c1dbd6") {
            desayunos_vendidos += 1;
          }
          if (producto.categoria === "6262ee08e1383d22020db083") {
            envios_vendidos += 1;
          }
          if (producto.categoria === "64273bc6804705a24d7fb813") {
            hamburguesas_vendidas += 1;
          }
          if (producto.categoria === "64273eb4dad2341c0af5fca4") {
            cafeteria_vendida += 1;
          }
          if (producto.categoria === "64b838cd0c6bf83cd09977bc") {
            tacos_vendidos += 1;
          }
          if (producto.categoria === "64b6cb8d484e8191fe4812dd") {
            promociones_vendidas += 1;
          }
          if (producto.categoria === "64b839fd47ffb0bc3e3a7227") {
            postres_vendidos += 1;
          }
        });

        // Sumatoria de ventas realizadas con efectivo
        if (totales.tipoPago === "Efectivo") {
          efectivo += parseFloat(totales.total);
          // console.log(totales.total)
        }

        // Sumatoria de ventas realizadas con tarjeta
        if (totales.tipoPago === "Tarjeta") {
          tarjeta += parseFloat(totales.total);
          // console.log(totales.total)
        }

        // Sumatoria de ventas realizadas con transferencia
        if (totales.tipoPago === "Transferencia") {
          transferencia += parseFloat(totales.total);
          // console.log(totales.total)
        }

        // Sumatoria de ventas realizadas con transferencia
        if (totales.tipoPago === "") {
          pendiente += parseFloat(totales.total);
          // console.log(totales.total)
        }
      });
      res.status(200).json({
        efectivo: efectivo,
        tarjeta: tarjeta,
        transferencia: transferencia,
        pendiente: pendiente,
        tortasVendidas: productos_vendidos,
        bebidasVendidas: bebidas_vendidas,
        extrasVendidos: extras_vendidos,
        sandwichesVendidos: sandwiches_vendidos,
        desayunosVendidos: desayunos_vendidos,
        hamburguesasVendidas: hamburguesas_vendidas,
        cafeteriaVendida: cafeteria_vendida,
        enviosVendidos: envios_vendidos,
        postresVendidos: postres_vendidos,
        promocionesVendidas: promociones_vendidas,
        tacosVendidos: tacos_vendidos,
      });
    })
    .catch((error) => res.json({ message: error }));
});

// Obtener los totales segun el Semana
router.get("/listarTotalVentasSemana", async (req, res) => {
  const { semana, año } = req.query;
  // Obtener la fecha actual
  const fechaActual = new Date();

  // Obtener el año y el mes
  const añoActual = fechaActual.getFullYear();
  // El mes es devuelto en base 0 (0 = enero, 1 = febrero, etc.), así que sumamos 1.
  const primerDiaAnio = new Date(fechaActual.getFullYear(), 0, 1);
  const milisegundosEnUnDia = 86400000; // 24 horas * 60 minutos * 60 segundos * 1000 milisegundos

  // Calcular la diferencia en milisegundos entre la fecha actual y el primer día del año
  const diferenciaMilisegundos = fechaActual - primerDiaAnio;
  const semanaActual =
    Math.floor(diferenciaMilisegundos / milisegundosEnUnDia / 7) + 1;
  await ventas
    .find({
      estado: "COBR",
      semana: semana,
      año: año == añoActual && semana > semanaActual ? año - 1 : año,
    })
    .sort({ _id: -1 })
    .then((data) => {
      //console.log(data)
      let postres_vendidos = 0;
      let tacos_vendidos = 0;
      let promociones_vendidas = 0;
      let productos_vendidos = 0;
      let bebidas_vendidas = 0;
      let extras_vendidos = 0;
      let sandwiches_vendidos = 0;
      let desayunos_vendidos = 0;
      let hamburguesas_vendidas = 0;
      let cafeteria_vendida = 0;
      let envios_vendidos = 0;

      let efectivo = 0;
      let tarjeta = 0;
      let pendiente = 0;
      let transferencia = 0;
      map(data, (totales, indexPrincipal) => {
        // Sumatoria de artículos vendidos
        map(totales.productos, (producto, index) => {
          if (
            producto.categoria === "623b7f2fe94614410f810a47" ||
            producto.categoria === "623b7f24e94614410f810a44" ||
            producto.categoria === "623b7f1be94614410f810a41" ||
            producto.categoria === "623b7f0be94614410f810a3e"
          ) {
            productos_vendidos += 1;
          }
          if (producto.categoria === "62397cbaf67f5c7c54a0560b") {
            bebidas_vendidas += 1;
          }
          if (producto.categoria === "625d8b798bb242960f22ae56") {
            extras_vendidos += 1;
          }
          if (producto.categoria === "627a86119d083324e156bda8") {
            sandwiches_vendidos += 1;
          }
          if (producto.categoria === "631b541c05ab0cb5a3c1dbd6") {
            desayunos_vendidos += 1;
          }
          if (producto.categoria === "6262ee08e1383d22020db083") {
            envios_vendidos += 1;
          }
          if (producto.categoria === "64273bc6804705a24d7fb813") {
            hamburguesas_vendidas += 1;
          }
          if (producto.categoria === "64273eb4dad2341c0af5fca4") {
            cafeteria_vendida += 1;
          }
          if (producto.categoria === "64b838cd0c6bf83cd09977bc") {
            tacos_vendidos += 1;
          }
          if (producto.categoria === "64b6cb8d484e8191fe4812dd") {
            promociones_vendidas += 1;
          }
          if (producto.categoria === "64b839fd47ffb0bc3e3a7227") {
            postres_vendidos += 1;
          }
        });

        // Sumatoria de ventas realizadas con efectivo
        if (totales.tipoPago === "Efectivo") {
          efectivo += parseFloat(totales.total);
          // console.log(totales.total)
        }

        // Sumatoria de ventas realizadas con tarjeta
        if (totales.tipoPago === "Tarjeta") {
          tarjeta += parseFloat(totales.total);
          // console.log(totales.total)
        }

        // Sumatoria de ventas realizadas con transferencia
        if (totales.tipoPago === "Transferencia") {
          transferencia += parseFloat(totales.total);
          // console.log(totales.total)
        }

        // Sumatoria de ventas realizadas con transferencia
        if (totales.tipoPago === "") {
          pendiente += parseFloat(totales.total);
          // console.log(totales.total)
        }
      });
      res.status(200).json({
        efectivo: efectivo,
        tarjeta: tarjeta,
        transferencia: transferencia,
        pendiente: pendiente,
        tortasVendidas: productos_vendidos,
        bebidasVendidas: bebidas_vendidas,
        extrasVendidos: extras_vendidos,
        sandwichesVendidos: sandwiches_vendidos,
        desayunosVendidos: desayunos_vendidos,
        hamburguesasVendidas: hamburguesas_vendidas,
        cafeteriaVendida: cafeteria_vendida,
        enviosVendidos: envios_vendidos,
        postresVendidos: postres_vendidos,
        promocionesVendidas: promociones_vendidas,
        tacosVendidos: tacos_vendidos,
      });
    })
    .catch((error) => res.json({ message: error }));
});

// Obtener los totales segun el Semana
router.get("/listarTotalVentasMes", async (req, res) => {
  const { mes, año } = req.query;
  // Obtener la fecha actual
  const fechaActual = new Date();

  // Obtener el año y el mes
  const añoActual = fechaActual.getFullYear();
  // El mes es devuelto en base 0 (0 = enero, 1 = febrero, etc.), así que sumamos 1.
  const mesActual = fechaActual.getMonth() + 1;
  console.log(mes, año);
  await ventas
    .find({
      estado: "COBR",
      mes: mes,
      año: año == añoActual && mes > mesActual ? año - 1 : año,
    })
    .sort({ _id: -1 })
    .then((data) => {
      //console.log(data)
      let postres_vendidos = 0;
      let tacos_vendidos = 0;
      let promociones_vendidas = 0;
      let productos_vendidos = 0;
      let bebidas_vendidas = 0;
      let extras_vendidos = 0;
      let sandwiches_vendidos = 0;
      let desayunos_vendidos = 0;
      let hamburguesas_vendidas = 0;
      let cafeteria_vendida = 0;
      let envios_vendidos = 0;
      let efectivo = 0;
      let tarjeta = 0;
      let pendiente = 0;
      let transferencia = 0;
      map(data, (totales, indexPrincipal) => {
        // Sumatoria de artículos vendidos
        map(totales.productos, (producto, index) => {
          if (
            producto.categoria === "623b7f2fe94614410f810a47" ||
            producto.categoria === "623b7f24e94614410f810a44" ||
            producto.categoria === "623b7f1be94614410f810a41" ||
            producto.categoria === "623b7f0be94614410f810a3e"
          ) {
            productos_vendidos += 1;
          }
          if (producto.categoria === "62397cbaf67f5c7c54a0560b") {
            bebidas_vendidas += 1;
          }
          if (producto.categoria === "625d8b798bb242960f22ae56") {
            extras_vendidos += 1;
          }
          if (producto.categoria === "627a86119d083324e156bda8") {
            sandwiches_vendidos += 1;
          }
          if (producto.categoria === "631b541c05ab0cb5a3c1dbd6") {
            desayunos_vendidos += 1;
          }
          if (producto.categoria === "6262ee08e1383d22020db083") {
            envios_vendidos += 1;
          }
          if (producto.categoria === "64273bc6804705a24d7fb813") {
            hamburguesas_vendidas += 1;
          }
          if (producto.categoria === "64273eb4dad2341c0af5fca4") {
            cafeteria_vendida += 1;
          }
          if (producto.categoria === "64b838cd0c6bf83cd09977bc") {
            tacos_vendidos += 1;
          }
          if (producto.categoria === "64b6cb8d484e8191fe4812dd") {
            promociones_vendidas += 1;
          }
          if (producto.categoria === "64b839fd47ffb0bc3e3a7227") {
            postres_vendidos += 1;
          }
        });

        // Sumatoria de ventas realizadas con efectivo
        if (totales.tipoPago === "Efectivo") {
          efectivo += parseFloat(totales.total);
          // console.log(totales.total)
        }

        // Sumatoria de ventas realizadas con tarjeta
        if (totales.tipoPago === "Tarjeta") {
          tarjeta += parseFloat(totales.total);
          // console.log(totales.total)
        }

        // Sumatoria de ventas realizadas con transferencia
        if (totales.tipoPago === "Transferencia") {
          transferencia += parseFloat(totales.total);
          // console.log(totales.total)
        }

        // Sumatoria de ventas realizadas con transferencia
        if (totales.tipoPago === "") {
          pendiente += parseFloat(totales.total);
          // console.log(totales.total)
        }
      });
      res.status(200).json({
        efectivo: efectivo,
        tarjeta: tarjeta,
        transferencia: transferencia,
        pendiente: pendiente,
        tortasVendidas: productos_vendidos,
        bebidasVendidas: bebidas_vendidas,
        extrasVendidos: extras_vendidos,
        sandwichesVendidos: sandwiches_vendidos,
        desayunosVendidos: desayunos_vendidos,
        hamburguesasVendidas: hamburguesas_vendidas,
        cafeteriaVendida: cafeteria_vendida,
        enviosVendidos: envios_vendidos,
        postresVendidos: postres_vendidos,
        promocionesVendidas: promociones_vendidas,
        tacosVendidos: tacos_vendidos,
      });
    })
    .catch((error) => res.json({ message: error }));
});

//Obtener los detalles de las ventas de la semana
router.get("/listarDetallesVentasSemana", async (req, res) => {
  const { semana } = req.query;
  //console.log(dia)
  await ventas
    .find({ estado: "true", semana: semana })
    .count()
    .sort({ _id: -1 })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => res.json({ message: error }));
});

// Obtener las ventas con paginacion segun el semana
router.get("/listarPaginandoSemana", async (req, res) => {
  const { pagina, limite, semana, año } = req.query;
  //console.log("Pagina ", pagina , " Limite ", limite)

  console.log(año);

  const skip = (pagina - 1) * limite;

  await ventas
    .find({ estado: "true", semana: semana, año: año })
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limite)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Obtener los detalles de las ventas del día
router.get("/listarDetallesVentasDia", async (req, res) => {
  const { dia } = req.query;
  //console.log(dia)
  await ventas
    .find({
      estado: "true",
      fecha: {
        $gte: new Date(dia + "T00:00:00.000Z"),
        $lte: new Date(dia + "T23:59:59.999Z"),
      },
    })
    .count()
    .sort({ _id: -1 })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => res.json({ message: error }));
});

// Listar solo los productos vendidos en el día solicitado
router.get("/listarDetallesProductosVendidosDia", async (req, res) => {
  const { dia } = req.query;
  //console.log(dia)
  await ventas
    .find({
      estado: "true",
      fecha: {
        $gte: new Date(dia + "T00:00:00.000Z"),
        $lte: new Date(dia + "T23:59:59.999Z"),
      },
    })
    .sort({ _id: -1 })
    .then((data) => {
      let dataTemp = [];
      // console.log(data)
      map(data, (datos, indexPrincipal) => {
        map(datos.productos, (producto, index) => {
          const { nombre, precio } = producto;
          dataTemp.push({
            numeroTiquet: data[indexPrincipal].numeroTiquet,
            estado:
              data[indexPrincipal].estado === "true"
                ? "Venta completada"
                : "Venta cancelada",
            cliente: data[indexPrincipal].cliente
              ? data[indexPrincipal].cliente
              : "No especificado",
            nombre: nombre,
            precio: precio,
            tipoPago: !data[indexPrincipal].tipoPago
              ? "Pendiente"
              : data[indexPrincipal].tipoPago,
            tipoPedido: data[indexPrincipal].tipoPedido,
            hacerPedido: data[indexPrincipal].hacerPedido,
            tipoPago: data[indexPrincipal].tipoPago,
            totalVenta: data[indexPrincipal].total,
            fecha: data[indexPrincipal].fecha,
          });
        });
      });
      res.status(200).json(dataTemp);
    })
    .catch((error) => res.json({ message: error }));
});

// Listar solo los productos vendidos en el día solicitado
router.get("/listarConsumoIngredientes", async (req, res) => {
  const { dia } = req.query;
  //console.log(dia)
  await ventas
    .find({
      estado: "true",
      fecha: {
        $gte: new Date(dia + "T00:00:00.000Z"),
        $lte: new Date(dia + "T23:59:59.999Z"),
      },
    })
    .sort({ _id: -1 })
    .then((data) => {
      let dataTemp = [];
      // console.log(data)
      map(data, (datos, indexPrincipal) => {
        map(datos.productos, (producto, indexProductos) => {
          map(producto.ingredientes, (ingrediente, indexIngrediente) => {
            const { id, nombre, cantidad, um } = ingrediente;
            dataTemp.push({
              id: id,
              nombre: nombre,
              cantidad: cantidad,
              um: um,
              fecha: data[indexPrincipal].fecha,
            });
          });
        });
      });
      res.status(200).json(dataTemp);
    })
    .catch((error) => res.json({ message: error }));
});

// Listar solo los productos vendidos en el mes solicitado
router.get("/listarDetallesProductosVendidosMes", async (req, res) => {
  const { mes, año } = req.query;
  //console.log(dia)
  await ventas
    .find({ estado: "true", agrupar: mes, año: año })
    .sort({ _id: -1 })
    .then((data) => {
      let dataTemp = [];
      // console.log(data)
      map(data, (datos, indexPrincipal) => {
        map(datos.productos, (producto, index) => {
          const { nombre, precio } = producto;
          dataTemp.push({
            numeroTiquet: data[indexPrincipal].numeroTiquet,
            estado:
              data[indexPrincipal].estado === "true"
                ? "Venta completada"
                : "Venta cancelada",
            cliente: data[indexPrincipal].cliente
              ? data[indexPrincipal].cliente
              : "No especificado",
            nombre: nombre,
            precio: precio,
            tipoPago: !data[indexPrincipal].tipoPago
              ? "Pendiente"
              : data[indexPrincipal].tipoPago,
            tipoPedido: data[indexPrincipal].tipoPedido,
            hacerPedido: data[indexPrincipal].hacerPedido,
            tipoPago: data[indexPrincipal].tipoPago,
            totalVenta: data[indexPrincipal].total,
            fecha: data[indexPrincipal].fecha,
          });
        });
      });
      res.status(200).json(dataTemp);
    })
    .catch((error) => res.json({ message: error }));
});

// Listar solo los productos vendidos en el semana solicitada
router.get("/listarDetallesProductosVendidosSemana", async (req, res) => {
  const { semana, año } = req.query;
  //console.log(dia)
  await ventas
    .find({ estado: "true", semana: semana, año: año })
    .sort({ _id: -1 })
    .then((data) => {
      let dataTemp = [];
      // console.log(data)
      map(data, (datos, indexPrincipal) => {
        map(datos.productos, (producto, index) => {
          const { nombre, precio } = producto;
          dataTemp.push({
            numeroTiquet: data[indexPrincipal].numeroTiquet,
            estado:
              data[indexPrincipal].estado === "true"
                ? "Venta completada"
                : "Venta cancelada",
            cliente: data[indexPrincipal].cliente
              ? data[indexPrincipal].cliente
              : "No especificado",
            nombre: nombre,
            precio: precio,
            tipoPago: !data[indexPrincipal].tipoPago
              ? "Pendiente"
              : data[indexPrincipal].tipoPago,
            tipoPago: data[indexPrincipal].tipoPago,
            tipoPedido: data[indexPrincipal].tipoPedido,
            hacerPedido: data[indexPrincipal].hacerPedido,
            tipoPago: data[indexPrincipal].tipoPago,
            totalVenta: data[indexPrincipal].total,
          });
        });
      });
      res.status(200).json(dataTemp);
    })
    .catch((error) => res.json({ message: error }));
});

// Listar solo los productos vendidos en el mes solicitado
router.get("/listarProductosAdicionales", async (req, res) => {
  const { numeroTiquet } = req.query;
  //console.log(dia)
  await ventas
    .find({ estado: "true", numeroTiquet: numeroTiquet })
    .sort({ _id: -1 })
    .then((data) => {
      let dataTemp = [];
      // console.log(data)
      map(data, (datos, indexPrincipal) => {
        map(datos.productos, (producto, index) => {
          const { nombre, precio } = producto;
          dataTemp.push({
            numeroTiquet: data[indexPrincipal].numeroTiquet,
            estado:
              data[indexPrincipal].estado === "true"
                ? "Venta completada"
                : "Venta cancelada",
            cliente: data[indexPrincipal].cliente
              ? data[indexPrincipal].cliente
              : "No especificado",
            nombre: nombre,
            precio: precio,
            tipoPago: data[indexPrincipal].tipoPago,
            totalVenta: data[indexPrincipal].total,
            fecha: data[indexPrincipal].fecha,
          });
        });
      });
      res.status(200).json(dataTemp);
    })
    .catch((error) => res.json({ message: error }));
});

// Obtener una venta en especifico
/*router.get("/obtener", async (req, res) => {
    const { numeroTiquet } = req.query;

    await ventas
        .find({ numeroTiquet })
        //.sort({ fecha: -1 })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});*/
router.get("/obtener/:numeroTiquet", async (req, res) => {
  const { numeroTiquet } = req.params;
  await ventas
    .find({ numeroTiquet: numeroTiquet }) // Utiliza un objeto para especificar el filtro
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Obtener una venta en especifico
router.get("/obtenerVentaAsociada/:tiquetVenta", async (req, res) => {
  const { numeroTiquet } = req.params;
  await ventas
    .find({ numeroTiquet })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// OBTENER VENTAS CON ESTADO PP
router.get("/obtenerPedidosPendientes", async (req, res) => {
  try {
    const pedidosPendientes = await ventas
      .find({ estado: "PP" })
      .sort({ _id: -1 });
    res.status(200).json(pedidosPendientes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Borrar una venta
router.delete("/eliminar/:id", async (req, res) => {
  const { id } = req.params;
  await ventas
    .remove({ _id: id })
    .then((data) => res.status(200).json({ mensaje: "Venta eliminada" }))
    .catch((error) => res.json({ message: error }));
});

// Cambiar el estado de una venta
router.put("/cancelar/:id", async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  await ventas
    .updateOne({ _id: id }, { $set: { estado } })
    .then((data) =>
      res.status(200).json({ mensaje: "Estado de la venta actualizado" })
    )
    .catch((error) => res.json({ message: error }));
});

// Cambiar el estado de una venta
router.put("/cambiarIdentificador/:id", async (req, res) => {
  const { id } = req.params;
  const { atendido } = req.body;
  await ventas
    .updateOne({ _id: id }, { $set: { atendido } })
    .then((data) => res.status(200).json({ mensaje: "Venta atendida" }))
    .catch((error) => res.json({ message: error }));
});

// Obtener el numero de la venta actual
router.get("/obtenNoTiquet", async (req, res) => {
  const ventasTotales = await ventas.findOne().sort({ _id: -1 });
  // console.log(ventasTotales)
  if (ventasTotales.numeroTiquet !== undefined) {
    res.status(200).json({ noTiquet: ventasTotales.numeroTiquet });
  } else {
    res.status(200).json({ noTiquet: "0" });
  }
});

// Actualizar datos del producto
router.put("/actualizar/:id", async (req, res) => {
  const { id } = req.params;
  const {
    tipoPago,
    cambio,
    subtotal,
    total,
    pagado,
    iva,
    comision,
    productos,
    estado,
    metodosDePago,
  } = req.body;
  await ventas
    .updateOne(
      { _id: id },
      {
        $set: {
          tipoPago,
          cambio,
          subtotal,
          total,
          pagado,
          iva,
          comision,
          productos,
          estado,
          metodosDePago,
        },
      }
    )
    .then((data) =>
      res.status(200).json({ mensaje: "Datos del producto actualizados" })
    )
    .catch((error) => res.json({ message: error }));
});

router.put("/actualizarticket/:numeroTiquet", async (req, res) => {
  const { numeroTiquet } = req.params;
  const {
    tipo,
    tipoPago,
    efectivo,
    cambio,
    subtotal,
    total,
    pagado,
    iva,
    comision,
    productos,
  } = req.body;
  try {
    const updatedVenta = await ventas.findOneAndUpdate(
      { numeroTiquet: numeroTiquet },
      {
        $set: {
          tipo,
          tipoPago,
          efectivo,
          cambio,
          subtotal,
          total,
          pagado,
          iva,
          comision,
          productos,
        },
      },
      { new: true }
    );
    if (updatedVenta) {
      res.status(200).json({ mensaje: "Datos de la venta actualizados" });
    } else {
      res.status(404).json({ mensaje: "Venta no encontrada" });
    }
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar los datos de la venta",
      error: error.message,
    });
  }
});

// ACTUALIZAR SOLO LOS PRODUCTOS DEL TICKET
router.put("/actualizarticketprods/:numeroTiquet", async (req, res) => {
  const { numeroTiquet } = req.params;
  const { productos, subtotal, detalles } = req.body;
  try {
    const updatedVenta = await ventas.findOneAndUpdate(
      { numeroTiquet: numeroTiquet },
      {
        $set: { productos, subtotal, detalles },
      },
      { new: true }
    );
    if (updatedVenta) {
      res.status(200).json({ mensaje: "Datos de la venta actualizados" });
    } else {
      res.status(404).json({ mensaje: "Venta no encontrada" });
    }
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar los datos de la venta",
      error: error.message,
    });
  }
});

// ACTUALIZAR TICKET PARA REALIZAR COBRO
router.put("/cobrarTicket/:numeroTiquet", async (req, res) => {
  const { numeroTiquet } = req.params;
  const {
    cliente,
    tipo,
    mesa,
    usuario,
    estado,
    detalles,
    observaciones,
    tipoPago,
    hacerPedido,
    tipoPedido,
    tipoDescuento,
    descuento,
    pagado,
    total,
    iva,
    atendido,
    comision,
    año,
    mes,
    semana,
    fecha,
    metodosPago,
  } = req.body;
  try {
    const updatedVenta = await ventas.findOneAndUpdate(
      { numeroTiquet: numeroTiquet },
      {
        $set: {
          cliente,
          tipo,
          mesa,
          usuario,
          estado,
          detalles,
          observaciones,
          tipoPago,
          hacerPedido,
          tipoPedido,
          tipoDescuento,
          descuento,
          pagado,
          total,
          iva,
          atendido,
          comision,
          año,
          mes,
          semana,
          fecha,
          metodosPago,
        },
      },
      { new: true }
    );
    if (updatedVenta) {
      res.status(200).json({ mensaje: "Datos de la venta actualizados" });
    } else {
      res.status(404).json({ mensaje: "Venta no encontrada" });
    }
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar los datos de la venta",
      error: error.message,
    });
  }
});

router.get("/obtenerVentasenMesasConTicket", async (req, res) => {
  try {
    const resultado = await mesas.aggregate([
      {
        $match: {
          idTicket: { $ne: "" }, // Filtra los documentos donde idTicket no es vacío
        },
      },
      {
        $lookup: {
          from: "ventas",
          localField: "idTicket",
          foreignField: "numeroTiquet",
          as: "ventas_mesa",
        },
      },
      {
        $unwind: "$ventas_mesa",
      },
      {
        $match: {
          $expr: {
            $eq: ["$idTicket", "$ventas_mesa.numeroTiquet"],
          },
        },
      },
      {
        $project: {
          ventas_mesa: 1, // Proyecta el campo completo de ventas
        },
      },
    ]);

    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    console.error("Error al obtener ventas de mesas con ticket:", error);
    res
      .status(500)
      .json({ error: "Error al obtener ventas de mesas con ticket" });
  }
});

router.get("/ventasTotalesDelDia", async (req, res) => {
  try {
    // Obtener la fecha actual en la zona horaria de México
    const diaActual = moment.tz("America/Mexico_City").format("YYYY-MM-DD");

    const ventasDelDia = await ventas.find({
      estado: "COBR",
      fecha: {
        $gte: new Date(diaActual + "T00:00:00.000Z"), // Mayor o igual que el inicio del día
        $lte: new Date(diaActual + "T23:59:59.999Z"), // Menor o igual que el final del día
      },
    });

    res.status(200).json(ventasDelDia);
  } catch (error) {
    console.error("Error al obtener las ventas del día:", error);
    res.status(500).json({ error: "Error al obtener las ventas del día" });
  }
});

module.exports = router;
