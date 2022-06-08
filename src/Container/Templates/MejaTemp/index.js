import { View } from 'react-native';
import React, { useEffect, memo, useState } from 'react';
import { log } from '@Utils';
import { useTheme, Searchbar } from 'react-native-paper';
import { MyText } from '@Atoms';
import { TitleBar } from '@Molecules';
import { CardMeja } from '@Organisms';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default memo(({ navigation }) => {
    const { colors } = useTheme();
    const [isSearch, setIsSearch] = useState(false);
    useEffect(() => {
        log('Mount MejaTemp');
        return () => {
            log('Unmount MejaTemp')
        }
    }, [])
    return (
        <View style={styles.pages}>
            <TitleBar
                renderTitle={() =>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        {
                            isSearch ?
                                <Searchbar
                                    style={{ flex: 1, height: 50 }}
                                    placeholder="Search"
                                />
                                :
                                <MyText center color={colors.black} style={{ textTransform: 'capitalize' }}>pilih meja</MyText>
                        }
                        <Icon name={isSearch ? 'close' : 'search-web'} size={26} onPress={() => setIsSearch(prevState => !prevState)} />
                    </View>
                }
            />
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
