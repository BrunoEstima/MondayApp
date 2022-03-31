const router = require('express').Router();
const { authenticationMiddleware } = require('../middlewares/authentication');
const mondayController = require('../controllers/monday-controller');

router.post('/monday/execute_action', authenticationMiddleware, mondayController.executeAction);
router.post('/monday/get_remote_list_options', authenticationMiddleware, mondayController.getRemoteListOptions);

const mondayController = require('./controllers/monday-controller');
const mondayService = require('./services/monday-service');

const token = "20cb48e9ccb06d55247a9943231273b6"; 

console.log(`Token = ${token}`);



const result = mondayService.getItemData(token, 2487579444);
result.then( data => console.log(data));