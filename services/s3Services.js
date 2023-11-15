// Import AWS SDK
const AWS = require("aws-sdk");
const dotenv = require("dotenv");

dotenv.config();

// Function to upload file to Amazon S3
const s3Upload = (file) => {
  // Define Amazon S3 bucket information
  const BUCKET_NAME = process.env.BUCKET_NAME; // S3 bucket name
  const AWS_USER_KEY = process.env.ACCESS_KEY; //  AWS access key ID
  const AWS_USER_SECRET = process.env.SECRET_KEY; //  AWS secret access key

  // Create an S3 instance
  const s3 = new AWS.S3({
    accessKeyId: AWS_USER_KEY,
    secretAccessKey: AWS_USER_SECRET,
    Bucket: BUCKET_NAME,
    ACL: "public-read", // Set the Access Control List for the uploaded file
  });

  // Define parameters for the upload
  const params = {
    Bucket: BUCKET_NAME,
    Key: `${file.originalname}`, // Name of the file in the S3 bucket
    Body: file.buffer, // File content as a buffer
  };

  // Return the promise from the S3 upload operation
  return s3.upload(params).promise();
};

// Export the s3Upload function to use in other modules
module.exports = {
  s3Upload,
};
