import {Pressable, StyleProp, StyleSheet, Text, View, ViewProps, ViewStyle} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface HeaderProps {
  styles?: StyleProp<ViewStyle>;
  title: string;
  backable?: boolean;
  onPressOption?:any;
  hasOptionButton?: boolean;
}
export default function Header(props: HeaderProps) {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, props.styles]}>
      {props?.backable && (
        <Pressable style={styles.backButton} onPress={navigation.goBack}>
          <Ionicons name="arrow-back" color="white" size={24} />
        </Pressable>
      )}

      <Text style={styles.title}>{props.title}</Text>
      {props?.hasOptionButton && (
        <Pressable style={styles.optionsButton} onPress={props.onPressOption}>
          <MaterialCommunityIcons
            name="dots-vertical"
            color="white"
            size={24}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    backgroundColor: 'rgb(33,33,33)',
    paddingHorizontal: 15,
  },

  backButton: {
    padding: 10,
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  },
  optionsButton: {
    padding: 5,
    position: 'absolute',
    top: 8,
    right: 15,
  },
});
