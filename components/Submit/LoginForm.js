import React from 'react'
import axios from 'axios'
import { View, SafeAreaView, Text, TouchableOpacity, AsyncStorage, TextInput } from 'react-native'
import { Permissions, Notifications } from 'expo'
import styles from '../StyleSheet'
import ROOT_URL from '../../config'

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null,
      password: null,
      error: false,
    }
    this.setAsyncStorage = this.setAsyncStorage.bind(this)
    this.userSignup = this.userSignup.bind(this)
    this.userLogin = this.userLogin.bind(this)
    this.registerForPushNotificationsAsync = this.registerForPushNotificationsAsync.bind(this)
  }

  async setAsyncStorage(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue)
      this.props.verifyStorageKey()
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message)
    }
  }

  async registerForPushNotificationsAsync() {
    let { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS)
    if (status !== 'granted') return
    let token = await Notifications.getExpoPushTokenAsync()
    return token
  }

  async userSignup() {
    let token = await this.registerForPushNotificationsAsync()
    if (this.state.email && this.state.password) {
      axios.post(`${ROOT_URL}/api/users`, {
        email: this.state.email,
        password: this.state.password,
        pushToken: token,
      })
      .then(response => JSON.stringify(response.data))
      .then(payload => {
        return this.setAsyncStorage('payload', payload)
      })
      .done()
    }
  }

  userLogin() {
    if (this.state.email && this.state.password) {
      axios.post(`${ROOT_URL}/api/users/sessions`, {
        email: this.state.email,
        password: this.state.password,
      })
      .then(response => JSON.stringify(response.data))
      .then(payload => {
        if (payload) {
          return this.setAsyncStorage('payload', payload)
        } else {
          this.setState({error: true})
        }
      })
      .done()
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.invisiContainer}>
        <View style={[styles.flex1, styles.padding15]}>
          <View style={styles.flex1}>
            <Text style={[styles.font20, styles.whiteText, styles.paddingBottom10]}>Email</Text>
            <TextInput
              style={[styles.box, styles.font16]}
              placeholder="Email"
              placeholderTextColor="#555"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={email => this.setState({email})}
              onSubmitEditing={event => this.refs.password.focus()}
              value={this.state.email}
            />
          </View>
          <View style={styles.flex1}>
            <Text style={[styles.font20, styles.whiteText, styles.paddingBottom10]}>Password</Text>
            <TextInput
              ref="password"
              style={[styles.box, styles.font16]}
              placeholder="Password"
              placeholderTextColor="#555"
              secureTextEntry={true}
              onChangeText={password => this.setState({password})}
              value={this.state.password}
            />
          </View>
          <View style={[styles.flex1, styles.center]}>
            <TouchableOpacity
              onPress={this.userSignup}
            >
              <Text style={[styles.font24, styles.whiteText]}>Sign up</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.flex1, styles.center]}>
            <TouchableOpacity
              onPress={this.userLogin}
            >
              <Text style={[styles.font24, styles.whiteText]}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
        {this.state.error
          ? <View style={[styles.flex1, styles.center, styles.padding15]}>
              <Text style={[styles.box, styles.font20, styles.redText, styles.centerText]}>There was an error logging in or signing up. Please double check your email and password and try again.</Text>
            </View>
          : <View style={[styles.flex1, styles.center, styles.padding15]}>
              <Text style={[styles.font20, styles.whiteText, styles.centerText]}>As a matter of safety and security, we require users to be logged in before submitting prayers. We promise never to share your information with anyone.</Text>
            </View>
        }
      </SafeAreaView>
    )
  }
}
