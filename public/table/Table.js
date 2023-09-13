import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useDisclosure} from "@chakra-ui/react";
import "./table.scss";

const Table = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  async function fetchData() {
    try {
      // Fetch the first page
      const response1 = await axios.get("https://reqres.in/api/users?page=1");

      // Fetch the second page
      const response2 = await axios.get("https://reqres.in/api/users?page=2");

      // Combine the data from both pages
      const combinedData = [
        ...response1.data.data,
        ...response2.data.data.slice(0, 4)
      ];

      setData(combinedData);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  const openEditModal = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = async () => {
    // Implement the logic to save the edited user data to the Reqres API here.
    // You can use the `editingUser` state to get the user data.
    // Don't forget to handle errors and update the UI accordingly.

    // After saving, close the modal.
    setIsModalOpen(false);
  };

  return (
    <Fragment>
      <div>
        <h2 className="header">User Table</h2>

        <div className="table">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th className="user-element">Name</th>
                  <th className="user-element">Email Address</th>
                  <th className="user-element">Photo</th>
                  <th className="user-element">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((userData) => (
                  <tr key={userData.id}>
                    <td className="user-element">
                      {userData.first_name} {userData.last_name}
                    </td>
                    <td className="user-element">{userData.email}</td>
                    <td className="user-element">
                      <img
                        src={userData.avatar}
                        alt={`${userData.first_name}'s avatar`}
                        width="50"
                        height="50"
                      />
                    </td>
                    <td className="user-element">
                      <button onClick={() => openEditModal(userData)}>
                        Edit
                      </button>
                      {/* <button  onClick={onOpen}>Edit</button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Edit User Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit User</h2>
            <form>
              <label>
                First Name:
                <input
                  type="text"
                  value={editingUser.first_name}
                  onChange={(e) =>
                    setEditingUser({
                      ...editingUser,
                      first_name: e.target.value
                    })
                  }
                />
              </label>
              <label>
                Last Name:
                <input
                  type="text"
                  value={editingUser.last_name}
                  onChange={(e) =>
                    setEditingUser({
                      ...editingUser,
                      last_name: e.target.value
                    })
                  }
                />
              </label>
              <label>
                Email Address:
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, email: e.target.value })
                  }
                />
              </label>
              <label>
                Avatar URL:
                <input
                  type="text"
                  value={editingUser.avatar}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, avatar: e.target.value })
                  }
                />
              </label>
            </form>
            <div className="modal-buttons">
              <button onClick={handleSave}>Save</button>
              <button onClick={closeEditModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Table;
