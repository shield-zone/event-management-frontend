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
  const [locationFormOpen, setLocationFormOpen] = useState(false);

  const options = [
    { value: "delhi", label: "Delhi" },
    { value: "mumbai", label: "Mumbai" },
    { value: "kolkata", label: "Kolkata" },
    { value: "chennai", label: "Chennai" },
    { value: "bangalore", label: "Bangalore" },
  ];

  const validated = () => {
    if (
      eventData.event_name !== "" &&
      eventData.location !== "" &&
      eventData.organizer !== ""
    ) {
      return true;
    }
    return false;
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
      btnAction(eventData);
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
          <Input
            type="text"
            placeholder="Organizer Name"
            name="organizerName"
            value={eventData.organizerName}
            onChange={handleChange}
            mb={2}
          />
          <Box>
            <Text fontWeight={"bold"}>Event Start Date</Text>
            <Input
              type="date"
              placeholder="Event Start Date"
              name="eventStartDate"
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
              name="eventEndDate"
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
          {/* Add Event Location part here */}
          <Select
            value={eventData.location}
            onChange={(e) =>
              setEventData((state) => ({ ...state, location: e.target.value }))
            }
          >
            <option value={""} disabled>
              Select Event Location
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
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
            {"Can't"} find your location?
          </Button>
          <Input
            type="number"
            placeholder="Organizer Phone Number"
            name="organizerPhoneNumber"
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
