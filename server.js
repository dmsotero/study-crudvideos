import { fastify } from 'fastify'
import { dataBaseMemory } from './database-memory.js'

const server = fastify()
const database = new dataBaseMemory()


server.get('/videos', (req, res) => {
    const videos = database.list()
    return videos
})

server.post('/videos', (req, res) => {
    const {title, description, duration} = req.body
    database.create({
        // title: title,
        // description: description,
        // duration: duration
        //para um codigo mais limpo, como a variavel possui o mesmo nome que o atributo, usa-se apenas uma vez:
        title,
        description,
        duration,        
    })
    return res.status(201).send()    
})

server.put('/videos:id', (req, res) => {
    const videoId = req.params.id
    const {title, description, duration} = req.body

    const video = database.update(videoId, {
        title,
        description,
        duration,  
    })
    return res.status(204).send
})





server.delete('/videos:id', () => {
    return 'delete videos'
})


server.listen({
    port: 3333
})