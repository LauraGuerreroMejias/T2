import prisma from '../prismaClient.js'

const getReinoDefensas = async (req, res) => {
    if(Object.keys(req.query).length === 0){
        const reinoDefensas = await prisma.reinoDefensas.findMany()
        res.json(reinoDefensas)
    }else{

        const { id_reino, id_defensa, cantidad } = req.query

        if(id_reino && isNaN(parseInt(id_reino))){
            res.status(400).json({error: 'Param id_reino must be a number'})
            return
        }

        if(id_defensa && isNaN(parseInt(id_defensa))){
            res.status(400).json({error: 'Param id_defensa must be a number'})
            return
        }

        if(cantidad){
            if(!cantidad.includes('-')){
                if(isNaN(parseInt(cantidad))){
                    res.status(400).json({error: 'Param cantidad must be a number or a number range (min-max)'})
                    return
                }
            }

            if(isNaN(parseInt(cantidad.split('-')[0])) || isNaN(parseInt(cantidad.split('-')[1]))){
                res.status(400).json({error: 'Param cantidad must be a valid number range (min-max)'})
                return
            }else{
                if(parseInt(cantidad.split('-')[0]) > parseInt(cantidad.split('-')[1])){
                    res.status(400).json({error: 'Param cantidad must be a valid number range (min-max)'})
                    return
                }
            }
        }

        const reinoDefensas = await prisma.reinoDefensas.findMany({
            where: {
                id_reino: id_reino ? parseInt(id_reino) : undefined,
                id_defensa: id_defensa ? parseInt(id_defensa) : undefined,
                cantidad: cantidad ? cantidad.includes('-') ? {
                    gte: parseInt(cantidad.split('-')[0]),
                    lte: parseInt(cantidad.split('-')[1])
                } : parseInt(cantidad) : undefined
            }
        })

        res.json(reinoDefensas)
    }
}

const insertReinoDefensa = async (req, res) => {

    const { id_reino, id_defensa, cantidad } = req.query

    if(!id_reino){
        res.status(400).json({error: 'Param id_reino is required'})
        return
    }

    if(isNaN(parseInt(id_reino))){
        res.status(400).json({error: 'Param id_reino must be a number'})
        return
    }

    if(!id_defensa){
        res.status(400).json({error: 'Param id_defensa is required'})
        return
    }

    if(isNaN(parseInt(id_defensa))){
        res.status(400).json({error: 'Param id_defensa must be a number'})
        return
    }

    if(!cantidad){
        res.status(400).json({error: 'Param cantidad is required'})
        return
    }

    if(isNaN(parseInt(cantidad))){
        res.status(400).json({error: 'Param cantidad must be a number'})
        return
    }

    const reino = await prisma.reinos.findUnique({
        where: {
            id: parseInt(id_reino)
        }
    })

    if(!reino){
        res.status(204).json({error: 'Reino not found'})
        return
    }

    const defensa = await prisma.defensas.findUnique({
        where: {
            id: parseInt(id_defensa)
        }
    })

    if(!defensa){
        res.status(204).json({error: 'Defensa not found'})
        return
    }

    const reinoDefensaExists = await prisma.reinoDefensas.findUnique({
        where: {
            id_reino: parseInt(id_reino),
            id_defensa: parseInt(id_defensa)
        }
    })

    if(reinoDefensaExists){
        res.status(400).json({error: 'ReinoDefensa already exists'})
        return
    }

    const reinoDefensas = await prisma.reinoDefensas.create({
        data: {
            id_reino: parseInt(id_reino),
            id_defensa: parseInt(id_defensa),
            cantidad: parseInt(cantidad)
        }
    })

    res.status(201).json({message: 'ReinoDefensa created successfully', reinoDefensas})
}

const updateReinoDefensa = async (req, res) => {

    const { id_reino, id_defensa, cantidad } = req.query

    if(!id_reino){
        res.status(400).json({error: 'Param id_reino is required'})
        return
    }

    if(isNaN(parseInt(id_reino))){
        res.status(400).json({error: 'Param id_reino must be a number'})
        return
    }

    if(!id_defensa){
        res.status(400).json({error: 'Param id_defensa is required'})
        return
    }

    if(isNaN(parseInt(id_defensa))){
        res.status(400).json({error: 'Param id_defensa must be a number'})
        return
    }

    if(!cantidad){
        res.status(400).json({error: 'Param cantidad is required, is the only field that can be updated'})
        return
    }

    if(isNaN(parseInt(cantidad))){
        res.status(400).json({error: 'Param cantidad must be a number'})
        return
    }

    const reino = await prisma.reinos.findUnique({
        where: {
            id: parseInt(id_reino)
        }
    })

    if(!reino){
        res.status(204).json({error: 'Reino not found'})
        return
    }

    const defensa = await prisma.defensas.findUnique({
        where: {
            id: parseInt(id_defensa)
        }
    })

    if(!defensa){
        res.status(204).json({error: 'Defensa not found'})
        return
    }

    const reinoDefensaExists = await prisma.reinoDefensas.findUnique({
        where: {
            id_reino: parseInt(id_reino),
            id_defensa: parseInt(id_defensa)
        }
    })

    if(!reinoDefensaExists){
        res.status(204).json({error: 'ReinoDefensa not found'})
        return
    }

    const reinoDefensas = await prisma.reinoDefensas.update({
        where: {
            id_reino: parseInt(id_reino),
            id_defensa: parseInt(id_defensa)
        },
        data: {
            cantidad: parseInt(cantidad)
        }
    })

    res.json({message: 'ReinoDefensa updated successfully', reinoDefensas})
}

const deleteReinoDefensa = async (req, res) => {

    const { id_reino, id_defensa, cantidad } = req.query

    if(!id_reino){
        res.status(400).json({error: 'Param id_reino is required'})
        return
    }

    if(isNaN(parseInt(id_reino))){
        res.status(400).json({error: 'Param id_reino must be a number'})
        return
    }

    if(!id_defensa){
        res.status(400).json({error: 'Param id_defensa is required'})
        return
    }

    if(isNaN(parseInt(id_defensa))){
        res.status(400).json({error: 'Param id_defensa must be a number'})
        return
    }

    const reinoDefensaExists = await prisma.reinoDefensas.findUnique({
        where: {
            id_reino: parseInt(id_reino),
            id_defensa: parseInt(id_defensa)
        }
    })

    if(!reinoDefensaExists){
        res.status(204).json({error: 'ReinoDefensa not found'})
        return
    }

    const reinoDefensas = await prisma.reinoDefensas.delete({
        where: {
            id_reino: parseInt(id_reino),
            id_defensa: parseInt(id_defensa)
        }
    })

    res.json({message: 'ReinoDefensa deleted successfully', reinoDefensas})
}

export { getReinoDefensas, insertReinoDefensa, updateReinoDefensa, deleteReinoDefensa }