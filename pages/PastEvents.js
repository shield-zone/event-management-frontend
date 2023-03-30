import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";

import EventRow from "../components/EventRow";
import EventModal from "../components/EventModal";
import Navbar from "../components/Navbar";

import { AuthContext } from "../service/authContext";
import {getPastEvents} from "./api/api";

const PastEvents = () => {
  const router = useRouter();
  const [pastEvents, setPastEvents] = useState([]);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [modalEventData, setModalEventData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const { state } = useContext(AuthContext);

  useEffect(() => {
    if (!state.isAuthenticated) {
      router.push("/");
    }
  }, [state.isAuthenticated]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const resData = await getPastEvents(state);
        setPastEvents(resData);
      } catch(err) {
        setErrorMessage("Failed to fetch past events.");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      }
    }

    fetchEvents();
  }, [])

  const closeModal = () => {
    setModalEventData({});
    setEventModalOpen(false);
  };

  const handleEventCardClick = (data) => {
    setModalEventData(data);
    setEventModalOpen(true);
  };

  return (
    <div>
      <Navbar />

      <EventModal
        isOpen={eventModalOpen}
        setEventModalOpen={closeModal}
        data={modalEventData}
      />

      <EventRow
        title="Events Attended/Organized in Past:"
        data={pastEvents}
        onCardClick={handleEventCardClick}
      />
    </div>
  );
};

export default PastEvents;
