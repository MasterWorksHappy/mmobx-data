require('dotenv').config();
const AWS = require('aws-sdk');
const csv = require('csvtojson');
const S3 = new AWS.S3();

const bucketName = 'mmobx.data';
const files = [
  'DB_Data_20200824 - Amenities',
  'DB_Data_20200824 - Gallery',
  'DB_Data_20200824 - Guide',
  'DB_Data_20200824 - Pages',
  'DB_Data_20200824 - Parts',
  'DB_Data_20200824 - Post',
  'DB_Data_20200824 - Rules'
  ];

async function csvToJSON() {
  // get csv file and create stream
  files.forEach((file) => {
    const stream = S3.getObject(bucketName, `${filename}.csv`).createReadStream();
    // convert csv file (stream) to JSON format data
    const json = await csv().fromStream(stream);
    console.log(json);

  })
};

csvToJSON();
