import {
  Box,
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

const EventCard = ({ event }) => {
  return (
    <Card
      className="event__eventCard"
      width={"23%"}
      border={"1px solid rgba(0,0,0,0.2)"}
      _hover={{
        boxShadow: "3px 3px 7px rgba(0, 0, 0, 0.5)",
        cursor: "pointer",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <CardBody>
        <Image
          src="https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fHRlYW18ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
          alt={event.event_name}
          width={"sm"}
        />
        <Stack mt="6" spacing="3">
          <Heading as="h3" fontSize={"2xl"}>
            {event.event_name}
          </Heading>
          <Box>
            <Text>
              <span style={{ fontWeight: "bold" }}>Organizer</span>
              {" " + event.organizer}
            </Text>
            <Text>
              <span style={{ fontWeight: "bold" }}>Location</span>
              {" " + event.location}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default EventCard;
