const express = require('express');
const router = express.Router();
const Article = require("../models/Articles.js");
const Category = require('../models/Categories.js');

//GET ALL ARTICLES
router.get('/',async (req,res)=>{
    try{
        let cont = (req.query.cont==undefined) ? false : true;
        let cat = (req.query.cat==undefined) ? false : true;
        if (cont==false && cat==false){
            const articles = await Article.find();
            res.json(articles);
        } else if (cont==true && cat==false){
            const articles = await Article.find({}, 'title description date -_id');
            res.json(articles);
        } else if (cont==false && cat==true){
            const category = await Category.find({},'articles -_id').sort({name:1}).populate('articles').exec((error,data)=>{
                var only_articles = [];
                for(i=0; i<data.length;i++){
                    if (data[i].articles.length>0){
                        for(j=0; j<data[i].articles.length; j++){
                            only_articles.push(data[i].articles[j]);
                        }
                    }
                }
                res.json(only_articles);
            });
        } else {
            const category = await Category.find({},'articles -_id').sort({name:1}).populate('articles','title description date -_id').exec((error,data)=>{
                var only_articles = [];
                for(i=0; i<data.length;i++){
                    if (data[i].articles.length>0){
                        for(j=0; j<data[i].articles.length; j++){
                            only_articles.push(data[i].articles[j]);
                        }
                    }
                }
                res.json(only_articles);
            });
        }        
    } catch (err) {
        res.json({message: err});
    }    
});

//POST NEW ARTICLE
router.post('/',async (req,res)=>{
    const article = new Article({
        title: req.body.title,
        content: req.body.content,
        description: req.body.description
    });
    const category = await Category.findOne({name: req.body.categories});
    category.articles.push(article);
    await article.save();
    await category.save((error, category)=>{
        if (error) {
            return error;
        }
         res.json(category);
    });
});

//SPECIFIC ARTICLE BY ID OR NAME
router.get('/:postId',async (req,res)=>{
    try{
        let cont = (req.query.cont==undefined) ? false : true;
        if (cont==false){
            const article = await Article.findById(req.params.postId);
            res.json(article);
        } else {
            const article = await Article.findById(req.params.postId,'title description date');
            res.json(article);
        }        
    }catch(err) {
        res.json({message: err})
    }
});

//UPDATE ARTICLE
router.put('/:postId',async (req,res)=>{
    try{
        await Article.findById(req.params.postId,(err,p)=>{
            p.content = req.body.content;
            p.save(err=>{
                if (err){
                    res.json(err)
                } else {
                    res.json("Updated")
                }
            })
        });
    }catch(err){
        res.json({message: err});
    }
});

//DELETE ARTICLE 
router.delete('/:postId', async (req,res)=>{
    try{
        const removePost = await Article.findByIdAndDelete(req.params.postId);
        res.json(removePost);
    }catch(err){
        res.json({message: err});
    }
})


module.exports = router;