
import { useState } from "react";
import { addUser, getUsers, updateUser ,deleteUser} from "../services/firestoreServices";
import { useEffect } from "react";

export default function Home() {
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
  