import { SUBMIT_FORM } from '../constants/ActionTypes'

const initialState = {}

export default function form (state = initialState, action) {
  switch (action.type) {
    case SUBMIT_FORM:
      return { ...state }
    default:
      return state
  }
}