import { getPersonajes, insertPersonaje, updatePersonaje, deletePersonaje } from './personajeControllers.js'
import { getKarts, insertKart, updateKart, deleteKart } from './kartsControllers.js'
import { insertPersonajeTrabajo, updatePersonajeTrabajo, deletePersonajeTrabajo, getPersonajeTrabajo } from './personajeTrabajoControllers.js'
import { getTrabajos, insertTrabajo, updateTrabajo, deleteTrabajo } from './trabajosControllers.js'
import { getReinos, insertReino, updateReino, deleteReino } from './reinosControllers.js'
import { getPersonajeReino, insertPersonajeReino, updatePersonajeReino, deletePersonajeReino } from './personajeReinoControllers.js'
import { getDiplomacias, insertDiplomacia, updateDiplomacia, deleteDiplomacia } from './diplomaciasControllers.js'
import { getDefensas, insertDefensa, updateDefensa, deleteDefensa } from './defensasControllers.js'
import { getReinoDefensas, insertReinoDefensa, updateReinoDefensa, deleteReinoDefensa } from './reinoDefensasControllers.js'
import { top_5_personajes_con_mas_fuerza, personaje_con_mas_karts, cantidad_habitantes, gobernante } from './endpointsControllers.js'

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
    deleteTrabajo,
    getReinos,
    insertReino,
    updateReino,
    deleteReino,
    getPersonajeReino,
    insertPersonajeReino,
    updatePersonajeReino,
    deletePersonajeReino,
    getDiplomacias,
    insertDiplomacia,
    updateDiplomacia,
    deleteDiplomacia,
    getDefensas,
    insertDefensa,
    updateDefensa,
    deleteDefensa,
    getReinoDefensas,
    insertReinoDefensa,
    updateReinoDefensa,
    deleteReinoDefensa,
    top_5_personajes_con_mas_fuerza,
    personaje_con_mas_karts,
    cantidad_habitantes,
    gobernante
}

export default controllers