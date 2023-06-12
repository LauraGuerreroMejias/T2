import prisma from '../prismaClient.js'

const getPersonajeReino = async (req, res) => {
    if(Object.keys(req.query).length === 0){
        const personajeReino = await prisma.personaje_habita_reino.findMany()
        res.json(personajeReino)
    }else{
        
        const { id_personaje, id_reino, fecha_registro, es_gobernante } = req.query

        if(id_personaje && isNaN(parseInt(id_personaje))){
            res.status(400).json({error: 'Param id_personaje must be a number'})
            return
        }

        if(id_reino && isNaN(parseInt(id_reino))){
            res.status(400).json({error: 'Param id_reino must be a number'})
            return
        }

        if(fecha_registro){
            if(fecha_registro.includes('-')){
                if(isNaN(parseInt(fecha_registro.split('-')[0])) || isNaN(parseInt(fecha_registro.split('-')[1]))){
                    res.status(400).json({error: 'Param fecha_registro must be a valid number range (min-max)'})
                    return
                }else{
                    if(parseInt(fecha_registro.split('-')[0]) > parseInt(fecha_registro.split('-')[1])){
                        res.status(400).json({error: 'Param fecha_registro must be a valid number range (min-max)'})
                        return
                    }
                }
            }else{
                if(isNaN(parseInt(fecha_registro))){
                    res.status(400).json({error: 'Param fecha_registro must be a number'})
                    return
                }
            }
        }

        if(es_gobernante && isNaN(parseInt(es_gobernante))){
            res.status(400).json({error: 'Param es_gobernante must be a boolean'})
            return
        }

        const personajeReino = await prisma.personaje_habita_reino.findMany({
            where: {
                id_personaje: id_personaje ? parseInt(id_personaje) : undefined,
                id_reino: id_reino ? parseInt(id_reino) : undefined,
                fecha_registro: fecha_registro ? fecha_registro.includes('-') ? {
                    gte: parseInt(fecha_registro.split('-')[0]),
                    lte: parseInt(fecha_registro.split('-')[1])
                } : parseInt(fecha_registro) : undefined,
                es_gobernante: es_gobernante ? parseInt(es_gobernante) : undefined
            }
        })
        res.json(personajeReino)
    }
}

const insertPersonajeReino = async (req, res) => {

    const { id_personaje, id_reino, fecha_registro, es_gobernante } = req.query

    if(!id_personaje){
        res.status(400).json({error: 'Missing id_personaje parameter'})
        return
    }

    if(!id_reino){
        res.status(400).json({error: 'Missing id_reino parameter'})
        return
    }

    if(!fecha_registro){
        res.status(400).json({error: 'Missing fecha_registro parameter'})
        return
    }

    if(!es_gobernante){
        res.status(400).json({error: 'Missing es_gobernante parameter'})
        return
    }

    if(isNaN(parseInt(id_personaje))){
        res.status(400).json({error: 'Param id_personaje must be a number'})
        return
    }

    if(isNaN(parseInt(id_reino))){
        res.status(400).json({error: 'Param id_reino must be a number'})
        return
    }

    if(isNaN(parseInt(fecha_registro))){
        res.status(400).json({error: 'Param fecha_registro must be a number'})
        return
    }

    if(isNaN(parseInt(es_gobernante))){
        res.status(400).json({error: 'Param es_gobernante must be a boolean'})
        return
    }

    const personaje = await prisma.personaje.findUnique({
        where: {
            id: parseInt(id_personaje)
        }
    })

    if(!personaje){
        res.status(204).json({error: 'Personaje not found'})
        return
    }

    const reino = await prisma.reino.findUnique({
        where: {
            id: parseInt(id_reino)
        }
    })

    if(!reino){
        res.status(204).json({error: 'Reino not found'})
        return
    }

    const personajeReino = await prisma.personaje_habita_reino.create({
        data: {
            id_personaje: parseInt(id_personaje),
            id_reino: parseInt(id_reino),
            fecha_registro: parseInt(fecha_registro),
            es_gobernante: parseInt(es_gobernante)
        }
    })

    res.status(201).json({msg: 'PersonajeReino created successfully', personajeReino})
}

const updatePersonajeReino = async (req, res) => {

    const { id_personaje, id_reino, fecha_registro, es_gobernante } = req.query

    if(!id_personaje){
        res.status(400).json({error: 'Missing id_personaje parameter'})
        return
    }

    if(!id_reino){
        res.status(400).json({error: 'Missing id_reino parameter'})
        return
    }

    if(isNaN(parseInt(id_personaje))){
        res.status(400).json({error: 'Param id_personaje must be a number'})
        return
    }

    if(isNaN(parseInt(id_reino))){
        res.status(400).json({error: 'Param id_reino must be a number'})
        return
    }

    if(fecha_registro && isNaN(Date.parse(fecha_registro))){
        res.status(400).json({error: 'Param fecha_registro must be a valid date'})
        return
    }

    if(es_gobernante && isNaN(parseInt(es_gobernante))){
        res.status(400).json({error: 'Param es_gobernante must be a boolean'})
        return
    }

    const prev_personajeReino = await prisma.personaje_habita_reino.findUnique({
        where: {
            id_personaje: parseInt(id_personaje),
            id_reino: parseInt(id_reino)
        }
    })

    if(!prev_personajeReino){
        res.status(204).json({error: 'personaje_habita_reino not found'})
        return
    }

    const personajeReino = await prisma.personaje_habita_reino.update({
        where: {
            id_personaje: parseInt(id_personaje),
            id_reino: parseInt(id_reino)
        },
        data: {
            fecha_registro: fecha_registro ? parseInt(fecha_registro) : prev_personajeReino.fecha_registro,
            es_gobernante: es_gobernante ? parseInt(es_gobernante) : prev_personajeReino.es_gobernante
        }
    })

    res.json({msg: 'personaje_habita_reino updated successfully', personajeReino})

}

const deletePersonajeReino = async (req, res) => {
    const { id_personaje, id_reino } = req.query

    if(!id_personaje){
        res.status(400).json({error: 'Missing id_personaje parameter'})
        return
    }

    if(!id_reino){
        res.status(400).json({error: 'Missing id_reino parameter'})
        return
    }

    if(isNaN(parseInt(id_personaje))){
        res.status(400).json({error: 'Param id_personaje must be a number'})
        return
    }

    if(isNaN(parseInt(id_reino))){
        res.status(400).json({error: 'Param id_reino must be a number'})
        return
    }

    const existing_personajeReino = await prisma.personaje_habita_reino.findUnique({
        where: {
            id_personaje: parseInt(id_personaje),
            id_reino: parseInt(id_reino)
        }
    })

    if(!existing_personajeReino){
        res.status(204).json({error: 'personaje_habita_reino not found'})
        return
    }

    const personajeReino = await prisma.personaje_habita_reino.delete({
        where: {
            id_personaje: parseInt(id_personaje),
            id_reino: parseInt(id_reino)
        }
    })

    res.json({msg: 'personaje_habita_reino deleted successfully', personajeReino})
}

export { getPersonajeReino, insertPersonajeReino, updatePersonajeReino, deletePersonajeReino }