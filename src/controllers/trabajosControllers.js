import prisma from '../prismaClient.js'

const getTrabajos = async (req, res) => {
    if(Object.keys(req.query).length === 0){
        const trabajos = await prisma.trabajos.findMany()
        res.json(trabajos)
    }else{
        const { id, descripcion, sueldo} = req.query

        if(id && isNaN(parseInt(id))){
            res.status(400).json({error: 'Param id must be a number'})
            return
        }

        if(descripcion && descripcion.length > 45){
            res.status(400).json({error: 'Param descripcion must be a string with less than 45 characters'})
            return
        }

        if(sueldo){
            if(sueldo.includes('-')){
                if(isNaN(parseInt(sueldo.split('-')[0])) || isNaN(parseInt(sueldo.split('-')[1]))){
                    res.status(400).json({error: 'Param sueldo must be a valid number range (min-max)'})
                    return
                }else{
                    if(parseInt(sueldo.split('-')[0]) > parseInt(sueldo.split('-')[1])){
                        res.status(400).json({error: 'Param sueldo must be a valid number range (min-max)'})
                        return
                    }
                }
            }else{
                if(isNaN(parseInt(sueldo))){
                    res.status(400).json({error: 'Param sueldo must be a number'})
                    return
                }
            }
        }

        const trabajos = await prisma.trabajos.findMany({
            where: {
                id: id ? parseInt(id) : undefined,
                descripcion: descripcion ? descripcion : undefined,
                sueldo: sueldo ? sueldo.includes('-') ? {
                    gte: parseInt(sueldo.split('-')[0]),
                    lte: parseInt(sueldo.split('-')[1])
                } : parseInt(sueldo) : undefined
            }
        })

        res.json(trabajos)
    }
}

const insertTrabajo = async (req, res) => {
    const { descripcion, sueldo } = req.body

    if(!sueldo){
        res.status(400).json({error: 'Missing sueldo parameter'})
        return
    }

    if(descripcion && descripcion.length > 45){
        res.status(400).json({error: 'Param descripcion must be a string with less than 45 characters'})
        return
    }

    if(isNaN(parseInt(sueldo))){
        res.status(400).json({error: 'Param sueldo must be a number'})
        return
    }

    const trabajo = await prisma.trabajos.create({
        data: {
            descripcion: descripcion ? descripcion : null,
            sueldo: parseInt(sueldo)
        }
    })

    res.status(201).json({message: 'Trabajo created successfully', trabajo})
}

const updateTrabajo = async (req, res) => {
    const { id } = req.params
    const { descripcion, sueldo } = req.body

    if(!id){
        res.status(400).json({error: 'Missing id parameter'})
        return
    }

    if(isNaN(parseInt(id))){
        res.status(400).json({error: 'Param id must be a number'})
        return
    }

    if(descripcion && descripcion.length > 45){
        res.status(400).json({error: 'Param descripcion must be a string with less than 45 characters'})
        return
    }

    if(sueldo && isNaN(parseInt(sueldo))){
        res.status(400).json({error: 'Param sueldo must be a number'})
        return
    }

    const prev_trabajo = await prisma.trabajos.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if(!prev_trabajo){
        res.status(204).json({error: 'Trabajo not found'})
        return
    }

    const trabajo = await prisma.trabajos.update({
        where: {
            id: parseInt(id)
        },
        data: {
            descripcion: descripcion ? descripcion : prev_trabajo.descripcion,
            sueldo: sueldo ? parseInt(sueldo) : prev_trabajo.sueldo
        }
    })

    res.json({message: 'Trabajo updated successfully', trabajo})
}

const deleteTrabajo = async (req, res) => {
    const { id } = req.params

    if(!id){
        res.status(400).json({error: 'Missing id parameter'})
        return
    }

    if(isNaN(parseInt(id))){
        res.status(400).json({error: 'Param id must be a number'})
        return
    }

    const trabajos = await prisma.trabajos.findMany({
        where: {
            id: parseInt(id)
        }
    })

    if(trabajos.length === 0){
        res.status(204).json({error: 'Trabajo not found'})
        return
    }

    const trabajo = await prisma.trabajos.delete({
        where: {
            id: parseInt(id)
        }
    })

    res.json({message: 'Trabajo deleted successfully', trabajo})
}

export { getTrabajos, insertTrabajo, updateTrabajo, deleteTrabajo }