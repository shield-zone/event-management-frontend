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
//import axios from 'axios'

import { AuthContext } from "../service/authContext";

function Userregister() {
  const router = useRouter();
  const { state, dispatch } = useContext(AuthContext);

  const [showPage1, setShowPage1] = useState(true);
  const [Name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (state.isAuthenticated) {
      router.push("/Event");
    }
  }, [state.isAuthenticated]);

  const myName = (data) => setName(data);
  const myuserName = (data) => setUserName(data);
  const mypassword = (data) => setPassword(data);
  const myrole = (data) => setRole(data);

  const togglePage = () => {
    setShowPage1(!showPage1);
  };

  const save = () => {
    var userObj = {
      userName,
      password,
      Name,
      role,
    };
    /*axios({
      url:'http://13.126.35.191:7323/atcc1/customer/save'
      ,method:'POST'
      ,params:{userObj:JSON.stringify(userObj)}
      ,withCredentials:true
    }).then(response => {
      console.log('Response has come')
    }).catch(e =>{
      console.log('Error occured')
    })*/

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
            Already have an Account ? <NextLink href={"/Login"}>Login</NextLink>
          </Text>
          <br></br>
          <VStack spacing={2} align="stretch">
            <Input
              placeholder="Name"
              defaultValue={Name}
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
            <Input
              placeholder="Role"
              type="text"
              defaultValue={role}
              onChange={(e) => myrole(e.target.value)}
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
