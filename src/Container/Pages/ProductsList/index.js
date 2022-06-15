import { View, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, memo, useRef, useCallback } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { TitleBar } from '@Molecules';
import { MyText } from '@Atoms';
import { CardProduct } from '@Organisms';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
export default memo(({ navigation: { navigate }, route: { params } }) => {
    const { colors } = useTheme();

    useEffect(() => {
        log('Mount ProductsList');
        return () => {
            log('Unmount ProductsList')
        }
    }, [])
    return (
        <View style={styles.container}>
            <TitleBar
                title={params.name}
                renderRight={() => <TouchableOpacity
                    activeOpacity={.8}
                    // onPress={}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Icon name={'filter'} size={26} color={colors.black} />
                </TouchableOpacity>}
            />
            <View style={{ backgroundColor: colors.white, flex: 1 }}>
                <CardProduct />
            </View>
        </View >
    )
})