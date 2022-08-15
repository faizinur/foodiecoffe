import { View, FlatList } from 'react-native';
import React, { memo, useRef } from 'react';
import { log } from '@Utils';
import { useTheme, Chip } from 'react-native-paper';
import styles from './styles';
import { DatePicker } from '@Organisms';
export default memo(({ activeOrderList, onPressChips = () => { }, onChoosenCalendar = () => { }, data = [], loading = false }) => {
    const { colors } = useTheme();
    const refDatePicker = useRef(<DatePicker />)

    const _onOpenCalendar = () => refDatePicker?.current?.toggle();
    return (
        <View style={styles.sectionContainer}>
            <View style={styles.chipsContainer}>
                <FlatList
                    data={data}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={({ type }) => `chips-${type}`}
                    renderItem={({ item: { label, icon, type, color } }) =>
                        <Chip
                            icon={activeOrderList == type && icon}
                            mode={'outlined'}
                            selected={activeOrderList == type}
                            selectedColor={activeOrderList == type ? colors.white : color}
                            onPress={() => activeOrderList != type && onPressChips(type)}
                            style={styles.chip(activeOrderList == type ? color : colors.alabaster)}
                            textStyle={styles.chipText}>{label}
                        </Chip>}
                />
                <Chip
                    icon={'calendar-month'}
                    mode={'outlined'}
                    onPress={_onOpenCalendar}
                    style={styles.chipCalendar}
                    textStyle={styles.chipCalendarText}
                >28 Apr 2022
                </Chip>
            </View>
            <DatePicker ref={refDatePicker} onChoosenCalendar={onChoosenCalendar} />
        </View>
    )
})
