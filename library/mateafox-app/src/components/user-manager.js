import React, { Component } from 'react'
import { connect } from 'react-redux'
import { navigate } from 'gatsby'
import moment from 'moment'
import { fetchSettings } from '../reducers/user/actions'
import { matchRoute } from '../routes'

class UserManager extends Component {
  state = {
    fetching: false,
  }

  componentDidMount() {
    const { auth, location } = this.props

    if (auth.isAuthenticated) {
      this.onFetchUser(auth.token)
    }

    this.onLocation(location)
  }

  componentDidUpdate(prevProps) {
    const { auth, location } = this.props

    if (auth.token !== prevProps.auth.token && auth.isAuthenticated) {
      this.onFetchUser(auth.token)
    }

    if (location.href !== prevProps.location.href) {
      this.onLocation(location)
    }
  }

  onLocation = location => {
    const match = matchRoute(location.pathname)

    if (match) {
      let params = match.match.params
      
    }
  }

  onFetchUser = token => {
    Promise.all([
      this.props.dispatch(fetchSettings(token)),
    ]).then(() => {
      const { location } = this.props

      this.onLocation(location)
    })
  }
  

  render() {
    return <></>
  }
}

export default connect(state => {
  return {
    auth: state.auth,
    user: state.user,
    feed: state.feed,
  }
})(UserManager)
