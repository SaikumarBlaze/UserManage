import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line
  }, [id]);

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://reqres.in/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch user details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.put(`https://reqres.in/api/users/${id}`, user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("User updated successfully");
      navigate("/users");
    } catch (error) {
      toast.error("Failed to update user");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center text-black dark:text-white">Loading...</div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 max-w-md mx-auto transition-all duration-300">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Edit User
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="first_name"
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
          >
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={user.first_name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="last_name"
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
          >
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={user.last_name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/users")}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
