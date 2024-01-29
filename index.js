const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const server = express();
const port = 3000;
let ordenes = [];
let feedbacks = [];

server.use(express.static(path.join(__dirname, 'public')));
server.use(bodyParser.json());

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.get('/menu', (req, res) => {
  res.json({ menu: ['tres carnes', 'peperoni', 'vegetariana', 'hawaina'] });
});

server.post('/orden', (req, res) => {
  const nuevaorden = req.body;
  nuevaorden.id = ordenes.length + 1;
  ordenes.push(nuevaorden);
  console.log('Ordenes: ');
  console.log(ordenes);
  res.json({ mensaje: 'orden recibida', orden: nuevaorden });
});

server.get('/orden/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const orden = ordenes.find((orden) => orden.id === id);

  if (orden) {
    res.json({ mensaje: `Detalles de la orden ${id}`, orden });
  } else {
    res.status(404).json({ mensaje: 'Orden no encontrada' });
  }
});

server.put('/orden/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const datosActualizados = req.body;
  const ordenIndex = id - 1;

  if (ordenIndex !== -1) {
    ordenes[ordenIndex] = { ...ordenes[ordenIndex], ...datosActualizados };
    res.json({
      mensaje: `Orden ${id} actualizada`,
      datos: ordenes[ordenIndex],
    });
    console.log('Ordenes: ');
    console.log(ordenes);
  } else {
    res.status(404).json({ mensaje: 'Orden no encontrada' });
  }
});

server.delete('/orden/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const ordenIndex = id - 1;

  if (ordenIndex !== -1) {
    ordenes.splice(ordenIndex, 1);
    res.json({ mensaje: `Orden ${id} eliminada` });
    console.log('Ordenes: ');
    console.log(ordenes);
  } else {
    res.status(404).json({ mensaje: 'Orden no encontrada' });
  }
});

server.get('/promociones', (req, res) => {
  res.json({
    promociones: ['2x1 en Martes', 'Refresco gratis con pizza familiar'],
  });
});

server.post('/feedback', (req, res) => {
  const feedback = req.body;
  feedback.id = feedbacks.length + 1;
  feedbacks.push(feedback);
  console.log('Feedbacks: ');
  console.log(feedbacks);
  res.json({ mensaje: 'Feedback recibido', comentario: feedback });
});

server.listen(port, () => {
  console.log(
    `La API de la pizzeria esta ejecutandose en http://localhost:${3000}`
  );
});
