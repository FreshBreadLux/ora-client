import React from 'react'
import { Text, SafeAreaView, TouchableOpacity, View, AsyncStorage, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { KeyContainer } from '../../containers'
import { BackgroundImageContainer } from '../../presenters'
import ss from '../../StyleSheet'
import { Ionicons } from '@expo/vector-icons'

function getDateString() {
  let date = new Date().setMinutes(new Date().getMinutes() - new Date().getTimezoneOffset())
  return new Date(date).toISOString().slice(0, 10)
}

const HomePresenter = ({ navigation, adminReset, isAdmin, prayerStatus }) => (
  <View style={ss.invisiContainer}>
    <BackgroundImageContainer componentName="Accept" />
    <SafeAreaView style={[ss.invisiContainer]}>
      <View style={[ss.flex2, ss.center]}>
        <Text style={[ss.title]}>ORA</Text>
      </View>
      <View style={[ss.flex1, ss.center]}>
        <KeyContainer navigation={navigation} />
      </View>
      <View style={[ss.flex1, ss.center]}>
        <View style={[ss.row, ss.spaceAround, ss.fullWidth]}>
          <TouchableOpacity
            style={[ss.whiteButton, {width: '40%', borderColor: '#fff'}]}
            onPress={() => navigation.navigate('SubmitSubject')}>
            {prayerStatus === 'sending'
            ? <ActivityIndicator size="small" color="#000" />
            : <View>
                {prayerStatus === 'failed'
                ? <Text style={[ss.buttonText, ss.redText]}>FAILED</Text>
                : <Text style={ss.buttonText}>
                    {prayerStatus === 'sent'
                    ? 'SENT!'
                    : 'SUBMIT'
                    }
                  </Text>
                }
              </View>
            }
          </TouchableOpacity>
          <TouchableOpacity
            style={[ss.whiteButton, {width: '40%', borderColor: '#fff'}]}
            onPress={() => navigation.navigate('AcceptContainer')}>
            <Text style={[ss.buttonText]}>PRAY</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isAdmin
      ? <View style={ss.row}>
          <TouchableOpacity
            style={[ss.padding10, {alignSelf: 'flex-end'}]}
            onPress={adminReset}>
            <Ionicons
              name="ios-log-out"
              size={24}
              color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[ss.padding10, {alignSelf: 'flex-end'}]}
            onPress={async () => {
              const today = getDateString()
              try {
                await AsyncStorage.setItem(`unlockAnimationCompleted-${today}`, 'false')
                console.log('reset unlockAnimationCompleted')
              } catch (error) {
                console.warn('Error with AsyncStorage:', error)
              }
            }}>
            <Ionicons
              name="ios-information-circle"
              size={24}
              color="#fff" />
          </TouchableOpacity>
        </View>
      : null
    }
    </SafeAreaView>
  </View>
)

const mapState = state => ({
  isAdmin: state.userInfo.isAdmin,
  prayerStatus: state.anonymousPrayerCompositions.prayerStatus
})

export default connect(mapState)(HomePresenter)