const express = require("express");
const routerBytes = express.Router()

// const dotenv = require("dotenv");
// dotenv.config()
// console.log(dotenv.config())

const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();

    
const USER_ID = 'tomrossner';
const PAT = 'dfa460d3b60349279af5c811ed720d9a';
const APP_ID = 'smart-brain';
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '';

metadata.set("authorization", "Key " + PAT);

const fs = require("fs");
const path = require("path");
const Buffer = require("buffer");
const pako = require('pako');


const predictImageBytes = (inputs) => {
    console.log("bytes inputs", inputs)
    return new Promise((resolve, reject) => {
        stub.PostModelOutputs(
            {
                user_app_id: {
                    "user_id": USER_ID,
                    "app_id": APP_ID
                },
                model_id: MODEL_ID,
                version_id: MODEL_VERSION_ID,
                inputs: inputs
            },
            metadata,
            (err, response) => {
                if (err) {
                    reject(err);
                }
        
                if (response.status.code !== 10000) {
                    reject("Post model outputs failed, status: " + response.status.description);
                }
                
                let results = [];
                const output = response.outputs[0];
                const {regions} = output.data;
                results.push(regions);
                resolve(results);
            }
        );
    })  
}

const convertURL = (url) => {
    // console.log(url)
    const UrlToBuffer = url.split(",")[1];
    // console.log(encodedData)

    // Decode the data URL to a buffer
    const bufferedURL = Buffer.from(UrlToBuffer);

    // Convert the buffer to a base64 string
    const base64String = bufferedURL.toString('base64');
    console.log("Im in convertURL function", base64String)
    return base64String;
}


const compressURL = (url) => {
    console.log(url.substring(0, 20))
    const base64String = url;
    const compressedString = pako.deflate(base64String, { to: 'string' });
    console.log("IM in compressURL function")
    return compressedString;
} 

routerBytes.post("/", async (req, res) => {
    try {
        const {imageURL} = req.body;
        // console.log(imageURL.substring(0, 10))
        const convertedURL = convertURL(imageURL);
        console.log("im here")
        const compressedURL = compressURL(convertedURL);
        const imageBytes = fs.readFileSync(compressedURL);
        // console.log("routerBytes", imageBytes.substring(0, 100));
        const inputs = [
            {
                data: {
                    image: {
                        base64: imageBytes
                    }
                }
            }
        ];
        const results = await predictImageBytes(inputs);
        return res.send({results})
    } catch (error) {
        return res.status(400).send({
            error: error
        })
    }
})

module.exports = routerBytes;