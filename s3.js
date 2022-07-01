const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV === "production") {
    secrets = process.env;
} else {
    secrets = require("./secrets.json");
}

//bew creates an instance of a AWS user -> its just an object
//that gives us a bunch of methods to communicate and interact
//with our s3 could that amazon calls bucket
const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

module.exports.upload = (req, res, next) => {
    if (!req.file) {
        console.log("no file on request body");
        return res.sendStatus(500);
    }
    const { filename, mimetype, size, path } = req.file;
    const promise = s3
        .putObject({
            Bucket: "spicedling", //<- if you are using your own credetions this needs to be updated to your bucket name
            ACL: "public-read",
            Key: filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        })
        .promise();

    promise
        .then(() => {
            console.log("yay it worked our image is in the thing");
            next();
            fs.unlink(path, () => {
                console.log("wow!");
            });
        })
        .catch((err) => {
            console.log("something went wrong with the cloud", err);
        });
};
