import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  useColorModeValue,
  Heading,
  Button,
  Text,
  extendTheme,
  Card,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useContext } from "react";
import { useRouter } from "next/router";
import { IconUser } from "@tabler/icons-react";
import Cookies from "js-cookie";
import { AuthContext } from "../service/authContext";

const Links = [{ name: "Home", href: "/Event" }];

const NavLink = ({ href, children }) => {
  return (
    <NextLink href={href}>
      <Box
        flexShrink="1"
        cursor="pointer"
        px={20}
        py={1}
        fontSize={"md"}
        _hover={{
          textDecoration: "none",
          color: "#941b0c",
        }}
        borderBottom={useColorModeValue("2px solid transparent", "none")}
        _activeLink={{
          fontWeight: "bold",
        }}
      >
        <Text>{children}</Text>
      </Box>
    </NextLink>
  );
};

const Navbar = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(AuthContext);

  const [userMenuOpen, setUserMenuOpen] = useState(false);


  const handleLogout = () => {
    Cookies.remove("user");
    Cookies.remove("userId");
    Cookies.remove("userName");
    dispatch({ type: "LOGOUT" });
    router.push("/");
  };

  return (
    <Box
      px={15}
      py={3}
      borderBottom={"1px solid #fdfffc"}
      bgColor={"#1d1e18"}
      color={"#fdfffc"}
      className="navbar"
      as={"nav"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Box className="navbar__brandContainer">
        <NextLink href={"/"}>
          <Heading as={"h1"} fontSize={"25px"}>
            Shield Events
          </Heading>
        </NextLink>
      </Box>

      {state.isAuthenticated ? (
        <Box>
          <Flex>
            {Links.map((link) => (
              <NavLink key={link.name} href={link.href}>
                {link.name}
              </NavLink>
            ))}
          </Flex>
        </Box>
      ) : null}

      {!state.isAuthenticated ? (
        <NextLink href={"/Login"}>
          <Button
            bgColor="#f3b52e"
            _hover={{
              bgColor: "#fdfffc",
              color: "#941b0c",
            }}
          >
            Login
          </Button>
        </NextLink>
      ) : (
        <Box position={"relative"}>
          <Button
            bgColor="#941b0c"
            _hover={{
              bgColor: "#1d1e18",
            }}
            onClick={() => setUserMenuOpen(!userMenuOpen)}
          >
            <IconUser />
          </Button>
          {userMenuOpen ? (
            <Card position={"absolute"} zIndex={"100"} right={"0.5"} p="3">
              <Button onClick={handleLogout} colorScheme="blue">
                Logout
              </Button>
            </Card>
          ) : null}
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
