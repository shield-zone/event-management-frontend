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
import { putLocationDetails } from "../pages/api/api";

const UpdateLocationForm = ({
  isOpen,
  onClose,
  data,
  onChange,
  setModalData,
}) => {
  const { state, dispatch } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const updateLocation = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await putLocationDetails(state, data.location);
      console.log(res);

      if (res.status === 200) {
        const resData = await res.json();
        setModalData((data) => ({
          ...data,
          location: resData,
        }));
        console.log(resData);
        onClose();
      } else if (res.status === 403) {
        dispatch({ type: "LOGOUT" });
      } else {
        alert("Failed to update details");
      }
    } catch (err) {
      console.log(err);
      alert("Failed to update details");
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    onChange((state) => ({
      ...state,
      location: {
        ...state.location,
        [e.target.name]: e.target.value,
      },
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Location Details</ModalHeader>
        <ModalBody display="flex" flexDirection={"column"} gap="2">
          <Input
            type="text"
            placeholder="Location Name"
            name="locationName"
            value={data.location.locationName}
            onChange={handleChange}
          />

          <Input
            type="text"
            placeholder="Address"
            name="address"
            value={data.location.address}
            onChange={handleChange}
          />

          <Input
            type="text"
            placeholder="Pincode"
            name="pincode"
            value={data.location.pincode}
            onChange={handleChange}
          />

          <Input
            type="text"
            placeholder="State"
            name="state"
            value={data.location.state}
            onChange={handleChange}
          />

          <Input
            type="text"
            placeholder="country"
            name="country"
            value={data.location.country}
            onChange={handleChange}
          />

          <Button type="submit" colorScheme="orange" onClick={updateLocation}>
            {loading ? <Spinner /> : "Update"}
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default UpdateLocationForm;
