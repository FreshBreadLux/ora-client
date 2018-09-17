import React from 'react'
import { Text, View, Image, TouchableOpacity, SafeAreaView, ScrollView, AsyncStorage, Platform } from 'react-native'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import ss from '../../StyleSheet'
import { FollowScrollPresenter, PrayerScrollPresenter, SavedRewardsScrollPresenter } from '../../presenters'

function setProfileImage(userInfo) {
  const style = {height: 70, width: 70, borderRadius: 35, resizeMode: 'cover'}
  if (userInfo.imageUrl) {
    return <Image style={style} source={{ uri: userInfo.imageUrl }} />
  } else {
    return <Image style={style} source={require('../../../assets/images/default-profile-image.png')} />
  }
}

function setCurrentScrollView(activeScrollView, navigation) {
  if (activeScrollView === 'follows') {
    return <FollowScrollPresenter navigation={navigation} />
  } else if (activeScrollView === 'prayers') {
    return <PrayerScrollPresenter navigation={navigation} />
  } else if (activeScrollView === 'rewards') {
    return <SavedRewardsScrollPresenter navigation={navigation} />
  }
}

/*
  Before rendering, ProfilePresenter sets the profileImage (which will either be the remote image
  set by the user, or the local default) and the currentScrollView.
*/
const ProfilePresenter = ({ navigation, userLogout, askCameraRollPermission, userInfo, activeScrollView, setActiveScrollView }) => {

  const profileImage = setProfileImage(userInfo)
  const currentScrollView = setCurrentScrollView(activeScrollView, navigation)

  return (
    <View style={ss.whiteContainer}>
      <ScrollView>
        <View style={[ss.row, ss.spaceAround, ss.padding15, {backgroundColor: '#fff', borderBottomColor: '#ccc', borderBottomWidth: 1}]}>
          <View>
            <TouchableOpacity onPress={askCameraRollPermission}>
              {profileImage}
            </TouchableOpacity>
          </View>
          <View style={ss.center}>
            <Text style={{fontSize: 20}}>{userInfo.consecutiveDays}</Text>
            {userInfo.consecutiveDays > 2
            ? <Text>consecutive{'\n'}days 🔥</Text>
            : <Text>consecutive{'\n'}days</Text>
            }
          </View>
          <View style={ss.center}>
            <Text style={{fontSize: 20}}>{userInfo.totalPrayers}</Text>
            <Text>accepted{'\n'}prayers</Text>
          </View>
        </View>
        <View style={[ss.row, ss.spaceAround, {backgroundColor: '#fff', borderBottomColor: '#ccc', borderBottomWidth: 1}]}>
          <TouchableOpacity style={[ss.flex1, ss.center, ss.padding10]} onPress={() => setActiveScrollView('follows')}>
            <Ionicons
              name="md-heart-outline"
              size={25}
              style={activeScrollView === 'follows' ? {color: '#4577EE'} : {color: '#000'}} />
          </TouchableOpacity>
          <TouchableOpacity style={[ss.flex1, ss.center, ss.padding10]} onPress={() => setActiveScrollView('prayers')}>
            <Ionicons
              name="md-book"
              size={25}
              style={activeScrollView === 'prayers' ? {color: '#4577EE'} : {color: '#000'}} />
          </TouchableOpacity>
          <TouchableOpacity style={[ss.flex1, ss.center, ss.padding10]} onPress={() => setActiveScrollView('rewards')}>
            <Image
              style={{height: 28, width: 32, resizeMode: 'contain'}}
              source={(activeScrollView === 'rewards')
              ? require('../../../assets/images/Key/keys-icon-blue-small.jpg')
              : require('../../../assets/images/Key/keys-icon-black-small.jpg')} />
          </TouchableOpacity>
        </View>
        {currentScrollView}
      </ScrollView>
    </View>
  )
}

const mapState = state => ({
  userInfo: state.userInfo
})

export default connect(mapState)(ProfilePresenter)
