const mongoose = require("mongoose");

// Creating Schema
const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
  },

  description: {
    type: String,
  },

  status: {
    type: String,
    enum: ["active", "in progress", "completed"],
  },

  //

  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
