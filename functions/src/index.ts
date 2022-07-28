import * as functions from 'firebase-functions';

exports.scheduledFunction = functions.pubsub
  .schedule('1 * * * *')
  .onRun((context) => {
    functions.logger.log('This message was logged from a Cloud Function.');
    console.log('This will be run every 5 minutes!');
    return null;
  });
