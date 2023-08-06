const app = require('express').Router();
const authorization = require('../middleware/authorization');
const access = require('../access');
const { Degree } = require('../models/degrees');


app.get('/', async(req, res) =>{
    return res.send(await Degree.findAll());
});

app.get('/:degreeId', async(req, res) =>{
    const degreeId = req.params.degreeId;
    const degree = await Degree.findByPk(degreeId);
    if(!degree) return res.status(404).send('Degree with the given ID was not found.');

    return res.send(degree);
    
});

app.post('/', authorization(access.DEGREE_CREATE), async(req, res) =>{
    const degreeName = req.body.degreeName;
    const years = req.body.years;
    const degree = await Degree.create({ degreeName, years });
    return res.send(degree);
});

app.put('/:degreeId', authorization(access.DEGREE_UPDATE), async(req, res) =>{

    const degreeId = req.params.degreeId;
    const degreeName = req.body.degreeName;
    const years = req.body.years;

    const degree = await Degree.findByPk(degreeId);
    if(!degree) return res.status(404).send('Degree with the given ID was not found.');

    const isUpdate = await Degree.update({ degreeName, years }, 
        { where: { id: degreeId } }
    );

    await degree.reload();

    if(isUpdate[0] == 1) return res.send(degree);
    
});

app.delete('/:degreeId', authorization(access.DEGREE_DELETE), async(req, res) => {
    const degreeId = req.params.degreeId;

    const isPresent = await Degree.findByPk(degreeId);
    if(!isPresent) return res.status(404).send('Degree with the given ID was not found.');

    const isDeleted = await Degree.destroy({ where:{ id : degreeId }});
    if(isDeleted == 1) return res.send(isPresent);
    
});


module.exports = app;