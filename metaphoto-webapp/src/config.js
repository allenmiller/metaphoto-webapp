export default {
    s3: {
        REGION: process.env.REACT_APP_REGION,
        DATA_BUCKET: process.env.REACT_APP_DATA_BUCKET
    },
    apiGateway: {
        REGION: process.env.REACT_APP_REGION,
        NAME: "metaphoto-api",
        URL: process.env.REACT_APP_API_URL
    },
    cognito: {
        REGION: process.env.REACT_APP_REGION,
        USER_POOL_ID: process.env.REACT_APP_USER_POOL_ID,
        APP_CLIENT_ID: process.env.REACT_APP_USER_POOL_CLIENT_ID,
        IDENTITY_POOL_ID: process.env.REACT_APP_IDENTITY_POOL_ID
    },
    env: process.env.REACT_APP_ENV
};
