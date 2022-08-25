importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

const firebaseApp = firebase.initializeApp({
  projectId: "ssspay-prod",
  appId: "1:1044964269542:web:37d8bc1cdcf54eaa994a27",
  storageBucket: "ssspay-prod.appspot.com",
  apiKey: "AIzaSyBYkJgA0m1DBSaWlCiY2FtOoVNBgSyH_sY",
  authDomain: "ssspay-prod.firebaseapp.com",
  messagingSenderId: "1044964269542",
  measurementId: "G-QL9TMZGB6C",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging(firebaseApp);
console.log("firebase-messaging-sw.js", messaging);
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/firebase-logo.png'
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });
  
console.log("firebase-messaging-sw.js initialized");
