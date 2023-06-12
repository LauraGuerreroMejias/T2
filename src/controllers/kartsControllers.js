import prisma from '../prismaClient.js'

const getKarts = async (req, res) => {
    if(Object.keys(req.query).length === 0){
        const karts = await prisma.karts.findMany()
        res.json(karts)
    }else{
        const { id, modelo, color, velocidad_maxima, id_personaje } = req.query

        if(id && isNaN(parseInt(id))){
            res.status(400).json({error: 'Param id must be a number'})
            return
        }

        if(velocidad_maxima){
            if(!velocidad_maxima.includes('-')){
                if(isNaN(parseInt(velocidad_maxima))){
                    res.status(400).json({error: 'Param velocidad_maxima must be a number or a number range (min-max)'})
                    return
                }
            }

            if(isNaN(parseInt(velocidad_maxima.split('-')[0])) || isNaN(parseInt(velocidad_maxima.split('-')[1]))){
                res.status(400).json({error: 'Param velocidad_maxima must be a valid number range (min-max)'})
                return
            }else{
                if(parseInt(velocidad_maxima.split('-')[0]) > parseInt(velocidad_maxima.split('-')[1])){
                    res.status(400).json({error: 'Param velocidad_maxima must be a valid number range (min-max)'})
                    return
                }
            }
        }

        if(id_personaje && isNaN(parseInt(id_personaje))){
            res.status(400).json({error: 'Param id_personaje must be a number'})
            return
        }

        const karts = await prisma.karts.findMany({
            where: {
                id: id ? parseInt(id) : undefined,
                modelo: modelo ? modelo : undefined,
                color: color ? color : undefined,
                velocidad_maxima: velocidad_maxima ? velocidad_maxima.includes('-') ? {
                    gte: parseInt(velocidad_maxima.split('-')[0]),
                    lte: parseInt(velocidad_maxima.split('-')[1])
                } : parseInt(velocidad_maxima) : undefined,
                id_personaje: id_personaje ? parseInt(id_personaje) : undefined
            }
        })
        res.json(karts)
    }
}

const insertKart = async (req, res) => {
    const { modelo, color, velocidad_maxima, id_personaje } = req.query

    if(!modelo){
        res.status(400).json({error: 'Param modelo is required'})
        return
    }else{
        if(modelo.length > 45){
            res.status(400).json({error: 'Param modelo must be less or equal than 30 characters'})
            return
        }
    }

    if(!color){
        res.status(400).json({error: 'Param color is required'})
        return
    }else{
        if(color.length > 45){
            res.status(400).json({error: 'Param color must be less or equal than 30 characters'})
            return
        }
    }

    if(velocidad_maxima && isNaN(parseInt(velocidad_maxima))){
        res.status(400).json({error: 'Param velocidad_maxima must be a number'})
        return
    }

    if(id_personaje && isNaN(parseInt(id_personaje))){
        res.status(400).json({error: 'Param id_personaje must be a number'})
        return
    }

    if(id_personaje){
        const personaje = await prisma.personajes.findUnique({
            where: {
                id: parseInt(id_personaje)
            }
        })
        if(!personaje){
            res.status(204).json({error: 'Param id_personaje must be a existing id'})
            return
        }
    }

    const kart = await prisma.karts.create({
        data: {
            modelo,
            color,
            velocidad_maxima: parseInt(velocidad_maxima),
            id_personaje: id_personaje ? parseInt(id_personaje) : undefined
        }
    })
    res.json(kart)
}

const updateKart = async (req, res) => {
    const { id, modelo, color, velocidad_maxima, id_personaje } = req.query

    if(!id){
        res.status(400).json({error: 'Param id is required'})
        return
    }

    if(modelo && modelo.length > 45){
        res.status(400).json({error: 'Param modelo must be less or equal than 30 characters'})
        return
    }

    if(color && color.length > 45){
        res.status(400).json({error: 'Param color must be less or equal than 30 characters'})
        return
    }

    if(velocidad_maxima && isNaN(parseInt(velocidad_maxima))){
        res.status(400).json({error: 'Param velocidad_maxima must be a number'})
        return
    }

    if(id_personaje && isNaN(parseInt(id_personaje))){
        res.status(400).json({error: 'Param id_personaje must be a number'})
        return
    }

    if(id_personaje){
        const personaje = await prisma.personajes.findUnique({
            where: {
                id: parseInt(id_personaje)
            }
        })
        if(!personaje){
            res.status(204).json({error: 'Param id_personaje must be a existing id'})
            return
        }
    }

    const prev_kart = await prisma.karts.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if(!prev_kart){
        res.status(204).json({error: 'Param id must be a existing id'})
        return
    }

    const kart = await prisma.karts.update({
        where: {
            id: parseInt(id)
        },
        data: {
            modelo: modelo ? modelo : prev_kart.modelo,
            color: color ? color : prev_kart.color,
            velocidad_maxima: velocidad_maxima ? parseInt(velocidad_maxima) : prev_kart.velocidad_maxima,
            id_personaje: id_personaje ? parseInt(id_personaje) : prev_kart.id_personaje
        }
    })
    res.status(200).json({message : 'Kart updated successfully', kart})
}

const deleteKart = async (req, res) => {
    const { id } = req.query

    if(!id){
        res.status(400).json({error: 'Param id is required'})
        return
    }

    if(isNaN(parseInt(id))){
        res.status(400).json({error: 'Param id must be a number'})
        return
    }

    const kartExists = await prisma.karts.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if(!kartExists){
        res.status(204).json({error: 'Kart not found'})
        return
    }

    const kart = await prisma.karts.delete({
        where: {
            id: parseInt(id)
        }
    })
    res.json({message: 'Kart deleted successfully', kart})
}

export { getKarts, insertKart, updateKart, deleteKart }