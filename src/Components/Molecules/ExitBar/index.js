import { View, TouchableOpacity, Alert } from 'react-native';
import React, { memo } from 'react';
import { log, MyRealm } from '@Utils';
import { useTheme } from 'react-native-paper';
import { MyText } from '@Atoms';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { reset } from '@RootNavigation';
import { useDispatch } from 'react-redux';
import { setUser } from '@Actions';
import { APP_CONFIG, } from '@Utils/Realm/types';
export default memo(() => {
    const { colors } = useTheme();
    const dispatch = useDispatch();
    const _onLogOut = () => {

        log('_onLogOut : ');
        Alert.alert(
            'Foodie Coffe',
            'Mau keluar nih?',
            [{
                text: "Batal", onPress: () => log("Cancel Pressed"), style: "cancel"
            },
            {
                text: "Mau aja", onPress: async () => {
                    await MyRealm.deleteData(APP_CONFIG);
                    await MyRealm.deleteData(PRODUCT);
                    await MyRealm.deleteData(PRODUCT_OPTION);
                    await MyRealm.deleteData(PRODUCT_OPTION_LIST);
                    dispatch(setUser({
                        user: {
                            id: "-",
                            name: "-",
                            username: "-",
                            image: {
                                title: "-",
                                name: "-",
                                url: "-",
                            },
                            email: "-",
                            role: "-",
                            merchantId: "-",
                        },
                        token: {
                            access_token: "-",
                            refresh_token: "-",
                        }
                    }));
                    await MyRealm.closeConnection()
                    reset('Splash')
                }
            }]
        )
    }
    return (
        <TouchableOpacity
            activeOpacity={.8}
            onPress={_onLogOut}
            style={styles.exitBarContainer}>
            <Icon name='location-exit' size={30} color={colors.cerulean} style={styles.iconExit} />
            <View style={styles.container}>
                <MyText medium bold left black>Keluar</MyText>
                <MyText light left >Anda tidak akan dapat menggunakan layanan Foody, kecuali Anda login kembali</MyText>
            </View>
        </TouchableOpacity>
    )
})
