import { useState, useContext } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { AuthContext } from "../service/authContext";
import { putEventDetails } from "../pages/api/api";

const UpdateEventForm = ({ isOpen, onClose, data, onChange, setModalData }) => {
  const [loading, setLoading] = useState(false);

  const { state, dispatch } = useContext(AuthContext);

  const updateEvent = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await putEventDetails(state, data);
      console.log(res);

      if (res.status === 200) {
        const resData = await res.json();
        setModalData(resData);
        console.log(resData);
        onClose();
      } else if (res.status === 403) {
        dispatch({ type: "LOGOUT" });
      } else {
        alert("Failed to update details");
      }
    } catch (err) {
      alert("Failed to update details");
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    onChange((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Event Details</ModalHeader>
        <ModalBody display="flex" flexDirection={"column"} gap="2">
          <Input
            type="text"
            placeholder="Event Name"
            name="eventName"
            value={data.eventName}
            onChange={handleChange}
          />

          <Input
            type="text"
            placeholder="Event Price"
            name="eventPrice"
            value={data.eventPrice}
            onChange={handleChange}
          />

          <Text>Event Start Date</Text>
          <Input
            type="date"
            placeholder="Start Date"
            name="startDate"
            value={data.startDate}
            onChange={handleChange}
          />

          <Text>Event End Date</Text>
          <Input
            type="date"
            placeholder="End Date"
            name="endDate"
            value={data.endDate}
            onChange={handleChange}
          />

          <Button type="submit" colorScheme="orange" onClick={updateEvent}>
            {loading ? <Spinner /> : "Update"}
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default UpdateEventForm;
