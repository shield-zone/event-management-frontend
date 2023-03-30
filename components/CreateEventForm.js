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
  Select,
  Box,
  Text,
} from "@chakra-ui/react";
import LocationForm from "./LocationForm";

const CreateEventForm = ({ isOpen, onClose, data, btnAction }) => {
  const [eventData, setEventData] = useState({});
  const [locationData, setLocationData] = useState({});
  const [locationFormOpen, setLocationFormOpen] = useState(false);

  const validated = () => {
    return true;
  };

  const handleChange = (e) => {
    setEventData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleModalClose = () => {
    setEventData({
      event_name: "",
      location: "",
      organizer: "",
    });
    onClose();
  };

  const handleCreateEvent = () => {
    if (validated()) {
      const apiBody = {
        ...eventData,
        ...locationData,
      };

      btnAction(apiBody);
      setEventData({});
      setLocationData({});
      handleModalClose();
    } else {
      alert("Please fill all the fields");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a new Event</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          {locationFormOpen && (
            <LocationForm
              isOpen={locationFormOpen}
              onClose={() => setLocationFormOpen(false)}
              data={locationData}
              action={setLocationData}
            />
          )}

          <Input
            mb={2}
            type="text"
            placeholder="Event Name"
            name="eventName"
            value={eventData.eventName}
            onChange={handleChange}
          />

          <Box>
            <Text fontWeight={"bold"}>Event Start Date</Text>
            <Input
              type="date"
              placeholder="Event Start Date"
              name="startDate"
              value={eventData.eventStartDate}
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
              value={eventData.eventEndDate}
              onChange={handleChange}
              mb={2}
            />
          </Box>

          <Input
            type="number"
            placeholder="Event Price"
            name="eventPrice"
            value={eventData.eventPrice}
            onChange={handleChange}
            mb={2}
          />

          <Input
            type="text"
            placeholder="Event Type"
            name="eventType"
            value={eventData.eventType}
            onChange={handleChange}
            mb={2}
          />

          <Input
            type="number"
            placeholder="Organizer Phone Number"
            name="phoneNumber"
            value={eventData.organizerPhoneNumber}
            onChange={handleChange}
            mb={2}
          />

          <Box>
            <Text fontWeight={"bold"}>Organizer Residing Since: </Text>
            <Input
              type="date"
              placeholder="Organizer Present at location since"
              name="presentSince"
              value={eventData.presentSince}
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
            value={eventData.rating}
            onChange={handleChange}
            mb={2}
          />

          <Input
            type="text"
            placeholder="Organizer Website"
            name="website"
            value={eventData.website}
            onChange={handleChange}
          />

          <Button
            p={0}
            mb={2}
            variant={"ghost"}
            _hover={{
              textDecoration: "underline",
              backgroundColor: "transparent",
            }}
            onClick={() => setLocationFormOpen(true)}
          >
            Add event location
          </Button>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={() => handleModalClose()}>
            Close
          </Button>
          <Button colorScheme="orange" onClick={handleCreateEvent}>
            Create Event
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateEventForm;
