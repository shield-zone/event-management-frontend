import { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Button,
  ModalOverlay,
  ModalContent,
  Input,
  Box,
  Text,
} from "@chakra-ui/react";
const Updateform = ({ isOpen, onClose }) => {
  const [updateeventData, setUpdateeventData] = useState({});

  const handleChange = (e) => {
    setUpdateeventData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleModalClose = () => {
    onClose();
  };


return(
  <Modal isOpen={isOpen} onClose={handleModalClose}>
      <ModalOverlay />
      <ModalContent>
      <ModalHeader>Update Event</ModalHeader>
        <ModalCloseButton />
        <ModalBody>

          <Input
            mb={2}
            type="text"
            placeholder="Event Name"
            name="eventName"
            value={updateeventData.eventName}
            onChange={handleChange}
          />

          <Box>
            <Text fontWeight={"bold"}>Event Start Date</Text>
            <Input
              type="date"
              placeholder="Event Start Date"
              name="startDate"
              value={updateeventData.eventStartDate}
              onChange={handleChange}
              mb={2}
            />
          </Box>

          <Box>
            <Text fontWeight={"bold"}>Event End Date: </Text>
            <Input
              type="date"
              placeholder="Event End Date"
              name="endDate"
              value={updateeventData.eventEndDate}
              onChange={handleChange}
              mb={2}
            />
          </Box>

          <Input
            type="number"
            placeholder="Event Price"
            name="eventPrice"
            value={updateeventData.eventPrice}
            onChange={handleChange}
            mb={2}
          />
          
          <Input
            type="number"
            placeholder="Organizer Phone Number"
            name="phoneNumber"
            value={updateeventData.organizerPhoneNumber}
            onChange={handleChange}
            mb={2}
          />

          <Box>
            <Text fontWeight={"bold"}>Organizer Residing Since: </Text>
            <Input
              type="number"
              placeholder="Organizer Present at location Since"
              name="presentSince"
              value={updateeventData.presentSince}
              onChange={handleChange}
              mb={2}
            />
          </Box>

          <Input
            type="number"
            min={0}
            max={5}
            placeholder="Organizer Rating"
            name="rating"
            value={updateeventData.rating}
            onChange={handleChange}
            mb={2}
          />

          <Input
            type="text"
            placeholder="Organizer Website"
            name="website"
            value={updateeventData.website}
            onChange={handleChange}
          />
          <Input
            type="text"
            placeholder="Address"
            name="address"
            value={updateeventData.address}
            onChange={handleChange}
            mb={2}
          />

          <Input
            type="text"
            name="locationName"
            placeholder="City"
            value={updateeventData.locationName}
            onChange={handleChange}
            mb={2}
          />

          <Input
            type="number"
            name="pincode"
            placeholder="Pincode"
            value={updateeventData.pincode}
            onChange={handleChange}
            mb={2}
          />

          <Input
            type="text"
            name="state"
            placeholder="State"
            value={updateeventData.state}
            onChange={handleChange}
            mb={2}
          />

          <Input
            type="text"
            name="country"
            placeholder="Country"
            value={updateeventData.country}
            onChange={handleChange}
            mb={2}
          />          
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={() => handleModalClose()}>
            Close
          </Button>
          <Button colorScheme="orange" onClick={Updateform}>
            Update Fields
          </Button>
        </ModalFooter>

      </ModalContent>
    </Modal>
);
}

export default Updateform;