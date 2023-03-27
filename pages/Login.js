import React, { useState, useContext, useEffect } from "react";
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
import axios from 'axios'

import { AuthContext } from "../service/authContext";

function Login() {

  const { state, dispatch } = useContext(AuthContext);
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  
  const myuserName = (data) => setUserName(data);
  const mypassword = (data) => setPassword(data);

  useEffect(() => {
    if (state.isAuthenticated) {
      router.push("/Event");
    }
  }, [state.isAuthenticated]);


  const getLogin= () => {

    var userlogin = {
      userName,
      password
    };
    console.log(userlogin);

    fetch("http://localhost:8090/api/v1/secure/login", {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(userlogin)
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch(err => console.log(err));
    
        dispatch({
          type: "LOGIN",
          payload: {}, // pass authtoken here
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
        <Box borderWidth="1px" borderRadius="1g" p={4} className="background">
          <Text align="center" className="tex">
            Login Account
          </Text>
          <br></br>
          <VStack spacing={2} align="stretch">
            <Input
              placeholder="Email Id"
              defaultValue={userName}
              onChange={(e) => myuserName(e.target.value)}
            />
            <Input
              placeholder="Password"
              defaultValue={password}
              onChange={(e) => mypassword(e.target.value)}
            />
          </VStack>
          <br></br>
          <Button
            colorScheme="teal"
            variant="solid"
            width="100%"
            onClick={(e) => getLogin()}
          >
            login
          </Button>
        </Box>
      </Container>
    </ChakraProvider>
  );
}

export default Login;
