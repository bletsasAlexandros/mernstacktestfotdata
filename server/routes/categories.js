const express = require('express');
const router = express.Router();
const Category = require("../models/Categories.js");

//GET ALL CATEGORIES WITH THEIR ARTICLES
router.get('/',async (req,res)=>{
    try{
        const categories = await Category.find().populate('articles')
        .exec(function (err, categories) {
            if (err) return handleError(err);        
            res.json(categories);
        });
    } catch (err) {
        res.json({message: err});
    }
});
//GET ALL CATEGORIES WITHOUT THEIR ARTICLES
router.get('/without',async (req,res)=>{
    try{
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.json({message: err});
    }
});

//POST NEW CATEGORY
router.post('/',(req,res)=>{
    console.log(req.body)
    const category = new Category({
        name:req.body.name
    });
    category.save()
    .then(data=>{res.json(data)})
    .catch(err =>{
        res.json({message:err})
    })
});

//DELETE CATEGORY 
router.delete('/:postId', async (req,res)=>{
    try{
        const removePost = await Category.findByIdAndDelete(req.params.postId);
        res.json(removePost);
    }catch(err){
        res.json({message: err});
    }
})

module.exports = router;