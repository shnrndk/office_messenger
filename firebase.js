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

    

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    get ref() {
        return firebase.database().ref('messages');
    }

    parse = snapshot => {
        const { timestamp: numberStamp, text, user } = snapshot.val();
        const { key: _id } = snapshot;
        const createdAt = new Date(numberStamp);
        const message = {
            _id,
            createdAt,
            text,
            user,
        };
        return message;
    };

    on = callback =>
        this.ref
            .limitToLast(20)
            .on('child_added', snapshot => callback(this.parse(snapshot)));

    get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
    }
    // send the message to the Backend
    send = messages => {
        for (let i = 0; i < messages.length; i++) {
            const { text, user } = messages[i];
            const message = {
                text,
                user,
                timestamp: this.timestamp,
            };
            this.append(message);
        }
    };

    append = message => this.ref.push(message);

    // close the connection to the Backend
    off() {
        this.ref.off();
    }
}

Fire.shared = new Fire();
export default Fire;
