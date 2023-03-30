import { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import UpdateEventForm from "./UpdateEventForm";
import UpdateLocationForm from "./UpdateLocationForm";

const UpdateEventModal = ({ isOpen, onClose, data, setModalData }) => {
  const [eventFormOpen, setEventFormOpen] = useState(false);
  const [locationFormOpen, setLocationFormOpen] = useState(false);
  const [eventData, setEventData] = useState(data);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Detail</ModalHeader>

        <ModalBody display="flex" flexDirection={"column"} gap="2">
          <Button colorScheme="orange" onClick={() => setEventFormOpen(true)}>
            Update Event Details
          </Button>
          <Button
            colorScheme="orange"
            onClick={() => setLocationFormOpen(true)}
          >
            Update Location Details
          </Button>
        </ModalBody>

        <UpdateEventForm
          isOpen={eventFormOpen}
          onClose={() => setEventFormOpen(false)}
          data={eventData}
          onChange={setEventData}
          setModalData={setModalData}
        />

        <UpdateLocationForm
          isOpen={locationFormOpen}
          onClose={() => setLocationFormOpen(false)}
          data={eventData}
          onChange={setEventData}
          setModalData={setModalData}
        />
      </ModalContent>
    </Modal>
  );
};

export default UpdateEventModal;
