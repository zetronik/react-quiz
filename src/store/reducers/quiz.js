import {
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ, QUIZ_NEXT_QUESTION, RETRY_HANDLER
} from "../actions/actionTypes";

const initialState = {
  quizList: [],
  loading: false,
  results: {},
  isFinished: false,
  activeQuestion: 0,
  answerStates: null,
  quiz: null
}

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return {...state, loading: true}
    case FETCH_QUIZES_SUCCESS:
      return {...state, loading: false, quizList: action.quizList}
    case FETCH_QUIZES_ERROR:
      return {...state, quizList: false, error: action.error}
    case FETCH_QUIZ_SUCCESS:
      return {...state, loading: false, quiz: action.quiz}
    case QUIZ_SET_STATE:
      return {...state, answerStates: action.answerStates, results: action.results}
    case FINISH_QUIZ:
      return {...state, isFinished: true}
    case QUIZ_NEXT_QUESTION:
      return {...state, answerStates: null, activeQuestion: action.activeQuestion}
    case RETRY_HANDLER:
      return {
        ...state,
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerStates: null,
      }
    default:
      return state
  }
}
