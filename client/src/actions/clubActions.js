import axios from "axios";
import { GET_CLUBS, GET_CLUB, ADD_CLUB, DELETE_CLUB, CLUBS_LOADING } from "./types";

export const getClubs = () => dispatch => {
  dispatch(setClubsLoading());
  axios.get("/api/clubs").then(res =>
    dispatch({
      type: GET_CLUBS,
      payload: res.data
    })
  );
};

export const getClub = id => dispatch => {
  dispatch(setClubsLoading());
  axios.get(`/api/clubs/${id}`).then(res =>
    dispatch({
      type: GET_CLUB,
      payload: res.data
    })
  );
};

export const deleteClub = id => dispatch => {
  axios.delete(`/api/clubs/${id}`).then(res =>
    dispatch({
      type: DELETE_CLUB,
      payload: id
    })
  );
};

export const addClub = item => dispatch => {
  axios.post("/api/clubs", item).then(res =>
    dispatch({
      type: ADD_CLUB,
      payload: res.data
    })
  );
};

export const setClubsLoading = () => {
  return {
    type: CLUBS_LOADING
  };
};
