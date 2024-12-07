import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Edit2, Trash2, Search } from "lucide-react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, [page]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://reqres.in/api/users?page=${page}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user.id !== id));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 transition-all duration-300">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        User List
      </h2>
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition-colors duration-300 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>
      {isLoading ? (
        <div className="text-center text-black dark:text-white">Loading...</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={user.avatar}
                  alt={`${user.first_name} ${user.last_name}`}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{`${user.first_name} ${user.last_name}`}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {user.email}
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <Link
                  to={`/edit-user/${user.id}`}
                  className="text-blue-500 hover:text-blue-600 mr-2"
                >
                  <Edit2 size={20} />
                </Link>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="mx-1 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="mx-2 py-2 dark:text-white">{`Page ${page} of ${totalPages}`}</span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="mx-1 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
