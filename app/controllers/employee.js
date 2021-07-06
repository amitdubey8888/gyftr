const Employee = require('../modals/employee');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
  addEmployee: addEmployee,
  fetchEmployee: fetchEmployee,
  updateEmployee: updateEmployee,
  removeEmployee: removeEmployee,
};

function addEmployee(req, res) {
  let employee = new Employee(req.body);
  employee.save()
    .then(response => {
      res.status(200);
      return res.json({
        status: true,
        message: 'Employee saved successfully!',
        data: response,
      });
    })
    .catch(error => {
      res.status(400);
      return res.json({
        status: false,
        message: 'Unable to save employee!',
        error: error
      });
    });
}

function fetchEmployee(req, res) {
  Employee.find(req.body).then(response => {
    res.status(200);
    return res.json({
      status: true,
      message: 'Employee fetched successfully!',
      data: response
    });
  }).catch(error => {
    res.status(400);
    return res.json({
      status: false,
      message: 'Unable to fetch employee!',
      error: error
    });
  });
}

function updateEmployee(req, res) {
  Employee.findByIdAndUpdate({
    _id: new ObjectId(req.body._id)
  }, {
    $set: req.body
  }, {
    new: true
  })
    .then(response => {
      res.status(200);
      return res.json({
        status: true,
        message: 'Employee updated successfully!',
        data: response
      });
    })
    .catch(error => {
      res.status(400);
      return res.json({
        status: false,
        message: 'Unable to update employee!',
        error: error
      });
    });
}

function removeEmployee(req, res) {
  Employee.findByIdAndRemove({
    _id: new ObjectId(req.body._id)
  })
    .then(response => {
      res.status(200);
      return res.json({
        status: true,
        message: 'Employee removed successfully!'
      });
    })
    .catch(error => {
      res.status(400);
      return res.json({
        status: false,
        message: 'Unable to remove employee!',
        error: error
      });
    });
}