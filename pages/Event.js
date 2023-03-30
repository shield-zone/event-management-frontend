import { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import Navbar from "../components/Navbar";
import EventModal from "../components/EventModal";
import EventRow from "../components/EventRow";
import CreateEventForm from "../components/CreateEventForm";

import { AuthContext } from "../service/authContext";
import {
  deleteEvent,
  fetchAllEvents,
  getAttendedEvents,
  getOrganizedEvents,
  setEventStatusAsAttending,
  createNewEvent,
} from "./api/api";

const Event = () => {
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [createEventFormOpen, setCreateEventFormOpen] = useState(false);
  const [modalEventData, setModalEventData] = useState({});
  const [eventsOrganized, setEventsOrganized] = useState([]);
  const [eventsAttending, setEventsAttending] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [attendEventLoading, setAttendEventLoading] = useState(false);
  const [eventsLoading, setEventsLoading] = useState(false);

  const router = useRouter();
  const { state, dispatch } = useContext(AuthContext);

  console.log(state);

  useEffect(() => {
    const getEventsAttended = async () => {
      const res = getAttendedEvents(eventData, state);
      const data = res.filter(filterEvents)
      setEventsAttending(res);
    };

    if (eventData.length) getEventsAttended();
  }, [eventData]);

  useEffect(() => {
    const getEventsOrganized = () => {
      const res = getOrganizedEvents(eventData, state);
      const data = res.filter(filterEvents)
      setEventsOrganized(data);
    };

    if (eventData.length) getEventsOrganized();
  }, [eventData]);

  useEffect(() => {
    const getAllEvents = async () => {
      setEventsLoading(true);
      try {
        const res = await fetchAllEvents(state);
        const resStatus = res.status;
        const resData = await res.json();

        if (resStatus === 403) {
          setErrorMessage("User Unauthenticated");
          setTimeout(logoutUser, 3000);
        } else if (resStatus !== 200) {
          setErrorMessage("Failed to fetch events");
          setTimeout(() => {
            setErrorMessage("");
          }, 3000);
        } else {
          setEventData(resData.filter(filterEvents));
        }
      } catch (err) {
        setErrorMessage("Failed to fetch events");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      }
      setEventsLoading(false);
    };
    
    getAllEvents();
  }, []);

  const filterEvents = data => !data.deleted && (new Date(data.endDate) > new Date())
  
  console.log(eventsOrganized);
  console.log(eventData);

  const logoutUser = () => {
    setErrorMessage("");
    dispatch({ type: "LOGOUT" });
    Cookies.remove("user");
    router.push("/");
  };

  const handleEventCardClick = (data) => {
    setModalEventData(data);
    setEventModalOpen(true);
    console.log("Card Clicked");
  };

  const closeModal = () => {
    setModalEventData({});
    setEventModalOpen(false);
  };

  const attendEvent = async (event) => {
    try {
      const res = await setEventStatusAsAttending(modalEventData, state, false);

      if (res.status === 403) {
        setErrorMessage("User Unauthenticated");
        setTimeout(logoutUser, 3000);
        return;
      } else if (res.status !== 200) {
        setErrorMessage("Failed to change attendee status");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      }

      const resData = await res.json();
      console.log(resData);
      setEventsAttending((state) => [...state, event]);
      setModalEventData({});
      setEventModalOpen(false);
    } catch (err) {
      setErrorMessage("Failed to change event status");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  const cancelEvent = async (e) => {
    const res = await deleteEvent(state, modalEventData.eventId);

    if (res.status === 403) {
      setErrorMessage("User Unauthenticated");
      setTimeout(logoutUser, 3000);
      return;
    } else if (res.status !== 200) {
      setErrorMessage("Failed to delete event");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    } else {
      const newOrganizedEvents = eventsOrganized.filter(
        (event) => event.eventId != modalEventData.eventId
      );
      setEventsOrganized(newOrganizedEvents);
      setEventData(state => state.filter(event => event.eventId != modalEventData.eventId))
      setModalEventData({});
      setEventModalOpen(false);
      alert("Event Cancelled");
    }
  };

  const changeAttendeeStatus = async (event) => {
    const res = await setEventStatusAsAttending(modalEventData, state, true);

    if (res.status === 403) {
      setErrorMessage("User Unauthenticated");
      setTimeout(logoutUser, 3000);
      return;
    } else if (res.status !== 200) {
      setErrorMessage("Failed to change attendee status");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }

    const newAttendeeEvents = eventsAttending.filter((e) => e.id !== event.id);

    setEventsAttending(newAttendeeEvents);
    setModalEventData({});
    setEventModalOpen(false);
    alert(`Removed Event ${event.eventName}`);
  };

  const modalActionText = () => {
    if (eventsAttending.find((e) => e.eventId === modalEventData.eventId)) {
      console.log("Found");
      return "Change Attendee Status";
    } else if (
      eventsOrganized.find((e) => e.eventId === modalEventData.eventId)
    ) {
      return "Cancel Event";
    }

    return "Attend Event";
  };

  const getModalAction = () => {
    if (eventsAttending.find((e) => e.eventId === modalEventData.eventId)) {
      console.log("Found");
      return changeAttendeeStatus;
    } else if (
      eventsOrganized.find((e) => e.eventId === modalEventData.eventId)
      
    ) {
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

  const createEvent = async (data) => {
    try {
      const res = await createNewEvent(state, data);
      const resData = await res.json();

      if (res.status === 403) {
        setErrorMessage("User Unauthenticated");
        setTimeout(logoutUser, 3000);
        return;
      } else if (res.status !== 200) {
        setErrorMessage("Failed to create event");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
        return;
      } else {
        setEventsOrganized((state) => [...state, resData]);
        setEventData((state) => [...state, resData]);
        setCreateEventFormOpen(false);
      }
    } catch(err) {
      setErrorMessage("Failed to fetch event");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
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
          data={eventsOrganized.filter(data => !data.deleted && (new Date(data.endDate) > new Date()))}
          onCardClick={handleEventCardClick}
        />
      ) : null}

      {eventsAttending.length ? (
        <EventRow
          title="Future Events you're Attending:"
          data={eventsAttending.filter(data => !data.deleted && (new Date(data.endDate) > new Date()))}
          onCardClick={handleEventCardClick}
        />
      ) : null}

      {!eventsLoading ? (
        <EventRow
          title="All Events:"
          data={eventData.filter(data => !data.deleted && (new Date(data.endDate) > new Date()))}
          onCardClick={handleEventCardClick}
        />
      ) : (
        <Box display="flex" alignItens="center" justifyContent="center">
          <Spinner size="xl" />
        </Box>
      )}
    </div>
  );
};

export default Event;
