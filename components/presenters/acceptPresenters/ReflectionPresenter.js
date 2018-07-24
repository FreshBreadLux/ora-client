import React from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, Animated, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { BackgroundImageContainer } from '../../presenters'
import { Feather } from '@expo/vector-icons'
import ss from '../../StyleSheet'

const ReflectionPresenter = ({ finishReflection, copyOpacity, backgroundOpacity, finishPraying, dailyReflection, verseOpacity }) => (
  <View style={ss.whiteContainer}>
    <Animated.View style={[ss.invisiContainer, { opacity: backgroundOpacity }]}>
      <BackgroundImageContainer componentName="Accept" />
      <SafeAreaView style={ss.invisiContainer}>
        <View style={[ss.invisiContainer, ss.padding15]}>
          <Animated.View style={{opacity: copyOpacity}}>
            <TouchableOpacity
              style={ss.padding10}
              onPress={finishPraying}>
              <Feather
                name="x-circle"
                size={20}
                color="#fff" />
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[ss.flex1, ss.center, ss.padding10, {opacity: copyOpacity}]}>
            <Text style={[ss.subHeader, ss.whiteText, ss.centerText]}>Lord, let Your Scriptures inspire me to pray for others. May Your Word fill my heart and my mind with grace, that I might grow in love and understanding.</Text>
          </Animated.View>
          <Animated.View style={[ss.flex2, ss.center, ss.padding10, {opacity: verseOpacity}]}>
            {dailyReflection.text
            ? <Text style={[ss.subHeader, ss.whiteText]}>{`${dailyReflection.text}`}</Text>
            : <ActivityIndicator size="large" color="#fff" />
            }
          </Animated.View>
          <Animated.View style={[ss.padding10, ss.center, {opacity: copyOpacity}]}>
            <TouchableOpacity
              onPress={finishReflection}
              style={[ss.button, ss.threeQuartersWidth]}>
              <Text style={ss.buttonText}>ACCEPT NEW PRAYER</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </SafeAreaView>
    </Animated.View>
  </View>
)

const mapState = state => ({
  dailyReflection: state.dailyReflection
})

export default connect(mapState)(ReflectionPresenter)
