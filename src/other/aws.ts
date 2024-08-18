import AWS from 'aws-sdk';

const spacesEndpoint = new AWS.Endpoint('nyc3.digitaloceanspaces.com');
const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId:  process.env.SPACES_SECRET_KEY,
    secretAccessKey:  process.env.SPACES_ACCESS_KEY,
    signatureVersion: 'v4',
});

export default s3;
