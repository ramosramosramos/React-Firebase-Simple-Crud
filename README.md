Yes! Here's how to implement **CRUD (Create, Read, Update, Delete)** in Firebase Firestore with React and Vite.

---

## 1️⃣ **Install Firebase**
```sh
npm install firebase
```

---

## 2️⃣ **Setup Firebase in Your React Project**
Create a file: **`src/firebase.js`**

```js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
```

---

## 3️⃣ **CRUD Operations in Firestore**
Create another file: **`src/services/firestoreService.js`**

```js
import { db } from "../firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

// Reference to "users" collection
const usersCollection = collection(db, "users");

// ✅ Create a user
export const addUser = async (user) => {
  try {
    const docRef = await addDoc(usersCollection, user);
    return docRef.id;
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

// ✅ Read users
export const getUsers = async () => {
  try {
    const querySnapshot = await getDocs(usersCollection);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting users:", error);
  }
};

// ✅ Update a user
export const updateUser = async (id, updatedData) => {
  try {
    const userDoc = doc(db, "users", id);
    await updateDoc(userDoc, updatedData);
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

// ✅ Delete a user
export const deleteUser = async (id) => {
  try {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
```

---

## 4️⃣ **Use CRUD in a React Component**
Modify **`src/App.jsx`**:

```jsx
import { useEffect, useState } from "react";
import { addUser, getUsers, updateUser, deleteUser } from "./services/firestoreService";

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState("");

  // Load users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const usersList = await getUsers();
    setUsers(usersList);
  };

  const handleAddUser = async () => {
    if (!newUser) return;
    await addUser({ name: newUser });
    setNewUser("");
    fetchUsers();
  };

  const handleUpdateUser = async (id) => {
    const newName = prompt("Enter new name:");
    if (newName) {
      await updateUser(id, { name: newName });
      fetchUsers();
    }
  };

  const handleDeleteUser = async (id) => {
    if (confirm("Are you sure?")) {
      await deleteUser(id);
      fetchUsers();
    }
  };

  return (
    <div>
      <h1>Firebase CRUD with React & Vite</h1>
      <input 
        type="text" 
        value={newUser} 
        onChange={(e) => setNewUser(e.target.value)} 
        placeholder="Enter name"
      />
      <button onClick={handleAddUser}>Add User</button>

      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => handleUpdateUser(user.id)}>Edit</button>
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

---

## 🎯 **Features Covered:**
✅ Add User  
✅ Read Users  
✅ Update User  
✅ Delete User  

Now, whenever you **add, edit, or delete** a user, it will be updated in **Firebase Firestore**!

Let me know if you need help with anything!
