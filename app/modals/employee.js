var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model(
  'Employee',
  new Schema({
    salutation: {
      type: String,
      default: null,
    },
    firstName: {
      type: String,
      default: null,
    },
    lastName: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    mobile: {
      type: String,
      default: null,
    },
    gender: {
      type: String,
      default: null,
    },
    dob: {
      type: String,
      default: null,
    },
    localAddress: {
      type: String,
      default: null,
    },
    landmark: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    state: {
      type: String,
      default: null,
    },
    pinCode: {
      type: String,
      default: null,
    },
    photo: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      default: null,
    },
  }, {
    timestamps: true,
    collection: 'Employee',
  })
);