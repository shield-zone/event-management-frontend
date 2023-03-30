import { Box, Heading, Text } from "@chakra-ui/react";

import EventCard from "./EventCard";

const EventRow = ({ title, data, onCardClick }) => {
  return (
    <Box my={"5"} mx={"5"} className="event__event">
      <Box display={"flex"} alignItems={"center"}>
        <Heading as="h2" fontSize={"2xl"}>
          {title}
        </Heading>
      </Box>
      {data.length ? <Box display={"flex"} flexWrap={"wrap"} gap={"5"} my={"5"} mx={"3"}>
        {data.map((event) => (
          <EventCard key={event.eventId} event={event} onClick={onCardClick} />
        ))}
      </Box> : <Text my="5" mx="3">No Events Present...</Text>}
    </Box>
  );
};

export default EventRow;
