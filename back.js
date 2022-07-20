//index

const {s3Service} = require('./s3Service');

exports.handler = async (event) => {
    // TODO - remove this, it's just to keep the endpoint rolling
    // return {
    //     statusCode: 200,
    //     body: event.body
    // };
    console.log(event)
    
    const contents = event;
    let response = {
         headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST'
        }
    };

    try {
         await s3Service.uploadToBucket(contents);
        
        response.statusCode = 200,
        response.body = JSON.stringify(contents);
    
    } catch (e){
        console.error("failed to write to s3", e)
        response.statusCode = 500;
    } 
        
    return response;
};


// userInfoModel
const userInfoModel = (userInfo) => {
    return {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        multiplier: userInfo.multiplier,
        raffle: userInfo.raffle
    }
};

exports.userInfoModel = userInfoModel;




//S3Service.js
const AWS = require('aws-sdk');
const {UserInfoModel} = require('./userInfoModel');
const {NameGenerator} = require('./nameGenerator');

const s3Service = {
    bucketName: 'web-ar-participants',
    // TODO - get actual secrets, if we need them?
    // TODO - test all of this
    id: 'ASIA4BZWWJV7TM54JH2F',
    secret: 'PCK2O9Bk1C5gm+ev3rhgYZ5pUClKbeHRhCTOya+O',
    
    
    uploadToBucket: async (contents) => {
        // const userInfo = UserInfoModel(JSON.parse(contents));
        const filename = NameGenerator(contents.firstName, contents.lastName);
        
        const s3 = new AWS.S3({
            accessKeyId: this.id,
            secretAccessKey: this.secret
        });
        
        const params = {
          Bucket: this.bucketName,
          Key: filename,
          Body: contents
        };
        
        try{
           const data = await s3.upload(params).promise() 
           
           console.log(`File uploaded successfully. ${data.Location}`);
        }
        
        catch (e) {
            console.error("Failed to upload to S3", e)
            throw e
        }
    },
};

exports.s3Service = s3Service;



//nameGenarator
const nameGenerator = (firstName, lastName) => {
    return `participant_${firstName}_${lastName}`.json;
};

exports.NameGenerator = nameGenerator;