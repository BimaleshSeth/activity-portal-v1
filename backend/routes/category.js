const app = require('express').Router();
const authorization = require('../middleware/authorization');
const access = require('../access');
const { Category } = require('../models/category');


app.get('/', async(req, res) =>{
    const categories = await Category.findAll();
    res.send(categories);
});

app.get('/:categoryId', async(req, res) =>{
    const categoryId = req.params.categoryId;
    const category = await Category.findByPk(categoryId);

    if(!category) return res.status(404).send('Category with the given ID was not found.');

    return res.send(category);
    
});

app.post('/', authorization(access.CATEGORY_CREATE),async(req, res) =>{
    const categoryName = req.body.categoryName;
    const category = await Category.create({ categoryName });
    res.send(category);
});

app.put('/:categoryId', authorization(access.CATEGORY_UPDATE), async(req, res) => {
    const categoryId = req.params.categoryId;
    const categoryName = req.body.categoryName;

    const category = await Category.findByPk(categoryId);
    if(!category) return res.status(404).send('Category with the given ID was not found.');

    const isUpdated = await Category.update({ categoryName },{ where: { id : categoryId }});
    
    await category.reload();
    
    if(isUpdated[0] == 1) return res.send(category);
    
});

app.delete('/:categoryId', authorization(access.CATEGORY_DELETE), async(req, res) => {
    const categoryId = req.params.categoryId;
    const category = await Category.findByPk(categoryId);

    if(!category) return res.status(404).send('Category with the given ID was not found.');

    const isDeleted = await Category.destroy({ where:{ id : categoryId }});
    
    if(isDeleted == 1) return res.send(category);
        
});


module.exports = app;