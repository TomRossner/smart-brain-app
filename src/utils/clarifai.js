const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");

    const stub = ClarifaiStub.grpc();

    const metadata = new grpc.Metadata();

    
const USER_ID = 'tomrossner';
// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = 'dfa460d3b60349279af5c811ed720d9a';
const APP_ID = 'smart-brain';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'face-detection';
const IMAGE_URL = 'https://cdn.pixabay.com/photo/2017/01/14/10/56/people-1979261_960_720.jpg';
// This is optional.You can specify a model version or the empty string for the default
const MODEL_VERSION_ID = '';

metadata.set("authorization", "Key " + PAT);

stub.PostModelOutputs(
    {
        user_app_id: {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        model_id: MODEL_ID,
        version_id: MODEL_VERSION_ID, // This is optional. Defaults to the latest model version.
        inputs: [
            { data: { image: { url: IMAGE_URL, allow_duplicate_url: true } } }
        ]
    },
    metadata,
    (err, response) => {
        if (err) {
            throw new Error(err);
        }

        if (response.status.code !== 10000) {
            throw new Error("Post model outputs failed, status: " + response.status.description);
        }

        // Since we have one input, one output will exist here.
        const output = response.outputs[0];
        console.log("Result: ", output.data.regions[0].region_info.bounding_box)

        // console.log("Predicted concepts:");
        // for (const concept of output.data.concepts) {
        //     console.log(concept.name + " " + concept.value);
        // }
    }

);