import React from 'react';
import Layout from './hoc/Layout/Layout'
import { Route, Switch, Redirect } from  'react-router-dom'
import Quiz from './containers/Quiz/Quiz'
import Auth from './containers/Auth/Auth'
import QuizList from './containers/QuizList/QuizList'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import Logout from "./components/Logout/Logout";
import {connect} from "react-redux";
import {autoLogin} from "./store/actions/auth";

class App extends React.Component {
  componentDidMount() {
    this.props.autoLogin()
  }

  render() {
    let routes = (
        <Switch>
          <Route path="/" exact component={QuizList} />
          <Route path="/auth" component={Auth} />
          <Route path="/quiz/:id" component={Quiz} />
          <Redirect to={'/'} />
        </Switch>
    )
    if (this.props.isAuth) {
      routes = (
          <Switch>
            <Route path="/" exact component={QuizList} />
            <Route path="/quiz-creator" component={QuizCreator} />
            <Route path="/quiz/:id" component={Quiz} />
            <Route path="/logout" component={Logout} />
            <Redirect to={'/'} />
          </Switch>
      )
    }
    return (
      <Layout>
        {routes}
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuth: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
