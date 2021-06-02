// IMPORT EXPRESS SERVER
const express = require("express");
// USE Router FOR EXPRESS SERVER
const router = express.Router();
//USE MULTER FOR FILE UPLOAD
const multer = require("multer");
//IMPORT METER MODEL AND BIND IT
const MeterModel = require("../models/meter");
//Axios for Api call
const axios = require("axios");

var FormData = require("form-data");
var fs = require("fs");

//For file upload using multer
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "uploads");
  },
  filename: (req, file, callBack) => {
    callBack(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

// Upload display-name
router.post("/upload-display-name", upload.single("_file"), (req, res) => {
  var data = new FormData();
  var file = req.file;

  data.append("_file", fs.createReadStream(file.path));

  var config = {
    method: "post",
    url: "http://52.65.190.77/w-api-xempla-api-framework-temp/api/v1/upload/display-name/",
    headers: {
      access_token:
        "dEnwQF2jbQhdsUPwagUFXaPuZMDxxc29:CNQH3P7YpC4bYmHGTc6DzdQsxWpkWH9x",
      ...data.getHeaders(),
    },
    data: data,
  };

  // console.log(data);
  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      res.send(response.data);
      try {
        fs.unlinkSync(file.path);
        // console.log("File is deleted.");
      } catch (error) {
        console.log(error);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
});

// Upload-Cusum
router.post("/upload-cusum", upload.single("_file"), (req, res) => {
  var data = new FormData();
  var file = req.file;

  data.append("_file", fs.createReadStream(file.path));

  var config = {
    method: "post",
    url: "http://52.65.190.77/w-api-xempla-api-framework-temp/api/v1/upload/cusum/",
    headers: {
      access_token:
        "dEnwQF2jbQhdsUPwagUFXaPuZMDxxc29:CNQH3P7YpC4bYmHGTc6DzdQsxWpkWH9x",
      ...data.getHeaders(),
    },
    data: data,
  };

  // console.log(data);
  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      res.send(response.data);
      try {
        fs.unlinkSync(file.path);
        // console.log("File is deleted.");
      } catch (error) {
        console.log(error);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
});

// Asset-Class
router.post("/uploadFileAndData", upload.single("File"), (req, res) => {
  var data = new FormData();
  var file = req.file;
  // console.log(req.body);
  data.append("company_id_rdb", req.body.companyId);
  data.append("facility_id_rdb", req.body.facilityId);
  data.append("asset_class", req.body.assetClass);
  data.append("_file", fs.createReadStream(file.path));

  var config = {
    method: "post",
    url: "http://52.65.190.77/w-api-xempla-api-framework-temp/api/v1/upload/tags/",
    headers: {
      access_token:
        "dEnwQF2jbQhdsUPwagUFXaPuZMDxxc29:CNQH3P7YpC4bYmHGTc6DzdQsxWpkWH9x",
      ...data.getHeaders(),
    },
    data: data,
  };

  // console.log(data);
  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      res.send(response.data);
      try {
        fs.unlinkSync(file.path);
        // console.log("File is deleted.");
      } catch (error) {
        console.log(error);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
});

//Working Section Faciity File upload
// router.post("/upload", upload.single("_file"), (req, res) => {
//   var data = new FormData();
//   var file = req.file;
//   data.append("_file", fs.createReadStream(file.path));
//   console.log(data);
//   var config = {
//     method: "post",
//     url: "http://52.65.190.77/w-api-xempla-api-framework-temp/api/v1/upload/facility/",
//     headers: {
//       access_token:
//         "dEnwQF2jbQhdsUPwagUFXaPuZMDxxc29:CNQH3P7YpC4bYmHGTc6DzdQsxWpkWH9x",
//       ...data.getHeaders(),
//     },
//     data: data,
//   };

//   axios(config)
//     .then(function (response) {
//       console.log(JSON.stringify(response.data));
//       try {
//         fs.unlinkSync(file.path);
//         // console.log("File is deleted.");
//       } catch (error) {
//         console.log(error);
//       }
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// });

//file upload in node server uploads folder
// router.post("/upload", upload.single("_file"), (req, res) => {
//   const file = req.file;
//   if (!file) {
//     console.log("No file!");
//   }
//   res.send(file);
//   try {
//     fs.unlinkSync(file.path);
//     console.log("File is deleted.");
//   } catch (error) {
//     console.log(error);
//   }
// });

router.post("/upload", multer().single("_file"), (req, res) => {
  console.log(req.file.buffer.toString());
});

router.get("/list", (req, res) => {
  MeterModel.find((err, docs) => {
    if (!err) {
      res.send(docs);
      console.log(docs);
    } else {
      console.log("Error in geting Object" + JSON.stringify(err, undefined, 2));
    }
  });
});

router.get("/fetch/:id", (req, res) => {
  MeterModel.findOne({ _id: req.params.id }, (err, doc) => {
    if (!err) {
      res.send(doc);
      //console.log(doc);
    } else {
      console.log("Error in geting Object" + JSON.stringify(err, undefined, 2));
    }
  });
});

router.put(
  "/edit/:id",
  (req, res) => {
    MeterModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          id: req.body.id,
          name: req.body.name,
          location: req.body.location,
        },
      },
      (err, doc) => {
        if (!err) {
          res.send("Updated");
        } else {
          console.log(
            "Error in geting Object" + JSON.stringify(err, undefined, 2),
          );
        } //end err callback
      },
    ); //end find
  }, //end req,res callback
); // END PUT

router.post("/add", (req, res) => {
  var data = new MeterModel({
    id: req.body.id,
    name: req.body.name,
    location: req.body.location,
  });
  data.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log("Error in geting Object" + JSON.stringify(err, undefined, 2));
    }
  });
});

//Data related
router.get("/fetchgroup/:id", (req, res) => {
  MeterModel.aggregate(
    [
      { $match: { _id: req.params.id } },
      {
        $group: {
          _id: "$data.datetime",
        },
      },
    ],
    (err, doc) => {
      if (!err) {
        // res.send("Data Added");
        console.log(doc);
      } else {
        console.log(
          "Error in submit Object" + JSON.stringify(err, undefined, 2),
        );
      }
    },
  );
});
router.put("/data/add/:id", (req, res) => {
  MeterModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      $push: {
        data: {
          datetime: req.body.datetime,
          unit: req.body.unit,
          unitvalue: req.body.unitvalue,
        },
      },
    },
    (err, doc) => {
      if (!err) {
        res.send("Data Added");
      } else {
        console.log(
          "Error in submit Object" + JSON.stringify(err, undefined, 2),
        );
      }
    },
  );
});

router.put("/data/delete/:id", (req, res) => {
  MeterModel.findOneAndUpdate(
    { "data._id": req.params.id },
    { $pull: { data: { _id: req.params.id } } },
    { multi: true, new: true },
    (err, doc) => {
      if (!err) {
        res.send(doc);
        //  res.send('Data Deleted');
      } else {
        console.log(
          "Error in update data Object" + JSON.stringify(err, undefined, 2),
        );
      }
    },
  );
});

router.put("/data/edit/:dataid", (req, res) => {
  MeterModel.findOneAndUpdate(
    { "data._id": req.params.dataid },
    {
      $set: {
        "data.$.datetime": req.body.datetime,
        "data.$.unit": req.body.unit,
        "data.$.unitvalue": req.body.unitvalue,
      },
    },
    (err, doc) => {
      if (!err) {
        console.log(doc);
        res.send(doc);
      } else {
        // res.send(err);
        console.log(
          "Error in fetching Object" + JSON.stringify(err, undefined, 2),
        );
      }
    },
  );
});

// db.meters.findOneAndUpdate(
//     {"data._id": ObjectId("6090000d5aa48f2b30cc227a") },
//     {
//       $set: {
//         "data.$.datetime": "hello",
//         "data.$.unit": "unit1",
//         "data.$.unitvalue": "unitvalue1",
//       },
//     })

//SHOULD BE EXPORTED
module.exports = router;
