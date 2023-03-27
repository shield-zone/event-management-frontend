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
} from "@chakra-ui/react";
import NextLink from "next/link";
import axios from 'axios'

import { AuthContext } from "../service/authContext";

function Userregister() {
  const router = useRouter();
  const { state, dispatch } = useContext(AuthContext);

  const [showPage1, setShowPage1] = useState(true);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  
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
    var userObj = {
      name,
      password,
      role,
      userName
    };
    
    fetch("http://localhost:8090/api/v1/users/register", {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(userObj)
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch(err => console.log(err));
    if (!showPage1) {
      dispatch({
        type: "LOGIN",
        payload: userObj,
      });
      router.push("/Event");
    } else {
      router.push("/Organiserform");
    }
  };


  return (
    <ChakraProvider theme={theme}>
      <Container>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Box borderWidth="2px" borderRadius="3g" p={4} className="background">
          <label className="switch">
            <input type="checkbox" onChange={togglePage} checked={showPage1} />
            <span className="slider"></span>
            <span className="text">{showPage1 ? "Organiser" : "Attendee"}</span>
          </label>
          <Text font size="2xl" align="center" fontWeight="10000">
            Create Account
          </Text>
          <Text font size="md" align="center">
            Already have an Account ? <NextLink href={"/Login"} color='red'>Login</NextLink>
          </Text>
          <br></br>
          <VStack spacing={2} align="stretch">
            <Input
              placeholder="Name"
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
              type="password"
              defaultValue={password}
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
            Create User
          </Button>
        </Box>
      </Container>
    </ChakraProvider>
  );
}

export default Userregister;
