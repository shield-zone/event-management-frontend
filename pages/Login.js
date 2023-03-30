import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
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
  Alert,
  AlertIcon,
  AlertTitle,
  Spinner,
} from "@chakra-ui/react";
import Cookies from "js-cookie";

import { AuthContext } from "../service/authContext";

function Login() {
  const { state, dispatch } = useContext(AuthContext);
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const myuserName = (data) => setUserName(data);
  const mypassword = (data) => setPassword(data);

  useEffect(() => {
    if (state.isAuthenticated) {
      router.push("/Event");
    }
  }, [state.isAuthenticated]);

  const getLogin = () => {
    if (loading) return;
    setErrorMessage("");
    setLoading(true);

    var userlogin = {
      userName,
      password,
    };

    fetch("http://localhost:8090/api/v1/secure/login", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify(userlogin),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 400) {
          setLoading(false);
          setErrorMessage("Invalid Credentials");
        } else {
          setLoading(false);
          setErrorMessage("Failed to Login");
        }
      })
      .then((data) => {
        if (data) {
          Cookies.set("user", data.token);
          Cookies.set("userId", data?.user.userId);
          Cookies.set("userName", data?.user.userName);
          dispatch({
            type: "LOGIN",
            payload: data
          });
          router.push("/Event");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <ChakraProvider theme={theme}>
      <Container >
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
          {errorMessage && (
            <Alert status="error" my={2}>
              <AlertIcon />
              <AlertTitle mr={2}>{errorMessage}</AlertTitle>
            </Alert>
          )}
          <VStack spacing={2} align="stretch">
            <Input
              placeholder="Email Id"
              defaultValue={userName}
              onChange={(e) => myuserName(e.target.value)}
            />
            <Input
              placeholder="Password"
              defaultValue={password}
              type='password'
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
            {!loading ? "Login" : <Spinner />}
          </Button>
          <Text textAlign="right" mt="3">New User? <NextLink href={"/Userregister"}>
              <span style={{color: "red"}}>Register</span>
            </NextLink>
            </Text>
        </Box>
      </Container>
    </ChakraProvider>
  );
}

export default Login;
