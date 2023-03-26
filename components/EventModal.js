import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Button,
  ModalOverlay,
  ModalContent,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

const EventModal = ({
  isOpen,
  setEventModalOpen,
  data,
  btnAction,
  actionBtnText,
}) => {
  const handleModalClose = () => {
    setEventModalOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{data.event_name}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Image
            src="https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fHRlYW18ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
            alt={data.event_name}
            width={"sm"}
          />
          <Stack mt="6" spacing="3">
            <Text>
              <span style={{ fontWeight: "bold" }}>Organizer</span>
              {" " + data.organizer}
            </Text>
            <Text>
              <span style={{ fontWeight: "bold" }}>Location</span>
              {" " + data.location}
            </Text>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={handleModalClose}>
            Close
          </Button>
          <Button colorScheme="orange" onClick={() => btnAction(data)}>
            {actionBtnText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EventModal;
