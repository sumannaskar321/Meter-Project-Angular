const schema_mongoose = require("mongoose");

const DataSchema = schema_mongoose.Schema(
  {
    unit: { type: String },
    unitdata: { type: Number },
    datetime: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

module.exports = schema_mongoose.model('Data',DataSchema);
