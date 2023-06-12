import prisma from '../prismaClient.js'

const getDiplomacias = async (req, res) => {

    if(Object.keys(req.query).length === 0){
        const diplomacias = await prisma.diplomacias.findMany()
        res.json(diplomacias)
    }else{
        
        const { id_reino_1, id_reino_2, es_aliado } = req.query

        if(id_reino_1 && isNaN(parseInt(id_reino_1))){
            res.status(400).json({error: 'Param id_reino_1 must be a number'})
            return
        }

        if(id_reino_2 && isNaN(parseInt(id_reino_2))){
            res.status(400).json({error: 'Param id_reino_2 must be a number'})
            return
        }

        if(es_aliado && isNaN(parseInt(es_aliado))){
            res.status(400).json({error: 'Param es_aliado must be a boolean'})
            return
        }

        const diplomacias = await prisma.diplomacias.findMany({
            where: {
                id_reino_1: id_reino_1 ? parseInt(id_reino_1) : undefined,
                id_reino_2: id_reino_2 ? parseInt(id_reino_2) : undefined,
                es_aliado: es_aliado ? parseInt(es_aliado) : undefined
            }
        })

        res.json(diplomacias)
    }
}

const insertDiplomacia = async (req, res) => {

    const { id_reino_1, id_reino_2, es_aliado } = req.query

    if(!id_reino_1){
        res.status(400).json({error: 'Param id_reino_1 is required'})
        return
    }

    if(isNaN(parseInt(id_reino_1))){
        res.status(400).json({error: 'Param id_reino_1 must be a number'})
        return
    }

    if(!id_reino_2){
        res.status(400).json({error: 'Param id_reino_2 is required'})
        return
    }

    if(isNaN(parseInt(id_reino_2))){
        res.status(400).json({error: 'Param id_reino_2 must be a number'})
        return
    }

    if(!es_aliado){
        res.status(400).json({error: 'Param es_aliado is required'})
        return
    }

    if(isNaN(parseInt(es_aliado))){
        res.status(400).json({error: 'Param es_aliado must be a boolean'})
        return
    }

    const reino_1 = await prisma.reinos.findUnique({
        where: {
            id: parseInt(id_reino_1)
        }
    })

    if(!reino_1){
        res.status(204).json({error: 'Reino 1 not found'})
        return
    }

    const reino_2 = await prisma.reinos.findUnique({
        where: {
            id: parseInt(id_reino_2)
        }
    })

    if(!reino_2){
        res.status(204).json({error: 'Reino 2 not found'})
        return
    }

    const diplomaciaExists = await prisma.diplomacias.findFirst({
        where: {
            id_reino_1: parseInt(id_reino_1),
            id_reino_2: parseInt(id_reino_2)
        }
    })

    if(diplomaciaExists){
        res.status(400).json({error: 'Diplomacia already exists'})
        return
    }

    const diplomacia = await prisma.diplomacias.create({
        data: {
            id_reino_1: parseInt(id_reino_1),
            id_reino_2: parseInt(id_reino_2),
            es_aliado: parseInt(es_aliado)
        }
    })

    res.status(201).json({message: 'Diplomacia created successfully', diplomacia})
}

const updateDiplomacia = async (req, res) => {

    const { id_reino_1, id_reino_2, es_aliado } = req.query

    if(!id_reino_1){
        res.status(400).json({error: 'Param id_reino_1 is required'})
        return
    }

    if(isNaN(parseInt(id_reino_1))){
        res.status(400).json({error: 'Param id_reino_1 must be a number'})
        return
    }

    if(!id_reino_2){
        res.status(400).json({error: 'Param id_reino_2 is required'})
        return
    }

    if(isNaN(parseInt(id_reino_2))){
        res.status(400).json({error: 'Param id_reino_2 must be a number'})
        return
    }

    if(!es_aliado){
        res.status(400).json({error: 'Param es_aliado is required, is the only param that can be updated'})
        return
    }

    if(isNaN(parseInt(es_aliado))){
        res.status(400).json({error: 'Param es_aliado must be a boolean'})
        return
    }

    const diplomaciaExists = await prisma.diplomacias.findFirst({
        where: {
            id_reino_1: parseInt(id_reino_1),
            id_reino_2: parseInt(id_reino_2)
        }
    })

    if(!diplomaciaExists){
        res.status(204).json({error: 'Diplomacia not found'})
        return
    }

    const diplomacia = await prisma.diplomacias.update({
        where: {
            id_reino_1: parseInt(id_reino_1),
            id_reino_2: parseInt(id_reino_2)
        },
        data: {
            es_aliado: parseInt(es_aliado)
        }
    })

    res.status(200).json({message: 'Diplomacia updated successfully', diplomacia})
}

const deleteDiplomacia = async (req, res) => {
    const { id_reino_1, id_reino_2 } = req.query

    if(!id_reino_1){
        res.status(400).json({error: 'Param id_reino_1 is required'})
        return
    }

    if(isNaN(parseInt(id_reino_1))){
        res.status(400).json({error: 'Param id_reino_1 must be a number'})
        return
    }

    if(!id_reino_2){
        res.status(400).json({error: 'Param id_reino_2 is required'})
        return
    }

    if(isNaN(parseInt(id_reino_2))){
        res.status(400).json({error: 'Param id_reino_2 must be a number'})
        return
    }

    const diplomaciaExists = await prisma.diplomacias.findFirst({
        where: {
            id_reino_1: parseInt(id_reino_1),
            id_reino_2: parseInt(id_reino_2)
        }
    })

    if(!diplomaciaExists){
        res.status(204).json({error: 'Diplomacia not found'})
        return
    }

    const diplomacia = await prisma.diplomacias.delete({
        where: {
            id_reino_1: parseInt(id_reino_1),
            id_reino_2: parseInt(id_reino_2)
        }
    })

    res.status(200).json({message: 'Diplomacia deleted successfully', diplomacia})
}

export { getDiplomacias, insertDiplomacia, updateDiplomacia, deleteDiplomacia }