import dotenv from "dotenv";
import aws from "aws-sdk";
import crypto from "crypto";
import { promisify } from "util";
dotenv.config();

const randomBytes = promisify(crypto.randomBytes);

const s3 = new aws.S3({
  region: process.env.BUCKET_REGION,
  accessKeyId: process.env.AWS_USER_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_USER_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
});

export async function generateUploadURL(ext) {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString("hex") + ext;
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: imageName,
    Expires: 60,
  };
  const uploadUrl = await s3.getSignedUrlPromise("putObject", params);
  return uploadUrl;
}
