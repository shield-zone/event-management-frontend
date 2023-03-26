import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import {
  theme,
  ChakraProvider,
  Container,
  Box,
  Text,
  Link,
  VStack,
  Input,
  Button,
} from "@chakra-ui/react";

import { AuthContext } from "../service/authContext";

function Organiserform() {
  const router = useRouter();
  const { state, dispatch } = useContext(AuthContext);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [presentSince, setPresentSince] = useState("");
  const [rating, setRating] = useState("");
  const [website, setWebsite] = useState("");

  const myphoneNumber = (data) => setPhoneNumber(data);
  const mypresentSince = (data) => setPresentSince(data);
  const myrating = (data) => setRating(data);
  const mywebsite = (data) => setWebsite(data);

  const handleBtnClick = () => {
    dispatch({
      type: "LOGIN",
      payload: {},
    });
    router.push("/Event");
  };

  return (
    <ChakraProvider theme={theme}>
      <Container>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Box borderWidth="1px" borderRadius="1g" p={4} className="background">
          <Text align="center" className="tex">
            Add Details
          </Text>
          <br></br>
          <VStack spacing={2} align="stretch">
            <Input
              placeholder="Phone Number"
              defaultValue={phoneNumber}
              onChange={(e) => myphoneNumber(e.target.value)}
            />
            <Input
              placeholder="Present Since"
              defaultValue={presentSince}
              onChange={(e) => mypresentSince(e.target.value)}
            />
            <Input
              placeholder="Rating"
              defaultValue={rating}
              onChange={(e) => myrating(e.target.value)}
            />
            <Input
              placeholder="Website Name"
              defaultValue={website}
              onChange={(e) => mywebsite(e.target.value)}
            />
          </VStack>
          <br></br>
          <Button
            colorScheme="teal"
            variant="solid"
            width="100%"
            onClick={() => handleBtnClick()}
          >
            Add Event
          </Button>
        </Box>
      </Container>
    </ChakraProvider>
  );
}

export default Organiserform;
