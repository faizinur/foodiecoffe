import { View } from 'react-native';
import React, { useEffect, memo } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { TitleBar, ExitBar } from '@Molecules';
import { CardProfile, CardTransaksi, CardTraffic } from '@Organisms';
import styles from './styles';
export default memo(({ navigation }) => {
    const { colors } = useTheme();
    useEffect(() => {
        log('Mount AkunTemp');
        return () => {
            log('Unmount AkunTemp')
        }
    }, [])
    return (
        <View style={styles.pages}>
            <TitleBar title={'profil'} />
            <View>
                {/* <CardProfile /> */}
                {/* <CardTransaksi /> */}
                {/* <CardTraffic /> */}
                <ExitBar
                    onPress={() => alert('KELUAR')}
                />
            </View>
        </View>
    )
})