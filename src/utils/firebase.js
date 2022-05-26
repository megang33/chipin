// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, setDoc, getDoc, query, where, doc, updateDoc, arrayUnion, FieldValue, DocumentSnapshot } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA76jduRFf8rn1o_u3WFYYpIm-LgkGpmqg",
  authDomain: "chipin-e812c.firebaseapp.com",
  projectId: "chipin-e812c",
  storageBucket: "chipin-e812c.appspot.com",
  messagingSenderId: "682897930529",
  appId: "1:682897930529:web:64348b7083650d9001a660"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export const auth = getAuth(app);
export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, provider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        registered: false,
      });
    }
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    return (docSnap);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const getDocInfo = async (collection, id, field) => {
  console.log(collection + ", " + id + ", " + field)
  if (id != null) {
    const docRef = doc(db, collection, id);
    const docSnap = await getDoc(docRef);
    const data = await docSnap.get(field);
    return data;
  }
}

export const initializeGroup = async (uid, name) => {
  const newGroup = doc(collection(db, "groups"))    // Each group will guarantee have unique IDs. No chance for overlap.
  const data = {
    name: name,
    founder: uid,
    numMembers: 1,
    members: new Array(uid),
    currentEvents: [],
    pastEvents: [],
    cumHours: 0,
    groupID: newGroup.id
  }
  await setDoc(newGroup, data)
  const numGroups = await (getDocInfo("users", uid, "numGroups"))
  console.log(numGroups);
  const userData = {
    numGroups: numGroups + 1,
    groups: arrayUnion(newGroup.id)
  }
  await updateDBdoc("users", uid, userData)
}

export const updateDBdoc = async (collection, uid, body) => {
  try {
    const docRef = await updateDoc(doc(db, collection, uid), body);
    console.log("Document updated: ", docRef.id);
  } catch (e) {
    console.error("Error updating doc: ", e);
  }
}

export const updateGroup = async (docUser, docGroup) => {
  let docRef = doc(db, "groups", docGroup)
  let docSnap = await getDoc(docRef)
  if (docSnap._document === null) {
    return false;
  }
  const groupBody = {
    numMembers: docSnap.get("numMembers") + 1,
    members: arrayUnion(docUser),
  }
  docRef = doc(db, "users", docUser)
  docSnap = await getDoc(docRef)
  const userBody = {
    numGroups: docSnap.get("numGroups") + 1,
    groups: arrayUnion(docGroup),
  }
  updateDBdoc("groups", docGroup, groupBody);
  updateDBdoc("users", docUser, userBody)
}

//to add document for events page
export const addDBdoc = async (c, body) => {
  try {
    const docRef = await addDoc(collection(db, c), body);
    console.log("Document added: ", docRef.id);
  } catch (e) {
    console.error("Error adding doc: ", e);
  }
}

export const updateStateDoc = (uid) => {
  if (uid) {
    const docRef = doc(db, "users", uid);
    const docSnap = getDoc(docRef);
    return (docSnap);
  }
}