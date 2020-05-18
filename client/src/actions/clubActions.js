import axios from "axios";
import {
  GET_CLUBS,
  GET_CLUB,
  ADD_CLUB,
  DELETE_CLUB,
  CLUBS_LOADING,
} from "./types";

export const getClubs = () => (dispatch) => {
  dispatch(setClubsLoading());
  axios.get("/api/clubs").then((res) =>
    dispatch({
      type: GET_CLUBS,
      payload: res.data,
    })
  );
};

export const getClub = (id) => (dispatch) => {
  dispatch(setClubsLoading());
  axios.get(`/api/clubs/${id}`).then((res) =>
    dispatch({
      type: GET_CLUB,
      payload: res.data,
    })
  );
};

export const putClub = (id, item) => (dispatch) => {
  dispatch(setClubsLoading());
  axios.put(`/api/clubs/add/${id}`, item).then(
    axios.get("/api/clubs").then((res) =>
      dispatch({
        type: GET_CLUBS,
        payload: res.data,
      })
    )
  );
};

export const addDiscussionComment = (id, discussionId, item) => (dispatch) => {
  dispatch(setClubsLoading());
  axios.put(`/api/clubs/add/discussions/${id}/${discussionId}`, item).then(
    axios.get("/api/clubs").then((res) =>
      dispatch({
        type: GET_CLUBS,
        payload: res.data,
      })
    )
  );
};

export const editClub = (id, item) => (dispatch) => {
  dispatch(setClubsLoading());
  axios.put(`/api/clubs/edit/${id}`, item).then(
    axios.get("/api/clubs").then((res) =>
      dispatch({
        type: GET_CLUBS,
        payload: res.data,
      })
    )
  );
};

export const editClubDiscussion = (id, discussionId, item) => (dispatch) => {
  dispatch(setClubsLoading());
  axios.put(`/api/clubs/edit/discussions/${id}/${discussionId}`, item).then(
    axios.get("/api/clubs").then((res) =>
      dispatch({
        type: GET_CLUBS,
        payload: res.data,
      })
    )
  );
};

export const editClubDiscussionComment = (
  id,
  discussionId,
  commentId,
  item
) => (dispatch) => {
  dispatch(setClubsLoading());
  axios
    .put(`/api/clubs/edit/discussions/${id}/${discussionId}/${commentId}`, item)
    .then(
      axios.get("/api/clubs").then((res) =>
        dispatch({
          type: GET_CLUBS,
          payload: res.data,
        })
      )
    );
};

export const editClubAnnouncement = (id, announcementId, item) => (
  dispatch
) => {
  dispatch(setClubsLoading());
  axios.put(`/api/clubs/edit/announcements/${id}/${announcementId}`, item).then(
    axios.get("/api/clubs").then((res) =>
      dispatch({
        type: GET_CLUBS,
        payload: res.data,
      })
    )
  );
};

export const editClubEvent = (id, eventId, item) => (dispatch) => {
  dispatch(setClubsLoading());
  axios.put(`/api/clubs/edit/events/${id}/${eventId}`, item).then(
    axios.get("/api/clubs").then((res) =>
      dispatch({
        type: GET_CLUBS,
        payload: res.data,
      })
    )
  );
};

export const deleteClub = (id) => (dispatch) => {
  axios.delete(`/api/clubs/${id}`).then((res) =>
    dispatch({
      type: DELETE_CLUB,
      payload: id,
    })
  );
};

export const deleteClubDiscussion = (id, discussionId) => (dispatch) => {
  dispatch(setClubsLoading());
  axios.put(`/api/clubs/delete/discussions/${id}/${discussionId}`).then(
    axios.get("/api/clubs").then((res) =>
      dispatch({
        type: GET_CLUBS,
        payload: res.data,
      })
    )
  );
};

export const deleteClubDiscussionComment = (id, discussionId, commentId) => (
  dispatch
) => {
  dispatch(setClubsLoading());
  axios
    .put(`/api/clubs/delete/discussions/${id}/${discussionId}/${commentId}`)
    .then(
      axios.get("/api/clubs").then((res) =>
        dispatch({
          type: GET_CLUBS,
          payload: res.data,
        })
      )
    );
};

export const deleteClubAnnouncement = (id, announcementId) => (dispatch) => {
  dispatch(setClubsLoading());
  axios.put(`/api/clubs/delete/announcements/${id}/${announcementId}`).then(
    axios.get("/api/clubs").then((res) =>
      dispatch({
        type: GET_CLUBS,
        payload: res.data,
      })
    )
  );
};

export const deleteClubEvent = (id, eventId) => (dispatch) => {
  dispatch(setClubsLoading());
  axios.put(`/api/clubs/delete/events/${id}/${eventId}`).then(
    axios.get("/api/clubs").then((res) =>
      dispatch({
        type: GET_CLUBS,
        payload: res.data,
      })
    )
  );
};

export const addClub = (item) => (dispatch) => {
  axios.post("/api/clubs", item).then((res) =>
    dispatch({
      type: ADD_CLUB,
      payload: res.data,
    })
  );
};

export const setClubsLoading = () => {
  return {
    type: CLUBS_LOADING,
  };
};
