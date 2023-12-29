const mongoose = require("mongoose");

// Creating Schema
const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
  },

  email: {
    type: String,
  },

  phone: {
    type: String,
  },
});

module.exports = mongoose.model("Client", ClientSchema);
