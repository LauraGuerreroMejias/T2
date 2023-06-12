import prisma from '../prismaClient.js'

const getReinos = async (req, res) => {
    if(Object.keys(req.query).length === 0){
        const reinos = await prisma.reinos.findMany()
        res.json(reinos)
    }else{
        const { nombre, ubicacion, superficie } = req.query

        if(nombre && nombre.length > 45){
            res.status(400).json({error: 'Param nombre must be less or equal than 45 characters'})
            return
        }

        if(ubicacion && ubicacion.length > 45){
            res.status(400).json({error: 'Param ubicacion must be less or equal than 45 characters'})
            return
        }

        if(superficie){
            if(superficie.includes('-')){
                if(isNaN(parseInt(superficie.split('-')[0])) || isNaN(parseInt(superficie.split('-')[1]))){
                    res.status(400).json({error: 'Param superficie must be a valid number range (min-max)'})
                    return
                }else{
                    if(parseInt(superficie.split('-')[0]) > parseInt(superficie.split('-')[1])){
                        res.status(400).json({error: 'Param superficie must be a valid number range (min-max)'})
                        return
                    }
                }
            }else{
                if(isNaN(parseInt(superficie))){
                    res.status(400).json({error: 'Param superficie must be a number'})
                    return
                }
            }
        }

        const reinos = await prisma.reinos.findMany({
            where: {
                nombre: nombre? nombre : undefined,
                ubicacion: ubicacion ? ubicacion : undefined,
                superficie: superficie ? superficie.includes('-') ? {
                    gte: parseInt(superficie.split('-')[0]),
                    lte: parseInt(superficie.split('-')[1])
                } : parseInt(superficie) : undefined
            }
        })

        res.json(reinos)
    }
}

const insertReino = async (req, res) => {
    const { nombre, ubicacion, superficie } = req.query

    if(!nombre){
        res.status(400).json({error: 'Missing nombre parameter'})
        return
    }

    if(!ubicacion){
        res.status(400).json({error: 'Missing ubicacion parameter'})
        return
    }

    if(!superficie){
        res.status(400).json({error: 'Missing superficie parameter'})
        return
    }

    if(nombre.length > 45){
        res.status(400).json({error: 'Param nombre must be less or equal than 45 characters'})
        return
    }

    if(ubicacion.length > 45){
        res.status(400).json({error: 'Param ubicacion must be less or equal than 45 characters'})
        return
    }

    if(isNaN(parseInt(superficie))){
        res.status(400).json({error: 'Param superficie must be a number'})
        return
    }

    const reino = await prisma.reinos.create({
        data: {
            nombre: nombre,
            ubicacion: ubicacion,
            superficie: parseInt(superficie)
        }
    })

    res.json({message: 'Reino created successfully', reino: reino})
}

const updateReino = async (req, res) => {
    const { id, nombre, ubicacion, superficie } = req.query

    if(!id){
        res.status(400).json({error: 'Missing id parameter'})
        return
    }

    if(nombre && nombre.length > 45){
        res.status(400).json({error: 'Param nombre must be less or equal than 45 characters'})
        return
    }

    if(ubicacion && ubicacion.length > 45){
        res.status(400).json({error: 'Param ubicacion must be less or equal than 45 characters'})
        return
    }

    if(superficie && isNaN(parseInt(superficie))){
        res.status(400).json({error: 'Param superficie must be a number'})
        return
    }

    const prev_reino = await prisma.reinos.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if(!prev_reino){
        res.status(204).json({error: 'Reino not found'})
        return
    }

    const reino = await prisma.reinos.update({
        where: {
            id: parseInt(id)
        },
        data: {
            nombre: nombre ? nombre : prev_reino.nombre,
            ubicacion: ubicacion ? ubicacion : prev_reino.ubicacion,
            superficie: superficie ? parseInt(superficie) : prev_reino.superficie
        }
    })

    res.json({message: 'Reino updated successfully', reino: reino})
}

const deleteReino = async (req, res) => {
    const { id } = req.query

    if(!id){
        res.status(400).json({error: 'Missing id parameter'})
        return
    }

    const reino_exists = await prisma.reinos.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if(!reino_exists){
        res.status(204).json({error: 'Reino not found'})
        return
    }

    const reino = await prisma.reinos.delete({
        where: {
            id: parseInt(id)
        }
    })

    res.json({message: 'Reino deleted successfully', reino: reino})
}