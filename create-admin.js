const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyCkoaWn-n5I-DTIQ2OChtSErMuiEidQOjU",
  authDomain: "control-f7545.firebaseapp.com",
  projectId: "control-f7545",
  storageBucket: "control-f7545.firebasestorage.app",
  messagingSenderId: "178424601304",
  appId: "1:178424601304:web:ea3d8c44a1e4a11144d5ad",
  measurementId: "G-BG9ZPBFB2D"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function createAdmin() {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, 'admin@control.com', 'admin1234');
    const user = userCredential.user;
    console.log('Created user with UID:', user.uid);
    
    await setDoc(doc(db, 'users', user.uid), {
      email: 'admin@control.com',
      displayName: 'ผู้ดูแลระบบ (Auto)',
      role: 'admin',
      disabled: false,
      createdAt: new Date()
    });
    console.log('SUCCESS');
    process.exit(0);
  } catch (error) {
    console.error('ERROR:', error.code, error.message);
    process.exit(1);
  }
}

createAdmin();
