import { Box, Image, Fade, Heading } from "@chakra-ui/react";

const Description = ({ title, text, image, order }) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"flex-start"}
      gap={"50px"}
      flexDirection={order === "left" ? "row" : "row-reverse"}
      my={"50"}
      mx={"100"}
    >
      <Box width={"782px"} className="description__title">
        <Heading as={"h3"} fontWeight={"bold"} fontSize={"30px"}>
          {title}
        </Heading>
        <Box className="description__text" marginTop={"5"}>
          {text}
        </Box>
      </Box>

      <Fade in={true} style={{ transitionDelay: "500ms" }}>
        <Box bgColor={"#1d1e18"} p="5" borderRadius={"10px"}>
          <Image src={image} alt={title} width={500} height={300} />
        </Box>
      </Fade>
    </Box>
  );
};

export default Description;
