import prisma from '../prismaClient.js'

const getDefensas = async (req, res) => {
    if(Object.keys(req.query).length === 0){
        const defensas = await prisma.defensas.findMany()
        res.json(defensas)
    }else{

        const { id, defensa } = req.query

        if(id && isNaN(parseInt(id))){
            res.status(400).json({error: 'Param id must be a number'})
            return
        }

        if(defensa && isNaN(parseInt(defensa))){
            res.status(400).json({error: 'Param defensa must be a number'})
            return
        }

        const defensas = await prisma.defensas.findMany({
            where: {
                id: id ? parseInt(id) : undefined,
                defensa: defensa ? parseInt(defensa) : undefined
            }
        })

        res.json(defensas)
    }
}

const insertDefensa = async (req, res) => {

    const { defensa } = req.query

    if(!defensa){
        res.status(400).json({error: 'Param defensa is required'})
        return
    }

    if(defensa.length > 45){
        res.status(400).json({error: 'Param defensa max length is 45 characters'})
        return
    }

    const defensas = await prisma.defensas.create({
        data: {
            defensa: parseInt(defensa)
        }
    })

    res.status(201).json({message: 'defensa created successfully', defensas})
}

const updateDefensa = async (req, res) => {

    const { id, defensa } = req.query

    if(!id){
        res.status(400).json({error: 'Param id is required'})
        return
    }

    if(isNaN(parseInt(id))){
        res.status(400).json({error: 'Param id must be a number'})
        return
    }

    if(!defensa){
        res.status(400).json({error: 'Param defensa is required, is the only field that you can update'})
        return
    }

    if(defensa.length > 45){
        res.status(400).json({error: 'Param defensa max length is 45 characters'})
        return
    }

    const defensa_exists = await prisma.defensas.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if(!defensa_exists){
        res.status(404).json({error: 'defensa not found'})
        return
    }

    const new_defensa = await prisma.defensas.update({
        where: {
            id: parseInt(id)
        },
        data: {
            defensa: parseInt(defensa)
        }
    })

    res.json({message: 'defensa updated successfully', new_defensa})
}

const deleteDefensa = async (req, res) => {

    const { id } = req.query

    if(!id){
        res.status(400).json({error: 'Param id is required'})
        return
    }

    if(isNaN(parseInt(id))){
        res.status(400).json({error: 'Param id must be a number'})
        return
    }

    const defensa_exists = await prisma.defensas.findUnique({
        where: {
            id: parseInt(id)
        }
    })

    if(!defensa_exists){
        res.status(404).json({error: 'defensa not found'})
        return
    }

    const defensa = await prisma.defensas.delete({
        where: {
            id: parseInt(id)
        }
    })

    res.json({message: 'defensa deleted successfully', defensa})
}

export { getDefensas, insertDefensa, updateDefensa, deleteDefensa }