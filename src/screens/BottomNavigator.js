import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

function BottomNavigator(props) {
  const {navigation} = props;
  return (
    <TouchableOpacity style={styles.container}>
      <Icon
        size={28}
        name="add"
        type="material"
        color="#ffd700"
        raised={true}
        onPress={() => {
          // console.log('cakkkaksdkk');
          navigation.navigate('PasswordForm', {item: 'No-Item', createFlag: 1});
        }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
});

export default BottomNavigator;
