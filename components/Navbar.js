import {
  Box,
  Flex,
  useColorModeValue,
  Heading,
  Button,
  extendTheme,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useContext } from "react";

import { AuthContext } from "../service/authContext";

const Links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

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
        {children}
      </Box>
    </NextLink>
  );
};

const Navbar = () => {
  const { state, dispatch } = useContext(AuthContext);

  return (
    <Box
      px={15}
      py={3}
      borderBottom={"1px solid #fdfffc"}
      bgColor={"#1d1e18"}
      color={"#fdfffc"}
      className="navbar"
    >
      <Flex as={"nav"} align={"center"} justify={"space-between"}>
        <Box className="navbar__brandContainer">
          <Heading as={"h1"} fontSize={"25px"}>
            {"< Company_Name >"}
          </Heading>
        </Box>

        {state.isAuthenticated && (
          <Box>
            <Flex>
              {Links.map((link) => (
                <NavLink key={link.name} href={link.href}>
                  {link.name}
                </NavLink>
              ))}
            </Flex>
          </Box>
        )}

        <NextLink href={"/login"}>
          <Button
            bgColor="#941b0c"
            _hover={{
              bgColor: "#fdfffc",
              color: "#941b0c",
            }}
          >
            Login
          </Button>
        </NextLink>
      </Flex>
    </Box>
  );
};

export default Navbar;
