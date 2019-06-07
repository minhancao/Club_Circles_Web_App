import {
  GET_CLUBS,
  GET_CLUB,
  ADD_CLUB,
  DELETE_CLUB,
  CLUBS_LOADING
} from "../actions/types";

const initialState = {
  clubs: [],
  club: [], 
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CLUBS:
      return {
        ...state,
        clubs: action.payload,
        loading: false
      };
    case GET_CLUB:
      return {
        ...state,
        club: action.payload,
        loading: false
      };
    case DELETE_CLUB:
      return {
        ...state,
        clubs: state.clubs.filter(item => item._id !== action.payload)
      };
    case ADD_CLUB:
      return {
        ...state,
        clubs: [action.payload, ...state.clubs]
      };
    case CLUBS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
