const firebaseConfig = {
  apiKey: "AIzaSyB36ZszS8v_DeOn3at7zEo_tFq86WU0sI4",
  authDomain: "simulados-concursos-22c91.firebaseapp.com",
  projectId: "simulados-concursos-22c91",
  storageBucket: "simulados-concursos-22c91.firebasestorage.app",
  messagingSenderId: "863699339166",
  appId: "1:863699339166:web:8514155da2229b41ae388f"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

const TRIAL_DAYS = 4;
const PREMIUM_DAYS = 365;

async function loginWithGoogle() {
  try {
    const result = await auth.signInWithPopup(provider);
    const user = result.user;
    
    const userRef = db.collection('users').doc(user.uid);
    const doc = await userRef.get();

    if (!doc.exists) {
      const now = new Date();
      const trialEnd = new Date(now.getTime() + (TRIAL_DAYS * 24 * 60 * 60 * 1000));
      
      await userRef.set({
        email: user.email,
        displayName: user.displayName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        plan: "free",
        trialStart: now.toISOString(),
        trialEnd: trialEnd.toISOString(),
        status: "active"
      });
    }

    window.location.href = "app.html";
     
  } catch (error) {
    console.error("Erro no login: ", error);
    if(error.code !== 'auth/popup-closed-by-user') {
      alert("Falha ao entrar com Google. Tente novamente.");
    }
  }
}

async function logoutUser() {
  await auth.signOut();
  window.location.href = "index.html";
}
