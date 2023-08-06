const sequelize = require('../utils/db');
const { Sequelize, DataTypes } = require('sequelize');

const NOA = sequelize.define('NOA',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: 'natureofactivity'
});

// (async()=>{
//     const noa = await NOA.findAll();
//     // console.log(noa);
//     if(noa && noa.length == 0){
//         // console.log('I\'m In');
//        let mynoa =  await NOA.bulkCreate([
//            { title: 'Helping local schools to achieve good' },
//            { title: 'Preparing an actionable business' },
//            { title: 'Developing Sustainable Water' },
//            { title: 'Tourism Promotion Innovative' },
//            { title: 'Promotion of Appropriate Technologies ' },
//            { title: 'Reduction in Energy Consumption' },
//            { title: 'To Skill rural population' },
//            { title: 'Facilitating 100% Digitized money' },
//            { title: 'Setting of the information imparting' },
//            { title: 'Developing and managing efficient garbage' },
//            { title: 'To assist the marketing of rural produce ' },
//            { title: 'Food preservation/packaging' },
//            { title: 'Automation of local activities' },
//            { title: 'Spreading public awareness under rural outreach program' },
//            { title: 'Contribution to any national level initiative of Government of India. For e.g. Digital' }
//        ]);
//     //    console.log(mynoa);
       
//     }
// })();


module.exports = { NOA };