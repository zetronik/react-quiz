import React from "react";
import classes from './Drawer.module.css'
import {NavLink} from 'react-router-dom'
import Backdrop from '../../UI/Backdrop/Backdrop'

class Drawer extends React.Component {
  clickHandler = () => {
    this.props.onClose()
  }
  renderLinks(links) {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={this.clickHandler}
          >
            {link.value}
          </NavLink>
        </li>
      )
    })
  }

  render() {
    const cls = [classes.Drawer]
    if (!this.props.isOpen) {
      cls.push(classes.close)
    }
    const links = [
      {to: '/', value: 'Тесты', exact: true}
    ]
    if (this.props.isAuth) {
      links.push(
        {to: '/quiz-creator', value: 'Создать тест', exact: false},
        {to: '/logout', value: 'Выход', exact: false}
      )
    } else {
      links.push({to: '/auth', value: 'Авторизация', exact: false})
    }
    return (
      <React.Fragment>
        <nav className={cls.join(' ')}>
          <ul>
            {this.renderLinks(links)}
          </ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </React.Fragment>
    )
  }

}

export default Drawer
