const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyCkoaWn-n5I-DTIQ2OChtSErMuiEidQOjU",
  authDomain: "control-f7545.firebaseapp.com",
  projectId: "control-f7545",
  storageBucket: "control-f7545.firebasestorage.app",
  messagingSenderId: "178424601304",
  appId: "1:178424601304:web:ea3d8c44a1e4a11144d5ad"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function setupAccounts() {
  try {
    console.log('Creating Admin account...');
    try {
      const adminCred = await createUserWithEmailAndPassword(auth, 'admin@kathu.com', 'admin1234');
      await setDoc(doc(db, 'users', adminCred.user.uid), {
        email: 'admin@kathu.com',
        displayName: 'ผู้ดูแลระบบ (Admin)',
        role: 'admin',
        disabled: false,
        createdAt: new Date()
      });
      console.log('Admin account created successfully.');
    } catch(e) {
      if(e.code === 'auth/email-already-in-use') {
         console.log('Admin account already exists. Updating role to admin...');
         const adminCred = await signInWithEmailAndPassword(auth, 'admin@kathu.com', 'admin1234');
         await setDoc(doc(db, 'users', adminCred.user.uid), {
           email: 'admin@kathu.com',
           displayName: 'ผู้ดูแลระบบ (Admin)',
           role: 'admin',
           disabled: false,
           createdAt: new Date()
         }, { merge: true });
         console.log('Admin role updated.');
      } else {
         throw e;
      }
    }

    console.log('Creating User account...');
    try {
      const userCred = await createUserWithEmailAndPassword(auth, 'user@kathu.com', 'user1234');
      await setDoc(doc(db, 'users', userCred.user.uid), {
        email: 'user@kathu.com',
        displayName: 'ผู้ใช้งานทั่วไป',
        role: 'user',
        disabled: false,
        createdAt: new Date()
      });
      console.log('User account created successfully.');
    } catch(e) {
      if(e.code === 'auth/email-already-in-use') {
         console.log('User account already exists.');
      } else {
         throw e;
      }
    }

    console.log('ALL DONE!');
    process.exit(0);
  } catch (error) {
    console.error('ERROR:', error.code, error.message);
    process.exit(1);
  }
}

setupAccounts();
