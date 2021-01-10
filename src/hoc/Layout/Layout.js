import React from 'react'
import classes from './Layout.module.css'
import MenuToggle from '../../components/Nuvigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Nuvigation/Drawer/Drawer'
import {connect} from "react-redux";

class Layout extends React.Component {
  state = {
    isOpen: false
  }
  toggleMenuHandler = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  drawerCloseHandler = () => {
    this.setState({
      isOpen: false
    })
  }
  render() {
    return (
      <div className={classes.Layout}>

        <Drawer
          isOpen={this.state.isOpen}
          onClose={this.drawerCloseHandler}
          isAuth={this.props.isAuth}
        />
        <MenuToggle
          onToggle={this.toggleMenuHandler}
          isOpen={this.state.isOpen}
        />
        <main>
          {this.props.children}
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
    return {
        isAuth: !!state.auth.token
    }
}

export default connect(mapStateToProps)(Layout)
