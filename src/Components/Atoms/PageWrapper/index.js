import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
export default props => <KeyboardAwareScrollView
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
    style={styles.container(props?.noGap ? '0%' : '5%')}>
    {props.children}
</KeyboardAwareScrollView>