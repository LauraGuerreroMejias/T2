import express from 'express';
import UsersController from './controllers/UsersController.js';
import morgan from 'morgan';

const ENV = process.env;
const app = express();

//middleware
app.use(express.json());
app.use(morgan('dev'));

//endpoints(Routes)

//======================Personajes===============================//
app.get('/api/personajes', UsersController.getPersonajes);
app.post('/api/personajes', UsersController.insertPersonaje);
app.put('/api/personajes', UsersController.updatePersonaje);
app.delete('/api/personajes', UsersController.deletePersonaje);
//======================Karts===============================//
app.get('/api/karts', UsersController.getKarts);
app.post('/api/karts', UsersController.insertKart);
app.put('/api/karts', UsersController.updateKart);
app.delete('/api/karts', UsersController.deleteKart);
//======================Personaje_tiene_trabajo===============================//
app.get('/api/personaje_tiene_trabajo', UsersController.getPersonajeTrabajo);
app.post('/api/personaje_tiene_trabajo', UsersController.insertPersonajeTrabajo);
app.put('/api/personaje_tiene_trabajo', UsersController.updatePersonajeTrabajo);
app.delete('/api/personaje_tiene_trabajo', UsersController.deletePersonajeTrabajo);
//======================Trabajos===============================//
app.get('/api/trabajos', UsersController.getTrabajos);
app.post('/api/trabajos', UsersController.insertTrabajo);
app.put('/api/trabajos', UsersController.updateTrabajo);
app.delete('/api/trabajos', UsersController.deleteTrabajo);
//======================Personaje_habita_reino===============================//
//======================Reinos===============================//
//======================Defensas===============================//
//======================Dimplomacias===============================//
//======================Reino_tiene_defensa===============================//
//==========================================================//
app.get('/', (req, res) => {
    res.json({ message: 'Hello World!!' });
})
//==========================================================//


// 404 not found route
app.use((_, res) => {
    res.status(404).json({ message: 'Not found!' });
})


//Init server
app.listen(ENV.API_PORT, () => {
    console.log(`Server running on port ${ENV.API_PORT}`);
})