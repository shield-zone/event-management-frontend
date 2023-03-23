import { Box, Button } from "@chakra-ui/react";
import NextLink from "next/link";

const Hero = () => {
  return (
    <Box>
      <Box
        bg="#941b0c"
        color="#fdfffc"
        h="40vh"
        w="100%"
        display="flex"
        flexDirection={"column"}
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Box
          textAlign="center"
          fontSize="4xl"
          fontWeight="bold"
          className="hero__brandTitle"
        >
          We are <span>{"< Company_Name >"}</span>
        </Box>

        <Box
          textAlign="center"
          fontSize="3xl"
          fontWeight="semibold"
          className="hero__tagline"
        >
          <Box>We bring dream events to life</Box>
          <NextLink href="/register">
            <Button
              bg={"#1d1e18"}
              marginTop={"5"}
              _hover={{
                color: "#1d1e18",
                bgColor: "#fdfffc",
              }}
            >
              Get Started
            </Button>
          </NextLink>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
