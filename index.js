const express = require('express');
const bodyParser = require('body-parser');

const server = express();
const port = 3000;

server.use(bodyParser.jason());

server.get('/menu', (req, res) => {

    res.json({menu:['tres carnes', 'peperoni', 'vegetariana', 'hawaina']});

});

server.post('/orden', (req, res) => {

    const nuevaorden = req.body;
    res.json({mensaje: 'orden recibida', orden: nuevaorden});
});

server.get('/orden/:id', (req, res) => {
    const orderId = req.params.id;
    res.jason({mensaje: 'Detalles de la orden ${orderId}'});
});

server.put('/orden/:Id', (req, res) =>{
    const orderId = req.params.id;
    const datosActualizados = req.body;
    res.jason({mensaje: 'Orden ${orderID} actualizada', datos: datosActualizados});
});

server.delete('/orden/:id',(req,res)=>{
    const ordenId = req.params.id;
    res.json({ mensaje: 'Orden ${orderId} eliminada'});
});

server.get('/promociones', (req,res)=>{
    res.json({promociones: ['2x1 en Martes', 'Refresco gratis con pizza familiar']});
});

server.post('/feedback', (req,res)=> {
    const feedback = req.body;
    res.jason({mensaje: 'Feedback recibido', comentario: feedback });
});

server.listen(port, ()=>{
    console.log('La API de la pizzeria esta ejecutandose en httpL://localhost:${3000}');
});

