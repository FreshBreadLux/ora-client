import React from 'react'
import { Platform } from 'react-native'
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'
import { AcceptContainer, PrayerContainer, FollowContainer, SubmitContainer, ProfileContainer, AlarmContainer, ShareOraContainer, RegisterOraMissionaryContainer, RewardContainer, HomeContainer, SurveySwiperContainer } from './containers'
import { FollowScrollPresenter, PrayerScrollPresenter, FAQPresenter, ChoirRankPresenter, TestimonyPresenter, PrayerHeaderPresenter, TraditionalPrayersPresenter, ReflectionFullTextPresenter, RewardFullTextPresenter, SavedRewardsListPresenter } from './presenters'
import { Constants } from 'expo'
import { Ionicons } from '@expo/vector-icons'

const MainTabNav = TabNavigator({
  Follows: {
    screen: FollowScrollPresenter,
    navigationOptions: {
      title: 'Follows',
      headerBackTitle: null,
      tabBarIcon: ({ focused, tintColor }) => {
        let color = focused ? '#FF4081' : tintColor
        return (
          <Ionicons
            name="md-heart"
            size={26}
            style={{ color }} />
        )
      },
    },
  },
  Prayers: {
    screen: PrayerScrollPresenter,
    navigationOptions: {
      title: 'Prayers',
      headerBackTitle: null,
      tabBarIcon: ({ tintColor }) => (
        <Ionicons
          name="ios-book"
          size={26}
          style={{ color: tintColor }} />
      ),
    },
  },
  Home: {
    screen: HomeContainer,
    navigationOptions: {
      title: 'Home',
      headerBackTitle: null,
      tabBarIcon: ({ tintColor }) => (
        <Ionicons
          name="ios-globe"
          size={26}
          style={{ color: tintColor }} />
      ),
    },
  },
  Submit: {
    screen: SubmitContainer,
    navigationOptions: {
      title: 'New Prayer',
      headerBackTitle: null,
      tabBarIcon: ({ tintColor }) => (
        <Ionicons
          name="ios-paper-plane"
          size={26}
          style={{ color: tintColor }} />
      ),
    },
  },
  Profile: {
    screen: ProfileContainer,
    navigationOptions: {
      title: 'Profile',
      headerBackTitle: null,
      tabBarIcon: ({ tintColor }) => (
        <Ionicons
          name="ios-information-circle"
          size={26}
          style={{ color: tintColor }} />
      ),
    },
  },
}, {
  swipeEnabled: true,
  lazy: false,
  initialRouteName: 'Home',
  tabBarOptions: {
    showLabel: false,
    inactiveTintColor: '#000',
    style: {
      backgroundColor: '#fff',
    }
  },
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
})

const CardStackNav = StackNavigator({
  Root: {
    screen: MainTabNav,
    navigationOptions: {
      header: null,
    },
  },
  Prayer: {
    screen: PrayerContainer,
    navigationOptions: ({ navigation }) => {
      const headerTitleStyle = Platform.OS === 'ios'
        ? { fontFamily: 'raleway', fontSize: 24 }
        : { fontFamily: 'ralewayExtraBold', fontSize: 24 }
      const headerStyle = Platform.OS === 'ios'
        ? { backgroundColor: 'white', borderBottomWidth: 0 }
        : { backgroundColor: 'white', borderBottomWidth: 0, marginTop: Constants.statusBarHeight, elevation: 0 }
      return {
        title: '',
        headerRight: <PrayerHeaderPresenter prayer={navigation.state.params.prayer} />,
        headerTitleStyle,
        headerStyle,
      }
    }
  },
  Follow: {
    screen: FollowContainer,
    navigationOptions: () => {
      const headerTitleStyle = Platform.OS === 'ios'
        ? { fontFamily: 'raleway', fontSize: 24 }
        : { fontFamily: 'ralewayExtraBold', fontSize: 24 }
      const headerStyle = Platform.OS === 'ios'
        ? { backgroundColor: 'white', borderBottomWidth: 0 }
        : { backgroundColor: 'white', borderBottomWidth: 0, marginTop: Constants.statusBarHeight, elevation: 0 }
      return {
        title: '',
        headerTitleStyle,
        headerStyle,
      }
    },
  },
  ChoirRank: {
    screen: ChoirRankPresenter,
    navigationOptions: () => {
      const headerTitleStyle = Platform.OS === 'ios'
        ? { fontFamily: 'raleway', fontSize: 24 }
        : { fontFamily: 'ralewayExtraBold', fontSize: 24 }
      const headerStyle = Platform.OS === 'ios'
        ? { backgroundColor: 'white', borderBottomWidth: 0 }
        : { backgroundColor: 'white', borderBottomWidth: 0, marginTop: Constants.statusBarHeight, elevation: 0 }
      return {
        title: 'NINE CHOIRS',
        headerTitleStyle,
        headerStyle,
      }
    },
  },
  ShareOra: {
    screen: ShareOraContainer,
    navigationOptions: () => {
      const headerTitleStyle = Platform.OS === 'ios'
        ? { fontFamily: 'raleway', fontSize: 24 }
        : { fontFamily: 'ralewayExtraBold', fontSize: 24 }
      const headerStyle = Platform.OS === 'ios'
        ? { backgroundColor: 'white', borderBottomWidth: 0 }
        : { backgroundColor: 'white', borderBottomWidth: 0, marginTop: Constants.statusBarHeight, elevation: 0 }
      return {
        title: 'SHARE ORA',
        headerBackTitle: null,
        headerTitleStyle,
        headerStyle,
      }
    },
  },
  RegisterOraMissionary: {
    screen: RegisterOraMissionaryContainer,
    navigationOptions: () => {
      const headerTitleStyle = Platform.OS === 'ios'
        ? { fontFamily: 'raleway', fontSize: 24 }
        : { fontFamily: 'ralewayExtraBold', fontSize: 24 }
      const headerStyle = Platform.OS === 'ios'
        ? { backgroundColor: 'white', borderBottomWidth: 0 }
        : { backgroundColor: 'white', borderBottomWidth: 0, marginTop: Constants.statusBarHeight, elevation: 0 }
      return {
        title: 'ORA MISSIONARY',
        headerTitleStyle,
        headerStyle,
      }
    },
  },
  Testimony: {
    screen: TestimonyPresenter,
    navigationOptions: () => {
      const headerTitleStyle = Platform.OS === 'ios'
        ? { fontFamily: 'raleway', fontSize: 24 }
        : { fontFamily: 'ralewayExtraBold', fontSize: 24 }
      const headerStyle = Platform.OS === 'ios'
        ? { backgroundColor: 'white', borderBottomWidth: 0 }
        : { backgroundColor: 'white', borderBottomWidth: 0, marginTop: Constants.statusBarHeight, elevation: 0 }
      return {
        title: 'TESTIMONY',
        headerTitleStyle,
        headerStyle,
      }
    },
  },
  Alarms: {
    screen: AlarmContainer,
    navigationOptions: () => {
      const headerTitleStyle = Platform.OS === 'ios'
        ? { fontFamily: 'raleway', fontSize: 24 }
        : { fontFamily: 'ralewayExtraBold', fontSize: 24 }
      const headerStyle = Platform.OS === 'ios'
        ? { backgroundColor: 'white', borderBottomWidth: 0 }
        : { backgroundColor: 'white', borderBottomWidth: 0, marginTop: Constants.statusBarHeight, elevation: 0 }
      return {
        title: 'REMINDERS',
        headerTitleStyle,
        headerStyle,
      }
    },
  },
  FAQ: {
    screen: FAQPresenter,
    navigationOptions: () => {
      const headerTitleStyle = Platform.OS === 'ios'
        ? { fontFamily: 'raleway', fontSize: 24 }
        : { fontFamily: 'ralewayExtraBold', fontSize: 24 }
      const headerStyle = Platform.OS === 'ios'
        ? { backgroundColor: 'white', borderBottomWidth: 0 }
        : { backgroundColor: 'white', borderBottomWidth: 0, marginTop: Constants.statusBarHeight, elevation: 0 }
      return {
        title: 'FAQ',
        headerTitleStyle,
        headerStyle,
      }
    },
  },
  SavedRewardsList: {
    screen: SavedRewardsListPresenter,
    navigationOptions: () => {
      const headerTitleStyle = Platform.OS === 'ios'
        ? { fontFamily: 'raleway', fontSize: 24 }
        : { fontFamily: 'ralewayExtraBold', fontSize: 24 }
      const headerStyle = Platform.OS === 'ios'
        ? { backgroundColor: 'white', borderBottomWidth: 0 }
        : { backgroundColor: 'white', borderBottomWidth: 0, marginTop: Constants.statusBarHeight, elevation: 0 }
      return {
        title: 'REWARDS',
        headerTitleStyle,
        headerStyle,
      }
    },
  },
  SurveySwiper: {
    screen: SurveySwiperContainer,
    navigationOptions: {
      header: null,
    }
  },
}, {
  headerMode: 'screen'
})

const ModalStackNav = StackNavigator({
  Modal: {
    screen: CardStackNav,
    navigationOptions: {
      header: null,
    },
  },
  AcceptContainer: {
    screen: AcceptContainer,
    navigationOptions: {
      header: null,
    },
  },
  RewardContainer: {
    screen: RewardContainer,
    navigationOptions: {
      header: null,
    },
  },
  TraditionalPrayers: {
    screen: TraditionalPrayersPresenter,
    navigationOptions: () => {
      const headerTitleStyle = Platform.OS === 'ios'
        ? { fontFamily: 'raleway', fontSize: 24 }
        : { fontFamily: 'ralewayExtraBold', fontSize: 24 }
      const headerStyle = Platform.OS === 'ios'
        ? { backgroundColor: 'white', borderBottomWidth: 0 }
        : { backgroundColor: 'white', borderBottomWidth: 0, marginTop: Constants.statusBarHeight, elevation: 0 }
      return {
        title: 'PRAYERS',
        headerTitleStyle,
        headerStyle,
      }
    },
  },
  ReflectionFullText: {
    screen: ReflectionFullTextPresenter,
    navigationOptions: () => {
      const headerTitleStyle = Platform.OS === 'ios'
        ? { fontFamily: 'raleway', fontSize: 24 }
        : { fontFamily: 'ralewayExtraBold', fontSize: 24 }
      const headerStyle = Platform.OS === 'ios'
        ? { backgroundColor: 'white', borderBottomWidth: 0 }
        : { backgroundColor: 'white', borderBottomWidth: 0, marginTop: Constants.statusBarHeight, elevation: 0 }
      return {
        title: 'REFLECTION',
        headerTitleStyle,
        headerStyle,
      }
    },
  },
  RewardFullText: {
    screen: RewardFullTextPresenter,
    navigationOptions: () => {
      const headerTitleStyle = Platform.OS === 'ios'
        ? { fontFamily: 'raleway', fontSize: 24 }
        : { fontFamily: 'ralewayExtraBold', fontSize: 24 }
      const headerStyle = Platform.OS === 'ios'
        ? { backgroundColor: 'white', borderBottomWidth: 0 }
        : { backgroundColor: 'white', borderBottomWidth: 0, marginTop: Constants.statusBarHeight, elevation: 0 }
      return {
        title: 'REWARD',
        headerTitleStyle,
        headerStyle,
      }
    },
  },
}, {
  mode: 'modal',
  headerMode: 'screen'
})

// IMPORTANT: ALLOWS MODALSTACKNAV TO MANAGE THE STATE
ModalStackNav.router = CardStackNav.router

const MainNav = () => (
  <ModalStackNav />
)

export default MainNav
