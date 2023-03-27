import { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import Navbar from "../components/Navbar";
import EventModal from "../components/EventModal";
import EventRow from "../components/EventRow";
import CreateEventForm from "../components/CreateEventForm";

import { AuthContext } from "../service/authContext";

const Event = () => {
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [createEventFormOpen, setCreateEventFormOpen] = useState(false);
  const [modalEventData, setModalEventData] = useState({});
  const [eventsOrganized, setEventsOrganized] = useState([]);
  const [eventsAttending, setEventsAttending] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const { state, dispatch } = useContext(AuthContext);

  console.log(state);

  useEffect(() => {
    const getAllEvents = async () => {
      fetch("http://localhost:8080/api/v1/organizer/fetch-all-events", {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      })
        .then((response) => {
          if (response.status === 403) {
            setErrorMessage("User Unauthenticated");
            setTimeout(() => {
              setErrorMessage("");
              dispatch({ type: "LOGOUT" });
              Cookies.remove("user");
              router.push("/");
            }, 3000);
          } else if (response.status !== 200) {
            setErrorMessage("Failed to fetch events");
            setTimeout(() => {
              setErrorMessage("");
            }, 3000);
          } else {
            return response.json();
          }
          return [];
        })
        .then((data) => setEventData(data))
        .catch((err) => console.log(err));
    };

    getAllEvents();
  }, []);

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

  const cancelEvent = (e) => {
    const newOrganizedEvents = eventsOrganized.filter(
      (event) => event.event_name != modalEventData.event_name
    );
    setModalEventData(newOrganizedEvents);
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

  const closeCreateEventForm = () => {
    setCreateEventFormOpen(false);
  };

  const openCreateEventForm = () => {
    setCreateEventFormOpen(true);
  };

  const createEvent = (data) => {
    setEventsOrganized((state) => [...state, data]);
    alert("Event Created");
  };

  return (
    <div>
      <Navbar />

      {errorMessage && (
        <Alert
          status="error"
          position="absolute"
          width={"max-content"}
          right="50%"
          zIndex={"100"}
        >
          <AlertIcon />
          <AlertTitle mr={2}>{errorMessage}</AlertTitle>
        </Alert>
      )}

      <EventModal
        isOpen={eventModalOpen}
        setEventModalOpen={closeModal}
        data={modalEventData}
        btnAction={getModalAction()}
        actionBtnText={modalActionText()}
      />

      <CreateEventForm
        isOpen={createEventFormOpen}
        onClose={closeCreateEventForm}
        data={{}}
        btnAction={createEvent}
      />

      <Box display="flex" justifyContent="flex-end" mt="5" mb="-8" mx="5">
        <Box>
          <Button
            colorScheme="gray"
            marginRight="3"
            onClick={() => router.push("/PastEvents")}
          >
            Past Events
          </Button>
          <Button colorScheme="orange" onClick={openCreateEventForm}>
            + Organize New Event
          </Button>
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
        data={eventData}
        onCardClick={handleEventCardClick}
      />
    </div>
  );
};

export default Event;
