import { View, ScrollView } from 'react-native';
import React, { useEffect, memo } from 'react';
import { log } from '@Utils';
import { useTheme } from 'react-native-paper';
import { TitleBar, ExitBar } from '@Molecules';
import { CardProfile, CardTransaksi, CardTraffic } from '@Organisms';
import styles from './styles';
export default memo(({ navigation }) => {
    const { colors } = useTheme();
    useEffect(() => {
        log('Mount Akun');
        return () => {
            log('Unmount Akun')
        }
    }, [])
    return (
        <View style={styles.pages}>
            <TitleBar title={'profil'} />
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}>
                <CardProfile />
                <CardTransaksi />
                <CardTraffic />
            </ScrollView>
            <ExitBar />
        </View>
    )
})