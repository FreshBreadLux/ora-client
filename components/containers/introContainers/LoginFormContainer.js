import React from 'react'
import axios from 'axios'
import { AsyncStorage } from 'react-native'
import { LoginFormPresenter } from '../../presenters/introPresenters'
import ROOT_URL from '../../../config'

async function setAsyncStorage(item, selectedValue) {
  try {
    await AsyncStorage.setItem(item, selectedValue)
  } catch (error) {
    console.error('AsyncStorage error: ' + error.message)
  }
}

export default class LoginFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null,
      password: null,
      error: false,
    }
    this.userLogin = this.userLogin.bind(this)
    this.setEmail = this.setEmail.bind(this)
    this.setPassword = this.setPassword.bind(this)
    this.referencePassword = this.referencePassword.bind(this)
    this.focusPassword = this.focusPassword.bind(this)
  }

  userLogin() {
    if (this.state.email && this.state.password) {
      axios.post(`${ROOT_URL}/api/users/sessions`, {
        email: this.state.email,
        password: this.state.password,
      })
      .then(response => JSON.stringify(response.data))
      .then(oraAuth => setAsyncStorage('oraAuth', oraAuth))
      .then(() => this.props.verifyStorageKey())
      .catch(error => this.setState({error: error.response.request._response}))
    } else {
      this.setState({ error: 'please provide both an email and a password' })
    }
  }

  setEmail(email) {
    this.setState({email})
  }

  setPassword(password) {
    this.setState({password})
  }

  referencePassword(ref) {
    this.password = ref
  }

  focusPassword() {
    this.password.focus()
  }

  render() {
    return (
      <LoginFormPresenter
        userLogin={this.userLogin}
        setEmail={this.setEmail}
        setPassword={this.setPassword}
        focusPassword={this.focusPassword}
        referencePassword={this.referencePassword}
        error={this.state.error}
        email={this.state.email}
        password={this.state.password} />
    )
  }
}
