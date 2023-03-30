import {
  Box,
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

const EventCard = ({ event, onClick }) => {
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
      onClick={() => onClick(event)}
    >
      <CardBody>
        <Image
          src={`https://source.unsplash.com/random/200x200?celebration&${event.eventId}`}
          alt={event.eventName}
          width={"100%"}
          height={"200px"}
        />
        <Stack mt="6" spacing="3">
          <Heading as="h3" fontSize={"2xl"}>
            {event.eventName}
          </Heading>
          <Box>
            <Text>
              <span style={{ fontWeight: "bold" }}>Location</span>
              {" " +
                `${event?.location?.address} ${event?.location?.locationName}, ${event?.location?.state}, ${event?.location?.country}`}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default EventCard;
