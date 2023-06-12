import prisma from '../prismaClient.js'

const getPersonajes = async (req, res) => {
    if (Object.keys(req.query).length === 0) {
        const personajes = await prisma.personajes.findMany()
        res.json(personajes)
    }else{
        const { id, nombre, fuerza, fecha_nacimiento, objeto } = req.query

        if(id){
            if(isNaN(parseInt(id))){
                res.status(400).json({error: 'Param id must be a number'})
                return
            }
        }

        if(nombre){
            if(nombre.length > 45){
                res.status(400).json({error: 'Param nombre must be less or equal than 45 characters'})
                return
            }
        }

        if(fuerza){

            if(fuerza.includes('-')){
                if(isNaN(parseInt(fuerza.split('-')[0])) || isNaN(parseInt(fuerza.split('-')[1]))){
                    res.status(400).json({error: 'Param fuerza must be a valid number range (min-max)'})
                    return
                }else{
                    if(parseInt(fuerza.split('-')[0]) > parseInt(fuerza.split('-')[1])){
                        res.status(400).json({error: 'Param fuerza must be a valid number range (min-max)'})
                        return
                    }
                }
            }else{
                if(isNaN(parseInt(fuerza))){
                    res.status(400).json({error: 'Param fuerza must be a number'})
                    return
                }
            }
            
        }

        if(fecha_nacimiento){
            if(fecha_nacimiento.split("-").length !== 2){
                res.status(400).json({error: 'Param fecha_nacimiento must be a valid date range (YYYY/MM/DD-YYYY/MM/DD)'})
                return
            }

            if(isNaN(Date.parse(fecha_nacimiento.split('-')[0])) || isNaN(Date.parse(fecha_nacimiento.split('-')[1]))){
                res.status(400).json({error: 'Param fecha_nacimiento must be a valid date range (YYYY/MM/DD-YYYY/MM/DD)'})
                return
            }else{
                if(Date.parse(fecha_nacimiento.split('-')[0]) > Date.parse(fecha_nacimiento.split('-')[1])){
                    res.status(400).json({error: 'Param fecha_nacimiento must be a valid date range (YYYY/MM/DD-YYYY/MM/DD)'})
                    return
                }
            }
        }

        if(objeto){
            if(objeto.length > 30){
                res.status(400).json({error: 'Param objeto must be less or equal than 30 characters'})
                return
            }
        }

        const personajes = await prisma.personajes.findMany({
            where: {
                id: id ? parseInt(id) : undefined,
                nombre: nombre ? nombre : undefined,
                fuerza: fuerza ? fuerza.includes('-') ? {
                    gte: parseInt(fuerza.split('-')[0]),
                    lte: parseInt(fuerza.split('-')[1])
                } : parseInt(fuerza) : undefined,
                fecha_nacimiento: fecha_nacimiento ? {
                    gte: new Date(fecha_nacimiento.split('-')[0]),
                    lte: new Date(fecha_nacimiento.split('-')[1])
                } : undefined,
                objeto: objeto ? objeto : undefined
            }
        })
        res.json(personajes)
    }
}

const insertPersonaje = async (req, res) => {
    const { nombre, fuerza, fecha_nacimiento, objeto } = req.query

    if(!nombre || !fuerza || !fecha_nacimiento){
        res.status(400).json({error: 'Params nombre, fuerza and fecha_nacimiento are required'})
        return
    }

    if(isNaN(parseInt(fuerza))){
        res.status(400).json({error: 'Param fuerza must be a number'})
        return
    }

    if(isNaN(Date.parse(fecha_nacimiento))){
        res.status(400).json({error: 'Param fecha_nacimiento must be a valid date'})
        return
    }

    if(nombre.length > 45){
        res.status(400).json({error: 'Param nombre must be less or equal than 45 characters'})
        return
    }

    if(objeto){
         if(objeto.length > 30){
            res.status(400).json({error: 'Param objeto must be less or equal than 30 characters'})
            return
         } 
    }

    const personaje = await prisma.personajes.create({
        data: {
            nombre,
            fuerza: parseInt(fuerza),
            fecha_nacimiento: new Date(fecha_nacimiento),
            objeto
        }
    })
    res.status(201).json({message: 'Created successfully', personaje})
}

const updatePersonaje = async (req, res) => {
    const {id, nombre, fuerza, fecha_nacimiento, objeto } = req.query

    if(!id){
        res.status(400).json({error: 'Param id is required'})
        return
    }

    if(isNaN(parseInt(id))){
        res.status(400).json({error: 'Param id must be a number'})
        return
    }

    const personajeExists = await prisma.personajes.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if(!personajeExists){
        res.status(204).json({error: 'The id provided does not exist'})
        return
    }

    if(nombre){
        if(nombre.length > 45){
            res.status(400).json({error: 'Param nombre must be less or equal than 45 characters'})
            return
        }
    }

    if(fuerza){
        if(isNaN(parseInt(fuerza))){
            res.status(400).json({error: 'Param fuerza must be a number'})
            return
        }
    }

    if(fecha_nacimiento){
        if(isNaN(Date.parse(fecha_nacimiento))){
            res.status(400).json({error: 'Param fecha_nacimiento must be a valid date'})
            return
        }
    }

    if(objeto){
        if(objeto.length > 30){
            res.status(400).json({error: 'Param objeto must be less or equal than 30 characters'})
            return
        }
    }

    const personaje = await prisma.personajes.update({
        where: {
            id: parseInt(id)
        },
        data: {
            nombre: nombre ? nombre : personajeExists.nombre,
            fuerza: fuerza ? parseInt(fuerza) : personajeExists.fuerza,
            fecha_nacimiento: fecha_nacimiento ? new Date(fecha_nacimiento) : personajeExists.fecha_nacimiento,
            objeto: objeto ? objeto : personajeExists.objeto
        }
    })
    res.json({message: 'Updated successfully', personaje})
}

const deletePersonaje = async (req, res) => {
    const { id } = req.query

    if(!id){
        res.status(400).json({error: 'Param id is required'})
        return
    }

    if(isNaN(parseInt(id))){
        res.status(400).json({error: 'Param id must be a number'})
        return
    }

    const personajeExists = await prisma.personajes.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if(!personajeExists){
        res.status(204).json({error: 'The id provided does not exist'})
        return
    }

    const personaje = await prisma.personajes.delete({
        where: {
            id: parseInt(id)
        }
    })
    res.json({message: 'Deleted successfully', personaje})
}

export { getPersonajes, insertPersonaje, updatePersonaje, deletePersonaje}