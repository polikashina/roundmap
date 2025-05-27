import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers, getUserById, User } from "../../services/userService";

const UsersPage: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  // Query to fetch all users
  const {
    data: users,
    isLoading: isLoadingUsers,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    throwOnError: true,
  });

  // Query to fetch a specific user by ID (only runs when selectedUserId is not null)
  const {
    data: selectedUser,
    isLoading: isLoadingUser,
    error: userError,
  } = useQuery({
    queryKey: ["user", selectedUserId],
    queryFn: () => getUserById(selectedUserId!),
    enabled: selectedUserId !== null, // Only run this query when we have a selectedUserId
  });

  // Handle user selection
  const handleSelectUser = (userId: number) => {
    setSelectedUserId(userId);
  };

  // Clear selected user
  const handleClearSelection = () => {
    setSelectedUserId(null);
  };

  if (isLoadingUsers) {
    return <div>Loading users...</div>;
  }

  if (usersError) {
    return <div>Error loading users: {(usersError as Error).message}</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Users</h1>
      <p>This page demonstrates React Query with mock data</p>

      <div style={{ display: "flex", gap: "20px" }}>
        {/* Users list */}
        <div style={{ flex: 1 }}>
          <h2>All Users</h2>
          <ul>
            {users?.map((user) => (
              <li key={user.id} style={{ marginBottom: "10px" }}>
                <button onClick={() => handleSelectUser(user.id)}>
                  {user.name} ({user.email})
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Selected user details */}
        <div
          style={{
            flex: 1,
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <h2>User Details</h2>
          {selectedUserId === null ? (
            <p>Select a user to view details</p>
          ) : isLoadingUser ? (
            <p>Loading user details...</p>
          ) : userError ? (
            <p>Error loading user: {(userError as Error).message}</p>
          ) : selectedUser ? (
            <div>
              <p>
                <strong>ID:</strong> {selectedUser.id}
              </p>
              <p>
                <strong>Name:</strong> {selectedUser.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <button onClick={handleClearSelection}>Clear Selection</button>
            </div>
          ) : (
            <p>User not found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
