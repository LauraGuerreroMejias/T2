import { getPersonajes, insertPersonaje, updatePersonaje, deletePersonaje } from './personajeControllers.js'
import { getKarts, insertKart, updateKart, deleteKart } from './kartsControllers.js'
import { insertPersonajeTrabajo, updatePersonajeTrabajo, deletePersonajeTrabajo, getPersonajeTrabajo } from './personajeTrabajoControllers.js'
import { getTrabajos, insertTrabajo, updateTrabajo, deleteTrabajo } from './trabajosControllers.js'

const controllers = {
    getPersonajes,
    insertPersonaje,
    updatePersonaje,
    deletePersonaje,
    getKarts,
    insertKart,
    updateKart,
    deleteKart,
    insertPersonajeTrabajo,
    updatePersonajeTrabajo,
    deletePersonajeTrabajo,
    getPersonajeTrabajo,
    getTrabajos,
    insertTrabajo,
    updateTrabajo,
    deleteTrabajo
}

export default controllers