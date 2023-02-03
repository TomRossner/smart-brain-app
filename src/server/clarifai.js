const express = require("express");
const router = express.Router();

const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();

require('dotenv').config();
    
const USER_ID = process.env.USER_ID;
const PAT = process.env.API_KEY;
const APP_ID = process.env.APP_ID;
const MODEL_ID = process.env.MODEL_ID;
const MODEL_VERSION_ID = '';

metadata.set("authorization", `Key ${PAT}`);


const predictImage = (inputs) => {
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

router.post("/", async (req, res) => {
    try {
        const {imageURL} = req.body;
        const inputs = [
            {
                data: {
                    image: {
                        url: imageURL
                    }
                }
            }
        ];
        const results = await predictImage(inputs);
        return res.send({results})
    } catch (error) {
        return res.status(400).send({
            error: error
        })
    }
})

module.exports = router;