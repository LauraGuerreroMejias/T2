import prisma from '../prismaClient.js'

const top_5_personajes_con_mas_fuerza = async (req, res) => {

    const personajes = await prisma.personajes.findMany({
        orderBy: {
            fuerza: 'desc'
        }
    })

    res.json(personajes.slice(0, 5))
}

const personaje_con_mas_karts = async (req, res) => {

    const personajes = await prisma.personajes.findMany({})

    const karts = await prisma.karts.findMany({})

    const personajes_con_karts = personajes.map(personaje => {
        return {
            ...personaje,
            karts: karts.filter(kart => kart.id_personaje === personaje.id)
        }
    })

    const personaje_con_mas_karts = personajes_con_karts.reduce((prev, current) => {
        return (prev.karts.length > current.karts.length) ? prev : current
    })

    res.json(personaje_con_mas_karts)
}

const cantidad_habitantes = async (req, res) => {
    
        const { id_reino } = req.params
    
        const reino = await prisma.reinos.findUnique({
            where: {
                id: parseInt(id_reino)
            }
        })
    
        if(!reino){
            res.status(204).json({error: 'Reino not found'})
            return
        }
    
        const habitantes = await prisma.personajes.findMany({
            where: {
                id_reino: parseInt(id_reino)
            }
        })
    
        res.json({
            reino: reino.nombre,
            cantidad_habitantes: habitantes.length
        })
}

const gobernante = async (req, res) => {
        
            const { id_reino } = req.params
        
            const reino = await prisma.reinos.findUnique({
                where: {
                    id: parseInt(id_reino)
                }
            })
        
            if(!reino){
                res.status(204).json({error: 'Reino not found'})
                return
            }
        
            const gobernante = await prisma.personajes.findUnique({
                where: {
                    id: reino.id_gobernante
                }
            })
        
            res.json({
                reino: reino.nombre,
                gobernante: gobernante.nombre
            })
}

export { top_5_personajes_con_mas_fuerza, personaje_con_mas_karts, cantidad_habitantes, gobernante }