const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employee');

router.post('/add', EmployeeController.addEmployee);
router.post('/fetch', EmployeeController.fetchEmployee);
router.post('/update', EmployeeController.updateEmployee);
router.post('/remove', EmployeeController.removeEmployee);

router.get('/', function (req, res, next) {
  res.status(200);
  res.json({
    message: 'Welcome to coolest api on the earth !',
  });
});

module.exports = router;