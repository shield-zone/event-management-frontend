import { Box, Button, Heading } from "@chakra-ui/react";

import Navbar from "../components/Navbar";

import data from "../assets/EVENT_DATA.json";
import EventCard from "../components/EventCard";

const Event = () => {
  console.log(data);
  return (
    <div>
      <Navbar />

      <Box my={"5"} mx={"5"} className="event__event">
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Heading as="h2" fontSize={"2xl"}>
            Event Recommendations For You:{" "}
          </Heading>
          <Button colorScheme="orange">+ Organize New Event</Button>
        </Box>
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
          rowGap={"5"}
          my={"5"}
          mx={"3"}
        >
          {data.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default Event;
