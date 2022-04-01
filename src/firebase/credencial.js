import { initializeApp } from "firebase/app";

// Credenciales de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDj0WPLJsqGIXza6F6MM-9evqih5vh-pWk",
    authDomain: "ferreteria-74648.firebaseapp.com",
    projectId: "ferreteria-74648",
    storageBucket: "ferreteria-74648.appspot.com",
    messagingSenderId: "946921161620",
    appId: "1:946921161620:web:a98080917ef135c4b20581"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;