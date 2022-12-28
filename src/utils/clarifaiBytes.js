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

routerBytes.post("/", async (req, res) => {
    try {
        const {imageForBytes} = req.body;
        console.log("I'm here");
        const imageBytes = fs.readFileSync(imageForBytes, 'base64');
        console.log("routerBytes", imageBytes.substring(0, 100));
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