// implement your posts router here
const express = require("express")
const posts = require('./posts-model')

const postsRouter = express.Router()

postsRouter.get('/', (req, res)=> {
    posts.find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: 'The post information could not be retrieved.'
        })
    })
})

postsRouter.get('/:id', (req, res) => {
     
        posts.findById(req.params.id)
            .then(post => {
                if(post){
                    res.status(200).json(post)
                } else {
                    res.status(404).json({
                        message: "The post with the specified ID does not exist."
                    })
                }
            })
            .catch( err => {
                console.log(err)
                res.status(500).json({
                    error: 'The post information could not be retrieved.'
                })
            })

})

postsRouter.post("/", (req, res) => {
    
    

    posts.insert(req.body)
        .then( post => {
            if(!req.body.contents){
               return  res.status(400).json({
                    message: "Please provide title and contents for the post" 
                })
            } else {
                res.status(201).json(post)
            }
           
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "There was an error while saving the post to the database."
            })
        })
})

module.exports = postsRouter