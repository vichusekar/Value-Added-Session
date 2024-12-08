import express from "express";
import multer from "multer";
import path from "path";


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //to set a file uplaod path
        cb(null, "Uploads")
    },
    filename: function (req, file, cb) {
        //to set a file name and genarate current date for secure and unique name
        cb(null, file.originalname + "_" + Date.now() + path.extname(file.originalname))

    }
})

//convert bytes into MB
let maxSize = 2 * 1024 * 1024;

export let upload = multer({
    storage: storage,
    // define file storage
    limits: {
        // the file size should created in bytes that's why we create maxSize variable
        fileSize: maxSize
    },
    fileFilter: function (req, file, cb) {

        // it declare the file source
        let fileTypes = /jpg|jpeg|png|/;

        // using test method it return true or false based on fileTypes
        let mimeType = fileTypes.test(file.mimetype);

        // it return file extension
        let extname = fileTypes.test(path.extname(file.originalname).toLowerCase()); //sometimes it return uppercasse fileTypes so we convert to the lowercase

        if (mimeType && extname) {
            // we set true for upload the file
            return cb(null, true)
        }

        // it throw an error for given criteria is not fulfill
        cb(`Error: File uploads only these types ${fileTypes}`);

    }
}).single("image");


