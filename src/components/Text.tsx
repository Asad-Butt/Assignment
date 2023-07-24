import {StyleProp, StyleSheet, Text, TextStyle, View} from 'react-native';
import React, {ReactNode} from 'react';

export interface TextProps {
  children: ReactNode;
  color?: string;
  size?: number;
  bold?: boolean;
  marginx?: number;
  marginy?: number;
  paddingx?: number;
  paddingy?: number;
  style?: any;
}

export default function TextComponent(props: TextProps) {
  const styles: StyleProp<TextStyle> = [
    {fontSize: props.size},
    {fontWeight: props.bold ? 'bold' : undefined},
    {color: props.color},
    {marginLeft: props.marginx, marginRight: props.marginx},
    {marginTop: props.marginy, marginBottom: props.marginy},
    {paddingLeft: props.paddingx, paddingRight: props.paddingx},
    {paddingTop: props.paddingy, paddingBottom: props.paddingy},
    props.style,
  ];
  return <Text style={styles}>{props.children}</Text>;
}

