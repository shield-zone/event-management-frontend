import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import {
  theme,
  ChakraProvider,
  Container,
  Box,
  Text,
  VStack,
  Input,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  Spinner,
} from "@chakra-ui/react";
import NextLink from "next/link";

import { AuthContext } from "../service/authContext";

function Userregister() {
  const router = useRouter();
  const { state, dispatch } = useContext(AuthContext);

  const [showPage1, setShowPage1] = useState(true);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (state.isAuthenticated) {
      router.push("/Event");
    }
  }, [state.isAuthenticated]);

  const myName = (data) => setName(data);
  const myuserName = (data) => setUserName(data);
  const mypassword = (data) => setPassword(data);

  const togglePage = () => {
    setShowPage1(!showPage1);
  };

  const save = () => {
    setLoading(true);

    var userObj = {
      name,
      password,
      role,
      userName,
    };
    console.log(userObj);
    fetch("http://localhost:8090/api/v1/users/register", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify(userObj),
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          return response.json();
        } else if (response.status === 400) {
          setErrorMessage("Invalid Details");
        } else {
          setErrorMessage("Something went wrong");
        }
        setLoading(false);
      })
      .then((data) => {
        setLoading(false);
        if (data) {
          router.push("/Login");
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <ChakraProvider theme={theme}>
      <Container className="container">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Box borderWidth="2px" borderRadius="3g" p={4} className="background">
          {/* <label className="switch">
            <input type="checkbox" onChange={togglePage} checked={showPage1} />
            <span className="slider"></span>
            <span className="text">{showPage1 ? "Organiser" : "Attendee"}</span>
          </label> */}
          <Text fontSize="2xl" align="center" fontWeight="10000">
            Create Account
          </Text>
          <Text fontSize="md" align="center">
            Already have an Account ?{" "}
            <NextLink href={"/Login"} color="red">
              <span style={{ color: "red" }}>Login</span>
            </NextLink>
          </Text>
          <br></br>
          {errorMessage && (
            <Alert status="error" my={2}>
              <AlertIcon />
              <AlertTitle mr={2}>{errorMessage}</AlertTitle>
            </Alert>
          )}
          <VStack spacing={2} align="stretch">
            <Input
              placeholder="User Name"
              defaultValue={name}
              onChange={(e) => myName(e.target.value)}
            />
            <Input
              placeholder="Email Id"
              defaultValue={userName}
              onChange={(e) => myuserName(e.target.value)}
            />
            <Input
              placeholder="Password"
              defaultValue={password}
              type="password"
              onChange={(e) => mypassword(e.target.value)}
            />
          </VStack>
          <br></br>
          <Button
            colorScheme="teal"
            variant="solid"
            width="100%"
            onClick={(e) => save()}
          >
            {!loading ? "Create User" : <Spinner />}
          </Button>
        </Box>
      </Container>
    </ChakraProvider>
  );
}

export default Userregister;
