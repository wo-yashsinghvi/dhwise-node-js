/**
 * routeRoleRoutes.js
 * @description :: CRUD API routes for routeRole
 */

const express = require('express');
const router = express.Router();
const routeRoleController = require('../../../controller/device/v1/routeRoleController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/routerole/create').post(auth(PLATFORM.DEVICE),checkRolePermission,checkRolePermission,routeRoleController.addRouteRole);
router.route('/device/api/v1/routerole/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,checkRolePermission,routeRoleController.bulkInsertRouteRole);
router.route('/device/api/v1/routerole/list').post(auth(PLATFORM.DEVICE),checkRolePermission,checkRolePermission,routeRoleController.findAllRouteRole);
router.route('/device/api/v1/routerole/count').post(auth(PLATFORM.DEVICE),checkRolePermission,checkRolePermission,routeRoleController.getRouteRoleCount);
router.route('/device/api/v1/routerole/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,checkRolePermission,routeRoleController.bulkUpdateRouteRole);
router.route('/device/api/v1/routerole/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,checkRolePermission,routeRoleController.softDeleteManyRouteRole);
router.route('/device/api/v1/routerole/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,checkRolePermission,routeRoleController.deleteManyRouteRole);
router.route('/device/api/v1/routerole/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,checkRolePermission,routeRoleController.softDeleteRouteRole);
router.route('/device/api/v1/routerole/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,checkRolePermission,routeRoleController.partialUpdateRouteRole);
router.route('/device/api/v1/routerole/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,checkRolePermission,routeRoleController.updateRouteRole);    
router.route('/device/api/v1/routerole/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,checkRolePermission,routeRoleController.getRouteRole);
router.route('/device/api/v1/routerole/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,checkRolePermission,routeRoleController.deleteRouteRole);

module.exports = router;
