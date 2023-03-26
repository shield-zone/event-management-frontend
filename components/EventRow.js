import { Box, Heading } from "@chakra-ui/react";

import EventCard from "./EventCard";

const EventRow = ({ title, data, onCardClick }) => {
  return (
    <Box my={"5"} mx={"5"} className="event__event">
      <Box display={"flex"} alignItems={"center"}>
        <Heading as="h2" fontSize={"2xl"}>
          {title}
        </Heading>
      </Box>
      <Box display={"flex"} flexWrap={"wrap"} gap={"5"} my={"5"} mx={"3"}>
        {data.map((event) => (
          <EventCard key={event.id} event={event} onClick={onCardClick} />
        ))}
      </Box>
    </Box>
  );
};

export default EventRow;
