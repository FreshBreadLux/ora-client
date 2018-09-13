import React from 'react'
import { AsyncStorage, Alert } from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import { logout, setProfileImage } from '../../../store'
import { ProfilePresenter } from '../../presenters'
import { ImagePicker, Permissions } from 'expo'
import Sentry from 'sentry-expo'
import ROOT_URL from '../../../config'

class ProfileContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      profileImageLocalBackup: null,
    }
    this.userLogout = this.userLogout.bind(this)
    this.setProfileName = this.setProfileName.bind(this)
    this.pickProfileImage = this.pickProfileImage.bind(this)
    this.setSentryUserContext = this.setSentryUserContext.bind(this)
    this.updateUserProfileImage = this.updateUserProfileImage.bind(this)
    this.askCameraRollPermission = this.askCameraRollPermission.bind(this)
    this.getProfileImageLocalBackup = this.getProfileImageLocalBackup.bind(this)
  }

  componentDidMount() {
    this.setSentryUserContext()
    this.getProfileImageLocalBackup()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userInfo.firstName !== this.props.userInfo.firstName) {
      this.setProfileName()
    }
  }

  setSentryUserContext() {
    Sentry.setUserContext({
      id: this.props.userInfo.id,
      email: this.props.userInfo.email
    })
  }

  /*
    Check for a profile image local backup; if it exists, put it on state to use as a backup
    if there isn't a url in the database
  */
  async getProfileImageLocalBackup() {
    const profileImageLocalBackup = await AsyncStorage.getItem('ora-profile-image')
    if (profileImageLocalBackup) this.setState({ profileImageLocalBackup })
  }

  setProfileName() {
    let firstName = this.props.userInfo.firstName
    if (firstName) {
      this.props.navigation.setParams({ firstName })
    }
  }

  async askCameraRollPermission() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
    if (status === 'granted') {
      this.pickProfileImage()
    }
  }

  async pickProfileImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5
    })
    if (!result.cancelled) {
      console.log('full result:', result)
      this.updateUserProfileImage(result.uri)
    }
  }

  /*
    updateUserProfileImage first stores the local uri in AsyncStorage as a backup in case the
    axios put is unsuccessful. It then sets the store state imageUrl to null, so that if the
    axios put fails, the chosen image will still show (the problem is, that will only be true
    for the current session and not any future sessions). It then updates the uri in the database
    and finally places the new uri on store state.
    TODO: I need to figure out a better solution for the possibility of an updated profile image
    when the user doesn't have signal, and I also need to add AWS S3 functionality.
  */
  async updateUserProfileImage(uri) {
    console.log('image uri:', uri)
    await AsyncStorage.setItem('ora-profile-image', uri)
    this.setState({ profileImageLocalBackup: uri })
    this.props.dispatchSetProfileImage(null)
    const res = await axios.put(`${ROOT_URL}/api/users/${this.props.userInfo.id}`, {imageUrl: uri})
    const updatedImageUrl = res.data.imageUrl
    this.props.dispatchSetProfileImage(updatedImageUrl)
  }

  async userLogout() {
    try {
      await AsyncStorage.removeItem('oraAuth_v1.1.0')
      this.props.logUserOut()
      Alert.alert('Logout Successful')
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message)
    }
  }

  render() {
    return (
      <ProfilePresenter
        userLogout={this.userLogout}
        navigation={this.props.navigation}
        askCameraRollPermission={this.askCameraRollPermission}
        profileImageLocalBackup={this.state.profileImageLocalBackup} />
    )
  }
}

const mapState = state => ({
  userInfo: state.userInfo
})

const mapDispatch = dispatch => ({
  logUserOut: () => dispatch(logout()),
  dispatchSetProfileImage: uri => dispatch(setProfileImage(uri)),
})

export default connect(mapState, mapDispatch)(ProfileContainer)
