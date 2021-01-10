import React, {Component} from 'react'
import classes from './QuiList.module.css'
import {NavLink} from "react-router-dom"
import Loader from "../../components/UI/Loader/Loader"
import {connect} from "react-redux"
import {fetchQuizes} from '../../store/actions/quiz'

class QuizList extends Component {

  renderQuizes = () => {
    if (this.props.quizList !== undefined) {
      return this.props.quizList.map(quiz => {
        return (
          <li key={quiz.id}>
            <NavLink exact={true} to={'/quiz/' + quiz.id}>{quiz.name}</NavLink>
          </li>
        )
      })
    }

  }

  componentDidMount() {
    this.props.fetchQuizes()
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>
          {
            this.props.loading && this.props.quizList.length !== 0
              ? <Loader />
              : <ul>{this.renderQuizes()}</ul>
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quizList: state.quiz.quizList,
    loading: state.quiz.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)
