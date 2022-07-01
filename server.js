const express = require("express");
const app = express();
const db = require("./db");
const multer = require("multer");
const uidSafe = require("uid-Safe");
const path = require("path");
const s3 = require("./s3");

app.use(express.static("./public"));

app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use(express.json());

// var images = [
//     { id: 1, name: "anaheim", country: "usa" },
//     { id: 2, name: "berlin", country: "deutschland" },
//     { id: 3, name: "lisbon", country: "portugal" },
// ];

app.get("/images", (req, res) => {
    db.getImages()
        .then((result) => {
            console.log(result);
            res.json(result.rows);
        })
        .catch((err) => {
            console.log("this is the error in images:", err);
        });
});
console.log("/images rout has been hit");

app.get("/modal/:id", (req, res) => {
    const id = req.params.id;
    db.getModal(id)
        .then((result) => {
            res.json(result.rows[0]);
        })
        .catch((err) => {
            console.log("error in imags: id", err);
        });
});

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, "uploads");
    },
    filename(req, file, callback) {
        //create a randome file name
        //pick up the file extension and save it too
        uidSafe(24).then((randomString) => {
            const extname = path.extname(file.originalname);
            // callback(null, `${randomString}.jpg`);
            callback(null, `${randomString}${extname}`);
        });
    },
});

const uploader = multer({
    storage,
    limits: { fileSize: 2097152 },
});

app.post("/upload", uploader.single("image"), s3.upload, (req, res) => {
    // If nothing went wrong the file is already in the uploads directory
    console.log("req body in upload post:", req.body);
    console.log(req.file);
    console.log(
        "this is req file:",
        "https://s3.amazonaws.com/spicedling/" + req.file.filename
    );

    let url = "https://s3.amazonaws.com/spicedling/" + req.file.filename;
    if (req.file) {
        db.addImage(url, req.body.user, req.body.title).then((result) => {
            console.log(result.rows[0]);
            res.json({
                success: true,
                payload: result.rows[0],
            });
        });
    } else {
        res.json({
            success: false,
        });
    }
});

app.get("*", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(8080, () => console.log(`I'm listening.`));
