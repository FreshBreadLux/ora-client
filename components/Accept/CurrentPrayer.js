import React from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, Animated } from 'react-native'
import Modal from 'react-native-modal'
import { Ionicons } from '@expo/vector-icons'
import { FlagModalContent, AboutModalContent, FollowModalContent } from './Modals'
import styles from '../StyleSheet'

const CurrentPrayer = ({ statePrayer, fadeOut, finishPraying, flagPrayer, followPrayer, opacity, visibleModal, setModal }) => (
  <SafeAreaView style={styles.cover}>
    <View style={[styles.addPadding, styles.spaceAround]}>
      <View style={styles.flex1}>
        <Animated.View style={[styles.flex1, styles.center, { opacity }]}>
          <Text style={styles.subject}>{statePrayer.subject}</Text>
        </Animated.View>
      </View>
      <View style={[styles.flex4, styles.fullWidth]}>
        <Animated.ScrollView
          style={[styles.flex1, styles.box, { opacity }]}>
          <Text style={styles.body}>{statePrayer.body}</Text>
        </Animated.ScrollView>
      </View>
      <View style={[styles.flex1, styles.center]}>
        <TouchableOpacity
          onPress={fadeOut}
          style={{padding: 10}}
        >
          <Text style={styles.buttonText}>Next Prayer</Text>
        </TouchableOpacity>
      </View>
      <View style={[
        styles.row,
        styles.spaceAround,
        styles.fullWidth]}
      >
        <TouchableOpacity
          style={[styles.addPadding, styles.center]}
          onPress={finishPraying}
        >
          <Ionicons
            name="ios-home"
            size={26}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.addPadding, styles.center]}
          onPress={() => setModal('about')}
        >
          <Ionicons
            name="ios-help-circle"
            size={26}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.addPadding, styles.center]}
          onPress={() => setModal('flag')}
        >
          <Ionicons
            name="ios-flag"
            size={26}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.addPadding, styles.center]}
          onPress={() => setModal('follow')}
        >
          <Ionicons
            name="ios-bookmark"
            size={26}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={visibleModal === 'flag'}
        style={styles.bottomModal}
      >
        <FlagModalContent
          setModal={setModal}
          flagPrayer={flagPrayer}
        />
      </Modal>
      <Modal
        isVisible={visibleModal === 'about'}
        style={styles.bottomModal}
      >
        <AboutModalContent
          setModal={setModal}
        />
      </Modal>
      <Modal
        isVisible={visibleModal === 'follow'}
        style={styles.bottomModal}
      >
        <FollowModalContent
          setModal={setModal}
          followPrayer={followPrayer}
        />
      </Modal>
    </View>
  </SafeAreaView>
)

export default CurrentPrayer
