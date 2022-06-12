import { View } from 'react-native';
import React, { memo, } from 'react';
import { log } from '@Utils';
import { useTheme, Chip } from 'react-native-paper';
import styles from './styles';

export default memo(({ activeOrderList, onPressChips = () => { }, onPressCalendar = () => { }, listCount }) => {
    const { colors } = useTheme();
    return (
        <View style={styles.sectionContainer}>
            <View style={styles.chipsContainer}>
                <Chip
                    icon={activeOrderList == 'PAID' && 'check-bold'}
                    mode={'outlined'}
                    selected={activeOrderList == 'PAID'}
                    selectedColor={activeOrderList == 'PAID' ? colors.white : colors.emerald}
                    onPress={() => onPressChips('PAID')}
                    style={styles.chip(activeOrderList == 'PAID' ? colors.emerald : colors.alabaster)}
                    textStyle={styles.chipText}>Selesai {activeOrderList == 'PAID' && `${listCount}`}
                </Chip>
                <Chip
                    icon={activeOrderList == 'CANCELED' && 'close-thick'}
                    mode={'outlined'}
                    selected={activeOrderList == 'CANCELED'}
                    selectedColor={activeOrderList == 'CANCELED' ? colors.white : colors.wildWaterMelon}
                    onPress={() => onPressChips('CANCELED')}
                    style={styles.chip(activeOrderList == 'CANCELED' ? colors.wildWaterMelon : colors.alabaster)}
                    textStyle={styles.chipText}>Batal {activeOrderList == 'CANCELED' && `${listCount}`}
                </Chip>
            </View>
            <Chip
                icon={'calendar-month'}
                mode={'outlined'}
                onPress={onPressCalendar}
                style={styles.chipCalendar}
                textStyle={styles.chipCalendarText}
            >28 Apr 2022
            </Chip>
        </View>
    )
})
