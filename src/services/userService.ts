import apiClient from "./apiClient";

// Define types
export interface User {
  id: number;
  name: string;
  email: string;
}

// Mock data for users
const mockUsers: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com" },
];

// Function to get all users
export const getUsers = async (): Promise<User[]> => {
  // In a real application, this would be an actual API call
  // return await apiClient.get('/users').then(response => response.data);

  // Mock implementation with artificial delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(mockUsers);
    }, 500); // 500ms delay to simulate network request
  });
};

// Function to get a user by ID
export const getUserById = async (id: number): Promise<User | undefined> => {
  // In a real application, this would be an actual API call
  // return await apiClient.get(`/users/${id}`).then(response => response.data);

  // Mock implementation with artificial delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = mockUsers.find((user) => user.id === id);
      resolve(user);
    }, 500); // 500ms delay to simulate network request
  });
};
