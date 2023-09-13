import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, useDisclosure, Text } from "@chakra-ui/react";

import "./table.scss";
import CustomModal from "../CustomModal";

const Table = () => {
  const defaultUser = {
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    avatar: ""
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedUser, setEditedUser] = useState(defaultUser);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditedUser(user);
    onOpen(); // Open the modal
  };

  const handleSaveUser = (updatedUser) => {
    // Find the index of the updated user in the data array
    const updatedIndex = data.findIndex((user) => user.id === updatedUser.id);
    if (updatedIndex !== -1) {
      // Create a copy of the data array and replace the user with the updated user
      const updatedData = [...data];
      updatedData[updatedIndex] = updatedUser;
      setData(updatedData);
    }
  };

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

  return (
    <Fragment>
      <Box>
        <Text
          color="#002E63"
          textAlign="Center"
          fontSize={{ base: "36px" }}
          fontWeight={700}
          marginTop="15px"
        >
          User Table
        </Text>

        <Box className="table">
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
                      <Button onClick={() => handleEditClick(userData)}>
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Box>

        <CustomModal
          isOpen={isOpen}
          onClose={onClose}
          user={selectedUser}
          editedUser={editedUser}
          updateEditedUser={setEditedUser}
          onSave={handleSaveUser}
        />
      </Box>
    </Fragment>
  );
};

export default Table;
