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
// import axios from 'axios'

import { AuthContext } from "../service/authContext";

function Login() {
  const { state, dispatch } = useContext(AuthContext);
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (state.isAuthenticated) {
      router.push("/Event");
    }
  }, [state.isAuthenticated]);

  const myuserName = (data) => setUserName(data);
  const mypassword = (data) => setPassword(data);

  function getLogin() {
    console.log(userName);
    console.log(password);
    //   axios({url:'',
    //   method:'POST'
    //   ,params:{user_name,password}
    //   ,withCredentials:true
    // })
    // .then(response=>{
    // setLstData(response.data.lstData)
    dispatch({
      type: "LOGIN",
      payload: {}, // pass authtoken here
    });
    // })

    router.push("/Event");
  }

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
