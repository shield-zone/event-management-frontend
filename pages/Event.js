import { useState, useEffect, useContext } from "react";
import { Box, Button, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";

import data from "../assets/EVENT_DATA.json";

import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import EventModal from "../components/EventModal";
import EventRow from "../components/EventRow";

import { AuthContext } from "../service/authContext";

const Event = () => {
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [modalEventData, setModalEventData] = useState({});
  const [eventsOrganized, setEventsOrganized] = useState([]);
  const [eventsAttending, setEventsAttending] = useState([]);

  const router = useRouter();
  const { state } = useContext(AuthContext);

  useEffect(() => {
    if (!state.isAuthenticated) {
      router.push("/");
    }
  }, [state.isAuthenticated]);

  const handleEventCardClick = (data) => {
    setModalEventData(data);
    setEventModalOpen(true);
    console.log("Card Clicked");
  };

  const closeModal = () => {
    setModalEventData({});
    setEventModalOpen(false);
  };

  const attendEvent = (event) => {
    setEventsAttending((state) => [...state, event]);
    setModalEventData({});
    setEventModalOpen(false);
  };

  const cancelEvent = () => {
    setModalEventData({});
    setEventModalOpen(false);
    alert("Event Cancelled");
  };

  const changeAttendeeStatus = (event) => {
    const newAttendeeEvents = eventsAttending.filter((e) => e.id !== event.id);
    setEventsAttending(newAttendeeEvents);
    setModalEventData({});
    setEventModalOpen(false);
    alert(`Removed Event ${event.event_name}`);
  };

  const modalActionText = () => {
    if (eventsAttending.find((e) => e.id === modalEventData.id)) {
      console.log("Found");
      return "Change Attendee Status";
    } else if (eventsOrganized.find((e) => e.id === modalEventData.id)) {
      return "Cancel Event";
    }

    return "Attend Event";
  };

  const getModalAction = () => {
    if (eventsAttending.find((e) => e.id === modalEventData.id)) {
      console.log("Found");
      return changeAttendeeStatus;
    } else if (eventsOrganized.find((e) => e.id === modalEventData.id)) {
      return cancelEvent;
    }

    return attendEvent;
  };

  return (
    <div>
      <Navbar />

      <EventModal
        isOpen={eventModalOpen}
        setEventModalOpen={closeModal}
        data={modalEventData}
        btnAction={getModalAction()}
        actionBtnText={modalActionText()}
      />

      <Box display="flex" justifyContent="flex-end" mt="5" mb="-8" mx="5">
        <Box>
          <Button colorScheme="gray" marginRight="3">
            Past Events
          </Button>
          <Button colorScheme="orange">+ Organize New Event</Button>
        </Box>
      </Box>

      {eventsOrganized.length ? (
        <EventRow
          title="Events Organized by You:"
          data={eventsOrganized}
          onCardClick={handleEventCardClick}
        />
      ) : null}

      {eventsAttending.length ? (
        <EventRow
          title="Future Events you're Attending:"
          data={eventsAttending}
          onCardClick={handleEventCardClick}
        />
      ) : null}

      <EventRow
        title="Events Recommended for You:"
        data={data}
        onCardClick={handleEventCardClick}
      />
    </div>
  );
};

export default Event;
