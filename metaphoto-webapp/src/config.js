export default {
    s3: {
        REGION: "us-west-2",
        BUCKET: "metaphoto-us-west-2-dev-metaphotodatabucket-8jec596nfltl"
    },
    apiGateway: {
        REGION: "us-west-2",
        URL: "https://api.metaphoto.ajmiller.net/dev"
    },
    cognito: {
        REGION: "us-west-2",
        USER_POOL_ID: process.env.REACT_APP_USER_POOL_ID,
        APP_CLIENT_ID: process.env.REACT_APP_USER_POOL_CLIENT_ID,
        IDENTITY_POOL_ID: process.env.REACT_APP_IDENTITY_POOL_ID
    }
};
