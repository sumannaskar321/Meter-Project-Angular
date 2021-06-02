const mongoose = require("mongoose");

const valueType = { type: String };

const DataSchema = mongoose.Schema(
  {
    datetime:valueType,
    unit: valueType,
    unitvalue:valueType,
  },
  { timestamps: true },
);

const MeterSchema = mongoose.Schema(
  {
    id: valueType,
    name: valueType,
    location: valueType,
    regdatetime: { type: Date, default: Date.now },
    data: [DataSchema],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Meter", MeterSchema);
