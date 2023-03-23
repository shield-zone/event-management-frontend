import { Box } from "@chakra-ui/react";

const DataStripe = ({ data }) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-evenly"}
      alignItems={"center"}
      backgroundColor={"#941b0c"}
      color={"#fdfffc"}
      py={"5"}
      className="dataStripe__container"
    >
      {data.map((item) => (
        <Box key={item.domain} textAlign={"center"}>
          <Box fontSize={"3xl"} fontWeight={"bold"}>
            {item.numbers}
          </Box>
          <Box>{item.domain}</Box>
        </Box>
      ))}
    </Box>
  );
};

export default DataStripe;
