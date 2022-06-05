// import * as functions from 'firebase-functions';
// import * as axiosModule from 'axios';
const jwt = require("jsonwebtoken");
// const axios = axiosModule.default;
// const JWT_SECRET_KEY = 'gfg_jwt_secret_key';
// const TOKEN_HEADER_KEY = 'gfg_token_header_key';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info('Hello logs!', { structuredData: true });
//   let signed = jwt.sign({data: 'foobar'},JSON.stringify({payload:'data'}), 'UFMwMDcxNmI5YWIzN2YyZDMzZWM3NDg5YjkzYzAyOGE2ZmNmZDIw', { expiresIn: '1h' });
//   console.log(signed);
//   response.send('Hello from Firebase!');
// });
let signed = jwt.sign({data: 'foobar'}, 'UFMwMDcxNmI5YWIzN2YyZDMzZWM3NDg5YjkzYzAyOGE2ZmNmZDIw', { expiresIn: '1h' });
console.log(signed);
