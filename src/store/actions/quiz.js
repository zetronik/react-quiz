import axios from '../../axios/axios-quiz'
import {
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FINISH_QUIZ, QUIZ_NEXT_QUESTION,
  QUIZ_SET_STATE, RETRY_HANDLER
} from "./actionTypes";

export function fetchQuizes() {
  return async dispatch => {
    dispatch(fetchQuizesStart())
    try {
      const quizList = []
      const res = await axios.get('/quizes.json')
      Object.keys(res.data).forEach((id, index) => {
        quizList.push({
          id, name: `Тест №${index+1}`
        })
      })
      dispatch(fetchQuizesSuccess(quizList))
    } catch (error) {
      dispatch(fetchQuizesError(error))
    }
  }
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START
  }
}

export function fetchQuizesSuccess(quizList) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizList
  }
}

export function fetchQuizesError(error) {
  return {
    type: FETCH_QUIZES_ERROR,
    error
  }
}

export function fetchQuizById(quizId) {
  return async dispatch => {
    dispatch(fetchQuizesStart())
    try {
      const res = await axios.get('/quizes/' + quizId + '.json')
      const quiz = res.data
      dispatch(fetchQuizSuccess(quiz))
    } catch (e) {
      dispatch(fetchQuizesError(e))
    }
  }
}

export function fetchQuizSuccess(quiz) {
  return { type: FETCH_QUIZ_SUCCESS, quiz }
}

export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz

    if (state.answerState) {
      const key = Object.keys(state.answerState)[0]
      if (state.answerState[key] === 'success') {
        return
      }
    }

    const question = state.quiz[state.activeQuestion]
    const results = state.results

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success'
      }

      dispatch(quizSetState({[answerId]: 'success'}, results))

      const timeout = window.setTimeout(() => {
        if (isQuizFinish(state)) {
          dispatch(finishQuiz())
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1))
        }
        window.clearTimeout(timeout)
      }, 1000)
    } else {
      results[question.id] = 'error'
      dispatch(quizSetState({[answerId]: 'error'}, results))
    }
  }
}

export function quizSetState(answerStates, results) {
  return {
    type: QUIZ_SET_STATE,
    answerStates,
    results
  }
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ
  }
}

export function quizNextQuestion(activeQuestion) {
  return {type: QUIZ_NEXT_QUESTION, activeQuestion}
}

function isQuizFinish(state) {
  return state.activeQuestion + 1 === state.quiz.length
}

export function retryQuiz() {
  return {type: RETRY_HANDLER}
}