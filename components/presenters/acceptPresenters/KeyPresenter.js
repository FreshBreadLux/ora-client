import React from 'react'
import { TouchableOpacity, View, Image } from 'react-native'

const KeyPresenter = ({ navigation }) => (
  <View style={{height: 90, width: 90, backgroundColor: '#555'}}>
    <TouchableOpacity
      onPress={() => navigation.navigate('RewardContainer')}
      activeOpacity={0.8}>
      <Image
        style={{
          height: 60, width: 30, position: 'absolute', left: 0, top: 15,
          transform: [{rotate: '-135deg'}]}}
        source={require('../../../assets/images/Key/key-ring.png')} />
      <Image
        style={{
          height: 60, width: 30, position: 'absolute', left: 60, top: 15,
          transform: [{rotate: '135deg'}]}}
        source={require('../../../assets/images/Key/key-ring.png')} />
      <Image
        style={{
          height: 30, width: 30, position: 'absolute', left: 15, top: 10,
          transform: [{rotate: '45deg'}]}}
        source={require('../../../assets/images/Key/key-head.png')} />
      <Image
        style={{height: 6.66, width: 30, position: 'absolute', left: 15, top: 53.34}}
        source={require('../../../assets/images/Key/key-head-backing.png')} />
      <Image
        style={{height: 8.34, width: 30, position: 'absolute', left: 15, top: 45.1}}
        source={require('../../../assets/images/Key/key-mid.png')} />
      <Image
        style={{
          height: 30, width: 30, position: 'absolute', left: 45, top: 10,
          transform: [{rotate: '-45deg'}]}}
        source={require('../../../assets/images/Key/key-head.png')} />
      <Image
        style={{height: 6.66, width: 30, position: 'absolute', left: 45, top: 53.34}}
        source={require('../../../assets/images/Key/key-head-backing.png')} />
      <Image
        style={{height: 8.34, width: 30, position: 'absolute', left: 45, top: 45.1}}
        source={require('../../../assets/images/Key/key-mid.png')} />
    </TouchableOpacity>
  </View>
)

export default KeyPresenter
