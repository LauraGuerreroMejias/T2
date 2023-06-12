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
app.get('/api/personaje_habita_reino', UsersController.getPersonajeReino);
app.post('/api/personaje_habita_reino', UsersController.insertPersonajeReino);
app.put('/api/personaje_habita_reino', UsersController.updatePersonajeReino);
app.delete('/api/personaje_habita_reino', UsersController.deletePersonajeReino);
//======================Reinos===============================//
app.get('/api/reinos', UsersController.getReinos);
app.post('/api/reinos', UsersController.insertReino);
app.put('/api/reinos', UsersController.updateReino);
app.delete('/api/reinos', UsersController.deleteReino);
//======================Defensas===============================//
app.get('/api/defensas', UsersController.getDefensas);
app.post('/api/defensas', UsersController.insertDefensa);
app.put('/api/defensas', UsersController.updateDefensa);
app.delete('/api/defensas', UsersController.deleteDefensa);
//======================Dimplomacias===============================//
app.get('/api/diplomacias', UsersController.getDiplomacias);
app.post('/api/diplomacias', UsersController.insertDiplomacia);
app.put('/api/diplomacias', UsersController.updateDiplomacia);
app.delete('/api/diplomacias', UsersController.deleteDiplomacia);
//======================Reino_tiene_defensa===============================//
app.get('/api/reino_tiene_defensa', UsersController.getReinoDefensas);
app.post('/api/reino_tiene_defensa', UsersController.insertReinoDefensa);
app.put('/api/reino_tiene_defensa', UsersController.updateReinoDefensa);
app.delete('/api/reino_tiene_defensa', UsersController.deleteReinoDefensa);
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