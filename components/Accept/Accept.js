import React from 'react'
import { View, Image, Animated, AlertIOS } from 'react-native'
import PrePrayer from './PrePrayer'
import CurrentPrayer from './CurrentPrayer'
import axios from 'axios'
import ROOT_URL from '../../config'
import styles from '../StyleSheet'

export default class Accept extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPrayer: null,
      fadeAnim: new Animated.Value(0),
      visibleModal: null,
    }
    this.loadNextPrayer = this.loadNextPrayer.bind(this)
    this.fadeOut = this.fadeOut.bind(this)
    this.finishPraying = this.finishPraying.bind(this)
    this.setModal = this.setModal.bind(this)
    this.flagPrayer = this.flagPrayer.bind(this)
    this.followPrayer = this.followPrayer.bind(this)
  }

  fadeOut() {
    Animated.timing(
      this.state.fadeAnim,
      { toValue: 0, duration: 500 }
    ).start()
    setTimeout(this.loadNextPrayer, 500)
  }

  loadNextPrayer() {
    const { userId, fetchUserTotalPrayers } = this.props.screenProps
    axios.put(`${ROOT_URL}/api/prayers/next`, { userId })
    .then(response => response.data)
    .then(prayer => {
      this.setState({ currentPrayer: prayer })
      Animated.timing(
        this.state.fadeAnim,
        { toValue: 1, duration: 500 }
      ).start()
    })
    .then(() => {
      if (userId) fetchUserTotalPrayers(userId)
    })
    .catch(console.error)
  }

  finishPraying() {
    this.setState({
      currentPrayer: null,
      fadeAnim: new Animated.Value(0),
    })
  }

  setModal(name) {
    this.setState({ visibleModal: name })
  }

  flagPrayer(category) {
    const userId = this.props.screenProps.userId
    const prayer = this.state.currentPrayer
    if (userId) {
      axios.post(`${ROOT_URL}/api/flags`, {
        flaggerUserId: userId,
        flagCategory: category,
        prayerId: prayer.id,
        subject: prayer.subject,
        body: prayer.body,
        totalViews: prayer.totalViews,
        totalFollows: prayer.totalFollows,
        closed: prayer.closed,
      })
      .then(() => {
        AlertIOS.alert(
          'This prayer has been flagged',
          'The Ora team will look into this and resolve the issue as quickly as possible',
          () => this.setModal(null)
        )
      })
      .catch(console.error)
    } else {
      AlertIOS.alert('You must be logged in to flag prayers')
    }
  }

  followPrayer() {
    const userId = this.props.screenProps.userId
    const prayer = this.state.currentPrayer
    if (userId) {
      axios.post(`${ROOT_URL}/api/follows`, {
        userId, prayer
      })
      .then(() => {
        this.props.screenProps.fetchUserFollows(userId)
        AlertIOS.alert(
          'You are now following this prayer',
          'You can manage the prayers you follow in the My Follows section',
          () => this.setModal(null)
        )
      })
      .catch(console.error)
    } else {
      AlertIOS.alert('You must be logged in to follow prayers')
    }
  }

  render() {
    return (
      <View style={styles.invisiContainer}>
        <View style={styles.backgroundImageFrame}>
          <Image
            source={require('../../assets/images/Rome.jpg')}
            style={styles.backgroundImage}
          />
        </View>
        {!this.state.currentPrayer
          ? <PrePrayer
              loadNextPrayer={this.loadNextPrayer}
              navigation={this.props.navigation}
            />
          : <View style={styles.opacityContainer}>
              <CurrentPrayer
                statePrayer={this.state.currentPrayer}
                fadeOut={this.fadeOut}
                finishPraying={this.finishPraying}
                flagPrayer={this.flagPrayer}
                followPrayer={this.followPrayer}
                follows={this.props.screenProps.follows}
                opacity={this.state.fadeAnim}
                visibleModal={this.state.visibleModal}
                setModal={this.setModal}
              />
            </View>
        }
      </View>
    )
  }
}
