import { View } from 'react-native';
import React, { useEffect, memo } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { MyText } from '@Atoms';
import { TitleBar } from '@Molecules';
import { CardMeja } from '@Organisms';
import styles from './styles';
export default memo(({ navigation }) => {
    const { colors } = useTheme();

    useEffect(() => {
        log('Mount MejaTemp');
        return () => {
            log('Unmount MejaTemp')
        }
    }, [])
    return (
        <View style={styles.pages}>
            <TitleBar title={'pilih meja'} />
            <View style={styles.sectionContainer}>
                <MyText bold medium color={colors.black} left>Cek Mejamu disini</MyText>
                <MyText left>Yuk, pilih lokasi mejamu sebelum penuh</MyText>
            </View>
            <View style={styles.content}>
                <CardMeja number={'01'} isServed={false} location={'Lantai 1'} capaity={'1 - 10'} onPress={() => log('pressed')} />
                <CardMeja number={'02'} isServed={true} location={'Lantai 1'} capaity={'1 - 10'} onPress={() => log('pressed')} />
                <CardMeja number={'01'} isServed={false} location={'Lantai 1'} capaity={'1 - 10'} onPress={() => log('pressed')} />
            </View>
        </View>
    )
})
