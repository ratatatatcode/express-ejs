# Services in ExpressJS and EJS
##  Firebase Authentication Methods
### This line imports four specific functions from Firebase Authentication:

- ```createUserWithEmailAndPassword``` is used to register a new user using an email and password.
- ```signInWithEmailAndPassword``` is used to log in an existing user.
- ```deleteUser``` deletes the currently authenticated user from Firebase Auth.
- ```sendPasswordResetEmail``` sends a password reset link to the user's email.

```js
const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  deleteUser,
  sendPasswordResetEmail,
} = require("firebase/auth");

```
### This line imports several Firestore functions:

- ```collection``` is used to access a Firestore collection like "users" or "todos".
- ```doc``` is used to reference a specific document inside a collection, like a user document with a certain ID.
- ```setDoc``` writes or replaces data in a document — useful for saving new user info after registration.
- ```getDocs``` runs a Firestore query and returns all matching documents.
- ```query``` is used to build queries with conditions.
- ```where``` adds filtering to a query, for example, finding users where the email equals a certain value.

```js
const {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} = require("firebase/firestore");
```


These functions allow your backend to store and retrieve structured data associated with users or any other app entity.

## Let's start with authService.js

This service acts as the abstraction layer for Firebase Authentication and Firestore interactions. It encapsulates core operations such as signing in, signing up, sending password reset emails, and deleting users from Firebase Authentication.

It is used by the authController.js to perform authentication-related tasks cleanly and modularly.

## Code Breakdown

### Signs in a user using their email and password.

```js
exports.signinUser = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};
```

Purpose: Authenticates a user.<br>
Returns: Firebase UserCredential object if successful.<br>
Throws: Firebase authentication errors (auth/wrong-password, auth/user-not-found, etc.).<br>

### Creates a new user account in Firebase Auth and saves user data to Firestore.

```js
exports.createUser = async ({ name, email, password }) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const userId = userCredential.user.uid;

  const userData = { userId, name, email };
  const userRef = doc(db, "users", userId);
  await setDoc(userRef, userData);

  return userCredential.user;
};

```

Purpose: Registers a new user and persists profile info (name, email, userId) in Firestore.<br>
Returns: Firebase User object if successful.<br>
Firestore Path: users/{userId} stores user data.<br>
Throws: Firebase auth/email-already-in-use and other registration errors.<br>

### Sends a password reset email to a user’s email address.

```js
exports.resetPassword = async (email) => {
  const usersQuery = query(collection(db, "users"), where("email", "==", email));
  const usersSnapshot = await ```getDocs```(usersQuery);

  if (usersSnapshot.empty) {
    throw new Error("not-found");
  }

  await sendPasswordResetEmail(auth, email);
};
```

Purpose: Sends a password reset email if the email exists in Firestore.<br>
Validation: Ensures email exists in the users collection before attempting reset.<br>
Throws:<br>
"not-found" if the email is not found in Firestore.<br>
Firebase password reset errors.

### Deletes a user from Firebase Authentication.

```js
exports.deleteAuthUser = async (user) => {
  await deleteUser(user);
};

```

Purpose: Deletes a given Firebase user.<br>
Used For: Rollback during failed user creation or account removal.<br>

## Now let's move on to todoService.js

This service handles all CRUD operations related to the to-do items stored in the Firebase Firestore. It abstracts the Firestore logic from controllers, allowing for cleaner and more maintainable code.

It works closely with todoController.js to respond to requests from the frontend.

## Code Breakdown

### Fetches all to-do items for a specific user.

```js
exports.getAllTodosByUser = async (userId) => {
  const q = query(todosRef, where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
```

Purpose: Retrieves all to-do items belonging to a given userId.<br>
Returns: Array of to-do objects with id and other fields from Firestore.<br>
Usage: Called on user dashboard or list display.<br>

###  Creates a new to-do item.

```js
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

```

Purpose: Adds a new to-do to the Firestore todos collection.<br>
Defaults: status defaults to "pending", and createdAt is the current ISO timestamp.<br>
Returns: Newly created to-do object with Firestore-generated id.<br>

### Updates an existing to-do by ID.
```js
exports.updateTodo = async (id, updates) => {
  const todoRef = doc(db, "todos", id);
  const todoSnap = await getDoc(todoRef);
  if (!todoSnap.exists()) return null;
  await updateDoc(todoRef, updates);
  return true;
};
```

Purpose: Updates the fields of an existing to-do using its document id.<br>
Validation: First checks if the to-do exists before updating.<br>
Returns:<br>
true if updated successfully.<br>
null if the to-do item doesn't exist.<br>

### Deletes a single to-do by its ID.

```js
exports.deleteTodoById = async (id) => {
  const todoRef = doc(db, "todos", id);
  await deleteDoc(todoRef);
};
```

Purpose: Removes a specific to-do item from Firestore.<br>
Parameter: id of the document in the todos collection.<br>
Returns: void<br>

###  Deletes all to-do items belonging to a user.
```js
exports.deleteAllTodos = async (userId) => {
  const q = query(todosRef, where("userId", "==", userId));
  const snapshot = await getDocs(q);
  const deletes = snapshot.docs.map((docSnap) =>
    deleteDoc(doc(db, "todos", docSnap.id))
  );
  await Promise.all(deletes);
};

```

Purpose: Removes all to-dos associated with a specific userId.<br>
Usage: Useful for account deletion or reset.<br>
Returns: void after completing all deletions in parallel.
