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
import UpdateEventModal from "./UpdateEventModal";

const EventModal = ({
  isOpen,
  setEventModalOpen,
  data,
  btnAction,
  actionBtnText,
  updateModalOpen,
  closeUpdateModal,
  setModalData,
  setEventData,
}) => {
  const handleModalClose = () => {
    setEventModalOpen(false);
  };

  const handleUpdateModalClose = () => {
    setEventData((eventData) =>
      eventData.map((item) => {
        if (item.eventId === data.eventId) {
          return data;
        }

        return item;
      })
    );
    closeUpdateModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{data.eventName}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <UpdateEventModal
            isOpen={updateModalOpen}
            onClose={handleUpdateModalClose}
            data={data}
            setModalData={setModalData}
          />
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
              {" Rs." + data.eventPrice}
            </Text>
            <Text>
              <span style={{ fontWeight: "bold" }}>Start Date</span>
              {" " + data.startDate}
            </Text>
            <Text>
              <span style={{ fontWeight: "bold" }}>End Date</span>
              {" " + data.endDate}
            </Text>
            <Text>
              <span style={{ fontWeight: "bold" }}>Location</span>
              {" " +
                `${data?.location?.address} ${data?.location?.locationName}, ${data?.location?.state}, ${data?.location?.country}`}
            </Text>
          </Stack>
        </ModalBody>

        <ModalFooter>
          {btnAction.map((action, index) => (
            <>
              <Button
                colorScheme={!index ? "red" : "orange"}
                mr={3}
                onClick={action}
              >
                {actionBtnText[index]}
              </Button>
            </>
          ))}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EventModal;
