const baseUrl = "http://localhost:8080/api/v1";

export const fetchAllEvents = async (state) => {
  const res = await fetch(`${baseUrl}/event/fetch-all-events`, {
    headers: {
      Authorization: `Bearer ${state.user.token}`,
    },
  });

  return res;
};

export const getAttendedEvents = (allEventsData, state) => {
  let cancelledCount = 0;
  let attendedCount = 0;

  const attendedEvents = allEventsData.filter((event) => {
    cancelledCount = 0;
    attendedCount = 0;

    event.attendees.forEach((attendee) => {
      if (attendee.user_id === state.user.user.userId) {
        console.log("here");
        if (attendee.cancelledRegistration) {
          cancelledCount++;
          console.log("cancelled", cancelledCount);
        } else {
          attendedCount++;
          console.log("attended", attendedCount);
        }
      }
    });

    return attendedCount > cancelledCount;
  });

  return attendedEvents;
};

export const getOrganizedEvents = (allEventsData, state) => {
  const newAllEventsData = allEventsData.filter((event) => {
    event.organizer.organizerId === Number(state.user.user.userId);
  });
  return newAllEventsData;
};

export const setEventStatusAsAttending = async (
  modalEventData,
  state,
  cancelRegistration
) => {
  const res = await fetch(`${baseUrl}/attendee`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${state.user.token}`,
    },
    body: JSON.stringify({
      eventId: modalEventData.eventId,
      user_id: Number(state.user.user.userId),
      cancelledRegistration: cancelRegistration,
    }),
  });

  return res;
};

export const deleteEvent = async (state, id) => {
  const res = await fetch(`${baseUrl}/event/delete-by-id/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${state.user.token}`,
    },
  });

  return res;
};

export const createNewEvent = async (state, data) => {
  const res = await fetch(`${baseUrl}/event/create-event-organizer-location`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${state.user.token}`,
    },
    body: JSON.stringify({
      ...data,
      userId: state.user.user.userId,
    }),
  });

  return res;
};
