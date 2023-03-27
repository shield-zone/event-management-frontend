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
        <ModalHeader>{data.eventName}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Image
            src={`https://source.unsplash.com/random?${data.eventType}&${data.eventId}}`}
            alt={data.eventName}
            width={"100%"}
          />
          <Stack mt="6" spacing="3">
            <Text>
              <span style={{ fontWeight: "bold" }}>Event Type</span>
              {" " + data.eventType}
            </Text>
            <Text>
              <span style={{ fontWeight: "bold" }}>Price</span>
              {" $" + data.eventPrice}
            </Text>
            <Text>
              <span style={{ fontWeight: "bold" }}>Start Date</span>
              {" $" + data.startDate}
            </Text>
            <Text>
              <span style={{ fontWeight: "bold" }}>End Date</span>
              {" $" + data.endDate}
            </Text>
            <Text>
              <span style={{ fontWeight: "bold" }}>Location</span>
              {" " +
                `${data?.location?.address} ${data?.location?.locationName}, ${data?.location?.state}, ${data?.location?.country}`}
            </Text>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={handleModalClose}>
            Close
          </Button>
          {actionBtnText ? (
            <Button colorScheme="orange" onClick={() => btnAction(data)}>
              {actionBtnText}
            </Button>
          ) : null}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EventModal;
