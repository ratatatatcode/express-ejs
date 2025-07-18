const { auth, db } = require("@/config/firebaseConfig");
const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  deleteUser,
  sendPasswordResetEmail,
} = require("firebase/auth");
const {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} = require("firebase/firestore");

exports.loginUser = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

exports.createUser = async ({ name, email, password }) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const userId = userCredential.user.uid;

  const userData = {
    userId,
    name,
    email,
  };

  const userRef = doc(db, "users", userId);
  await setDoc(userRef, userData);

  return userCredential.user;
};

exports.resetPassword = async (email) => {
  const usersQuery = query(collection(db, "users"), where("email", "==", email));
  const usersSnapshot = await getDocs(usersQuery);

  if (usersSnapshot.empty) {
    throw new Error("not-found");
  }

  await sendPasswordResetEmail(auth, email);
};

exports.deleteAuthUser = async (user) => {
  await deleteUser(user);
};