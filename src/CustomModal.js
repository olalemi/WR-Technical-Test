import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  Input,
  Button,
  Box,
  Flex
} from "@chakra-ui/react";

const CustomModal = ({
  isOpen,
  onClose,
  editedUser,
  updateEditedUser,
  onSave
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateEditedUser((prevEditedUser) => ({
      ...prevEditedUser,
      [name]: value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave(editedUser);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={{ base: "sm", md: "2xl" }}>
      <ModalOverlay />
      <ModalContent
        backgroundColor="#002E63"
        borderRadius="10px"
        marginTop={{ base: "40%", sm: "5%" }}
        marginLeft={4}
        marginRight={4}
      >
        <ModalCloseButton backgroundColor="#002E63" Color="#15e8c5" />

        <ModalBody
          style={{
            backgroundColor: "#002E63",
            borderRadius: "16px",
            padding: "25px 30px 50px "
          }}
        >
          <ModalHeader
            style={{
              color: "#fff",
              textAlign: "center",
              fontWeight: "700"
            }}
            mt={5}
            fontSize={{ base: "24px", md: "40px" }}
          >
            Edit User
          </ModalHeader>

          <form
            onSubmit={handleSave}
            style={{
              padding: "0px 25px 0px 25px"
            }}
          >
            <Box>
              <Flex justifyContent="space-between">
                <Box flexBasis="48%">
                  <FormLabel color="#fff" mt="20px">
                    First Name
                  </FormLabel>
                  <Input
                    id="first_name"
                    color="#fff"
                    name="first_name"
                    type="text"
                    placeholder="First Name"
                    size={{ base: "md", md: "lg" }}
                    _placeholder={{ color: "#fff" }}
                    fontSize={{ base: "14px", md: "16px" }}
                    onChange={handleInputChange}
                    value={editedUser.first_name}
                    focusBorderColor="white"
                    colorScheme="whiteText"
                    variant="outline"
                    required
                  />
                </Box>

                <Box flexBasis="48%">
                  <FormLabel color="#fff" mt="20px">
                    Last Name
                  </FormLabel>
                  <Input
                    id="last_name"
                    color="#fff"
                    name="last_name"
                    type="text"
                    placeholder="Last Name"
                    size={{ base: "md", md: "lg" }}
                    _placeholder={{ color: "#fff" }}
                    fontSize={{ base: "14px", md: "16px" }}
                    onChange={handleInputChange}
                    value={editedUser.last_name}
                    focusBorderColor="white"
                    colorScheme="whiteText"
                    variant="outline"
                  />
                </Box>
              </Flex>
            </Box>

            <FormLabel color="#fff" mt="20px">
              Email Address
            </FormLabel>
            <Input
              id="email"
              color="#fff"
              name="email"
              type="email"
              placeholder="name@example.com"
              size={{ base: "md", md: "lg" }}
              _placeholder={{ color: "#fff" }}
              fontSize={{ base: "14px", md: "16px" }}
              onChange={handleInputChange}
              value={editedUser.email}
              focusBorderColor="white"
              colorScheme="whiteText"
              variant="outline"
              required
            />

            <FormLabel color="#fff" mt="20px">
              Avatar URL
            </FormLabel>
            <Input
              id="avatar"
              color="#fff"
              name="avatar"
              type="text"
              placeholder="Avatar URL"
              size={{ base: "md", md: "lg" }}
              _placeholder={{ color: "#fff" }}
              fontSize={{ base: "14px", md: "16px" }}
              onChange={handleInputChange}
              value={editedUser.avatar}
              focusBorderColor="white"
              colorScheme="whiteText"
              variant="outline"
            />

            <Button
              type="submit"
              style={{
                backgroundColor: "#15e8c5",
                color: "#fff",
                fontSize: "20px",
                fontWeight: "600",
                borderRadius: "15px",
                padding: "10px 24px",
                height: "60px",
                marginTop: "20px",
                width: "100%"
              }}
            >
              Save
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
