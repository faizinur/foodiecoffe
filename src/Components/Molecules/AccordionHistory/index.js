import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { List } from 'react-native-paper';
import { View } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper';
import { MyText } from '@Atoms';
import styles from './styles';

export default props => {
    const { colors } = useTheme();
    const left = ({ isExpanded }) => (<View style={styles.leftIcon(props?.color)}>
        <Icon name={props?.leftIcon} size={17} color={colors.white} />
    </View>)
    const right = ({ isExpanded }) =>
        <View style={styles.rightIcon(props?.color, isExpanded)}>
            <MyText color={colors.white} bold center>{props?.dataCount}</MyText>
            {!isExpanded && <Icon name='chevron-right' size={22} color={colors.white} />}
        </View>
    return (
        <View style={styles.container}>
            <List.Accordion titleStyle={styles.titleStyle} style={styles.listStyle} left={left} title={props?.title} right={right}>
                {props?.children}
            </List.Accordion>
        </View>
    )
}

