import React, { useEffect, useState } from "react";
import axios from "../services/axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    fetchUsers();
    fetchAnalytics();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get("/analytics");
      setAnalytics(response.data);
    } catch (error) {
      console.error("Error fetching analytics", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`/admin/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Platform Analytics</h2>
      <p>Total Users: {analytics.totalUsers}</p>
      <p>Total Transactions: {analytics.totalTransactions}</p>
      <p>Total Revenue: ${analytics.totalRevenue?.toFixed(2)}</p>

      <h2>User Management</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.isAvailable ? "Available" : "Unavailable"}</td>
              <td>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
