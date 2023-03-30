import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@chakra-ui/react";
import CreateEventForm from "./CreateEventForm";

const LocationForm = ({ isOpen, onClose, onLocationSubmit}) => {
  const [locationData, setLocationData] = useState({});

  const handleChange = (e) => {
    setLocationData((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLocationSubmit = () => {
    onLocationSubmit(locationData);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Location Form</ModalHeader>

        <ModalBody>
          <Input
            type="text"
            placeholder="Address"
            name="address"
            value={locationData.address}
            onChange={handleChange}
            mb={2}
          />
          <Input
            type="text"
            name="locationName"
            placeholder="City"
            value={locationData.locationName}
            onChange={handleChange}
            mb={2}
          />
          <Input
            type="number"
            name="pincode"
            placeholder="Pincode"
            value={locationData.pincode}
            onChange={handleChange}
            mb={2}
          />
          <Input
            type="text"
            name="state"
            placeholder="State"
            value={locationData.state}
            onChange={handleChange}
            mb={2}
          />
          <Input
            type="text"
            name="country"
            placeholder="Country"
            value={locationData.country}
            onChange={handleChange}
            mb={2}
          />
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose} mr={2}>
            Close
          </Button>
          <Button colorScheme="orange" onClick={handleLocationSubmit} >+ Add Location</Button>
          <CreateEventForm locationData/>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LocationForm;
