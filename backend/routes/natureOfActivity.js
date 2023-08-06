const app = require('express').Router();
const authorization = require('../middleware/authorization');
const access = require('../access');
const { NOA } = require('../models/natureOfActivity');


app.get('/', async(req, res) =>{
    const noa = await NOA.findAll();
    res.send(noa);
});

app.get('/:noaId', async(req, res) =>{
    const noaId = req.params.noaId;
    const noa = await NOA.findByPk(noaId);

    if(!noa) return res.status(404).send('NOA with the given ID was not found.');

    return res.send(noa);
    
});

app.post('/', authorization(access.NOA_CREATE),async(req, res) =>{
    const title = req.body.title;
    const noa = await NOA.create({ title });
    return res.send(noa);
});

app.put('/:noaId', authorization(access.NOA_UPDATE), async(req, res) => {
    const noaId = req.params.noaId;
    const title = req.body.title;

    const noa = await NOA.findByPk(noaId);
    if(!noa) return res.status(404).send('NOA with the given ID was not found.');

    const isUpdated = await NOA.update({ title },{ where: { id : noaId }});
    
    await noa.reload();
    
    if(isUpdated[0] == 1) return res.send(noa);
    
});

app.delete('/:noaId', authorization(access.NOA_DELETE), async(req, res) => {
    const noaId = req.params.noaId;
    const noa = await NOA.findByPk(noaId);

    if(!noa) return res.status(404).send('NOA with the given ID was not found.');

    const isDeleted = await NOA.destroy({ where:{ id : noaId }});
    
    if(isDeleted == 1) return res.send(noa);
        
});



module.exports = app;