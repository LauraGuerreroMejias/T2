import prisma from '../prismaClient.js'

const getPersonajeTrabajo = async (req, res) => {

    if(Object.keys(req.query).length === 0){
        const personajeTrabajo = await prisma.personaje_trabajo.findMany()
        res.json(personajeTrabajo)
        return
    }

    const { id_trabajo, id_personaje, fecha_inicio, fecha_termino } = req.query

    if(id_trabajo && isNaN(parseInt(id_trabajo))){
        res.status(400).json({error: 'Param id_trabajo must be a number'})
        return
    }

    if(id_personaje && isNaN(parseInt(id_personaje))){
        res.status(400).json({error: 'Param id_personaje must be a number'})
        return
    }

    if(fecha_inicio){

        if(fecha_inicio.contains('-') && fecha_inicio.split('-').length === 2){
            const fecha_inicio_min = fecha_inicio.split('-')[0]
            const fecha_inicio_max = fecha_inicio.split('-')[1]

            if(isNaN(Date.parse(fecha_inicio_min)) || isNaN(Date.parse(fecha_inicio_max))){
                res.status(400).json({error: 'Param fecha_inicio must be a valid date range (YYYY/MM/DD-YYYY/MM/DD)'})
                return
            }

        }

        if(!fecha_inicio.contains('-')){
            if(isNaN(Date.parse(fecha_inicio))){
                res.status(400).json({error: 'Param fecha_inicio must be a valid date'})
                return
            }
        }

    }

    if(fecha_termino){
            
            if(fecha_termino.contains('-') && fecha_termino.split('-').length === 2){
                const fecha_termino_min = fecha_termino.split('-')[0]
                const fecha_termino_max = fecha_termino.split('-')[1]
    
                if(isNaN(Date.parse(fecha_termino_min)) || isNaN(Date.parse(fecha_termino_max))){
                    res.status(400).json({error: 'Param fecha_termino must be a valid date range (YYYY/MM/DD-YYYY/MM/DD)'})
                    return
                }
    
            }
    
            if(!fecha_termino.contains('-')){
                if(isNaN(Date.parse(fecha_termino))){
                    res.status(400).json({error: 'Param fecha_termino must be a valid date'})
                    return
                }
            }
    }

    const personajeTrabajo = await prisma.personaje_tiene_trabajo.findMany({
        where: {
            id_trabajo: id_trabajo ? parseInt(id_trabajo) : undefined,
            id_personaje: id_personaje ? parseInt(id_personaje) : undefined,
            fecha_inicio: fecha_inicio ? fecha_inicio.contains('-') ? {
                gte: new Date(fecha_inicio.split('-')[0]),
                lte: new Date(fecha_inicio.split('-')[1])
            } : new Date(fecha_inicio) : undefined,
            fecha_termino: fecha_termino ? fecha_termino.contains('-') ? {
                gte: new Date(fecha_termino.split('-')[0]),
                lte: new Date(fecha_termino.split('-')[1])
            } : new Date(fecha_termino) : undefined
        }
    })
    res.json(personajeTrabajo)
}

const insertPersonajeTrabajo = async (req, res) => {
    const {id_trabajo, id_personaje, fecha_inicio, fecha_termino} = req.query

    if(!id_trabajo){
        res.status(400).json({error: 'Param id_trabajo is required'})
        return
    }

    if(!id_personaje){
        res.status(400).json({error: 'Param id_personaje is required'})
        return
    }

    if(!fecha_inicio){
        res.status(400).json({error: 'Param fecha_inicio is required'})
        return
    }

    if(isNaN(parseInt(id_trabajo))){
        res.status(400).json({error: 'Param id_trabajo must be a number'})
        return
    }

    if(isNaN(parseInt(id_personaje))){
        res.status(400).json({error: 'Param id_personaje must be a number'})
        return
    }

    if(isNaN(Date.parse(fecha_inicio))){
        res.status(400).json({error: 'Param fecha_inicio must be a valid date'})
        return
    }

    if(fecha_termino && isNaN(Date.parse(fecha_termino))){
        res.status(400).json({error: 'Param fecha_termino must be a valid date'})
        return
    }

    const personaje = await prisma.personaje.findUnique({
        where: {
            id_personaje: parseInt(id_personaje)
        }
    })

    if(!personaje){
        res.status(204).json({error: 'Personaje not found'})
        return
    }

    const trabajo = await prisma.trabajo.findUnique({
        where: {
            id_trabajo: parseInt(id_trabajo)
        }
    })

    if(!trabajo){
        res.status(204).json({error: 'Trabajo not found'})
        return
    }

    const personajeTrabajo = await prisma.personaje_tiene_trabajo.create({
        data: {
            id_trabajo: parseInt(id_trabajo),
            id_personaje: parseInt(id_personaje),
            fecha_inicio: new Date(fecha_inicio),
            fecha_termino: fecha_termino ? new Date(fecha_termino) : undefined
        }
    })

    res.json({message : 'personaje_tiene_trabajo created successfully', data: personajeTrabajo})
}

const updatePersonajeTrabajo = async (req, res) => {
    const {id_trabajo, id_personaje, fecha_inicio, fecha_termino} = req.query

    if(!id_trabajo){
        res.status(400).json({error: 'Param id_trabajo is required'})
        return
    }

    if(!id_personaje){
        res.status(400).json({error: 'Param id_personaje is required'})
        return
    }

    if(!fecha_inicio){
        res.status(400).json({error: 'Param fecha_inicio is required'})
        return
    }

    if(isNaN(parseInt(id_trabajo))){
        res.status(400).json({error: 'Param id_trabajo must be a number'})
        return
    }

    if(isNaN(parseInt(id_personaje))){
        res.status(400).json({error: 'Param id_personaje must be a number'})
        return
    }

    if(isNaN(Date.parse(fecha_inicio))){
        res.status(400).json({error: 'Param fecha_inicio must be a valid date'})
        return
    }

    if(fecha_termino && isNaN(Date.parse(fecha_termino))){
        res.status(400).json({error: 'Param fecha_termino must be a valid date'})
        return
    }

    const personaje = await prisma.personaje.findUnique({
        where: {
            id_personaje: parseInt(id_personaje)
        }
    })

    if(!personaje){
        res.status(204).json({error: 'Personaje not found'})
        return
    }

    const trabajo = await prisma.trabajo.findUnique({
        where: {
            id_trabajo: parseInt(id_trabajo)
        }
    })

    if(!trabajo){
        res.status(204).json({error: 'Trabajo not found'})
        return
    }

    const prev_personajeTrabajo = await prisma.personaje_tiene_trabajo.findUnique({
        where: {
            id_trabajo: parseInt(id_trabajo),
            id_personaje: parseInt(id_personaje)
        }
    })

    if(!prev_personajeTrabajo){
        res.status(204).json({error: 'Personaje and Trabajo does not match together'})
        return
    }

    const personajeTrabajo = await prisma.personaje_tiene_trabajo.update({
        where: {
            id_trabajo: parseInt(id_trabajo),
            id_personaje: parseInt(id_personaje)
        },
        data: {
            fecha_inicio: fecha_inicio ? new Date(fecha_inicio) : prev_personajeTrabajo.fecha_inicio,
            fecha_termino: fecha_termino ? new Date(fecha_termino) : prev_personajeTrabajo.fecha_termino
        }
    })

    res.json({message : 'personaje_tiene_trabajo updated successfully', data: personajeTrabajo})
}

const deletePersonajeTrabajo = async (req, res) => {
    const {id_trabajo, id_personaje} = req.query

    if(!id_trabajo){
        res.status(400).json({error: 'Param id_trabajo is required'})
        return
    }

    if(!id_personaje){
        res.status(400).json({error: 'Param id_personaje is required'})
        return
    }

    if(isNaN(parseInt(id_trabajo))){
        res.status(400).json({error: 'Param id_trabajo must be a number'})
        return
    }

    if(isNaN(parseInt(id_personaje))){
        res.status(400).json({error: 'Param id_personaje must be a number'})
        return
    }

    const personaje = await prisma.personaje.findUnique({
        where: {
            id_personaje: parseInt(id_personaje)
        }
    })

    if(!personaje){
        res.status(204).json({error: 'Personaje not found'})
        return
    }

    const trabajo = await prisma.trabajo.findUnique({
        where: {
            id_trabajo: parseInt(id_trabajo)
        }
    })

    if(!trabajo){
        res.status(204).json({error: 'Trabajo not found'})
        return
    }

    const personajeTrabajo = await prisma.personaje_tiene_trabajo.delete({
        where: {
            id_trabajo: parseInt(id_trabajo),
            id_personaje: parseInt(id_personaje)
        }
    })

    res.json({message : 'personaje_tiene_trabajo deleted successfully', data: personajeTrabajo})
}

export { insertPersonajeTrabajo, updatePersonajeTrabajo, deletePersonajeTrabajo, getPersonajeTrabajo }