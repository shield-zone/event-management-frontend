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
      if (attendee.user_id === Number(state.user.user.userId)) {
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
    console.log(event.organizer.organizerId === Number(state.user.user.userId));
    return event.organizer.organizerId === Number(state.user.user.userId);
  });
  console.log(newAllEventsData);
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

export const getPastEvents = async (state) => {
  const res = await fetchAllEvents(state);
  const resData = await res.json();

  const organizedEvents = getOrganizedEvents(resData, state);
  const attendedEvents = getAttendedEvents(resData, state);

  const allEvents = [...organizedEvents, ...attendedEvents].filter((event) => {
    return new Date(event.endDate) < new Date() && !event.deleted;
  });

  return allEvents;
};

export const putEventDetails = async (state, data) => {
  const body = {
    eventId: data.eventId,
    eventName: data.eventName,
    eventPrice: data.eventPrice,
    startDate: data.startDate,
    endDate: data.endDate,
  };

  const res = await fetch(`${baseUrl}/event/update-event`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${state.user.token}`,
    },
    body: JSON.stringify(body),
  });

  return res;
};

export const putLocationDetails = async (state, data) => {
  const body = {
    locationId: data.locationId,
    locationName: data.locationName,
    address: data.address,
    pincode: data.pincode,
    state: data.state,
    country: data.country,
  };

  console.log(data);

  const res = await fetch(`${baseUrl}/location/update-location`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${state.user.token}`,
    },
    body: JSON.stringify(body),
  });

  return res;
};

export const putOrganizerDetails = async (state, data) => {
  const body = {
    organizerId: data.organizerId,
    phoneNumber: data.phoneNumber,
    rating: data.rating,
    website: data.website,
  };

  console.log(data);

  const res = await fetch(`${baseUrl}/organizer/update-organizer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${state.user.token}`,
    },
    body: JSON.stringify(body),
  });

  return res;
};
