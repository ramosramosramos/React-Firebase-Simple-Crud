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
