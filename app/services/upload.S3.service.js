require('dotenv').config();
const fs = require('fs')
const AWS = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')

AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME
AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION
AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY
AWS_SECRET_KEY = process.env.AWS_SECRET_KEY

const bucketName = AWS_BUCKET_NAME
const region = AWS_BUCKET_REGION
const accessKeyId = AWS_ACCESS_KEY
const secretAccessKey = AWS_SECRET_KEY

const s3 = new AWS.S3({
    bucketName,
    accessKeyId,
    secretAccessKey
})

var uploadFile = multer({
    storage: multerS3({
      s3: s3,
      bucket: bucketName,
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString())
      }
    })
})

exports.uploadFile = uploadFile