const AWS = require('aws-sdk')
require('dotenv').config();

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

s3FileDeleted = async (req, res, next) => {
  var params = {  Bucket: AWS_BUCKET_NAME, Key: req.query.key};
  await s3.deleteObject(params, function(err, data) {
            if(data) {
                    next();
            }
            else if(err){
                    res.status(400).send({
                        message: err
                    });
                    return;
            }
        });
};

const deleFile = {
    s3FileDeleted: s3FileDeleted
};
module.exports = deleFile;