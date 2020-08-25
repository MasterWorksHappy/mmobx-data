const csv = require("csvtojson");
const AWS = require("aws-sdk");
const S3 = new AWS.S3();

const bucketName = "mmobx.data";
const files = [
  "DB_Data_20200824 - Amenities",
  "DB_Data_20200824 - Gallery",
  "DB_Data_20200824 - Guide",
  "DB_Data_20200824 - Pages",
  "DB_Data_20200824 - Parts",
  "DB_Data_20200824 - Post",
  "DB_Data_20200824 - Rules",
];

const csvToJSON = async () => {
  // get csv file and create stream
  files.forEach(async (file) => {
    const params = {
      Bucket: bucketName,
      Key: `${file}.csv`,
    };
    const stream = S3.getObject(params).createReadStream();
    // convert csv file (stream) to JSON format data
    const json = await csv().fromStream(stream);
    params["Body"] = JSON.stringify(json);
    (params["Key"] = `${file}.json`), console.log(json);
    S3.putObject(params, function (err, data) {
      if (err) console.log(err, err.stack);
      // an error occurred
      else console.log(data); // successful response
    });
  });
};

csvToJSON();
