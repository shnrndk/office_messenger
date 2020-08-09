import firebase from 'firebase'; // 4.8.1

class Fire {
    constructor() {
        this.init();

    }

    init = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyAujDnOQQIPayRX2IcKgUoGY7BEAQI0orU",
                authDomain: "office-messenger.firebaseapp.com",
                databaseURL: "https://office-messenger.firebaseio.com",
                projectId: "office-messenger",
                storageBucket: "office-messenger.appspot.com",
                messagingSenderId: "517412516183",
                appId: "1:517412516183:web:00d6a54e54312a69f30e12",
                measurementId: "G-WR7F7LEHRC"
            });
        }
    };

    


}

Fire = new Fire();
export default Fire;
