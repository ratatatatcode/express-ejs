const { db } = require("@/config/firebaseConfig");
const {
  collection,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  query,
  where
} = require("firebase/firestore");

const todosRef = collection(db, "todos");

exports.getAllTodosByUser = async (userId) => {
  const q = query(todosRef, where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

exports.createTodo = async ({ title, description, status = "pending", userId }) => {
  const newTodo = {
    title,
    description,
    status,
    userId,
    createdAt: new Date().toISOString(),
  };
  const docRef = await addDoc(todosRef, newTodo);
  return { id: docRef.id, ...newTodo };
};

exports.updateTodo = async (id, updates) => {
  const todoRef = doc(db, "todos", id);
  const todoSnap = await getDoc(todoRef);
  if (!todoSnap.exists()) return null;
  await updateDoc(todoRef, updates);
  return true;
};

exports.deleteTodoById = async (id) => {
  const todoRef = doc(db, "todos", id);
  await deleteDoc(todoRef);
};

exports.deleteAllTodos = async () => {
  const snapshot = await getDocs(todosRef);
  const deletes = snapshot.docs.map((docSnap) =>
    deleteDoc(doc(db, "todos", docSnap.id))
  );
  await Promise.all(deletes);
};
