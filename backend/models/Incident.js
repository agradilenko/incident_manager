const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const IncidentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  area : {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateDue: {
    type: String,
    required: true
  },
  assignee: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    required: true
  }
});

// export const IncidentSchema: Schema = new Schema(IncidentSchemaModel, {
//   timestamps: false,
// });

module.exports = Incident = mongoose.model("incidents", IncidentSchema);