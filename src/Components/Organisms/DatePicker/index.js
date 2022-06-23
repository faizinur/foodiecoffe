import { View, Modal, TouchableOpacity } from 'react-native'
import React, { useState, forwardRef, useImperativeHandle, useEffect, useCallback } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { log } from '@Utils';
import { MyText } from '@Atoms';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useTheme } from 'react-native-paper';
import moment from 'moment';
import { InputItems } from '@Molecules';

import styles, { width } from './styles'
export default forwardRef((props, ref) => {
    const { colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [marked, setMarked] = useState({});
    const [selectedDay, setSelectedDay] = useState(null);
    useImperativeHandle(ref, () => ({
        toggle,
    }));

    const toggle = useCallback(() => {
        log('_toggle : ')
        setModalVisible(prevState => !prevState);
    }, [modalVisible])
    const _onCloseModal = useCallback(() => {
        setModalVisible(prevState => !prevState);
    }, [modalVisible]);

    const _onDayPress = useCallback(({ dateString, day, month, timestamp, year }) => {
        setMarked({ [dateString]: { selected: true, marked: false, selectedColor: colors.cerulean } });
        setSelectedDay(`${day}/${month}/${year}`)
    }, [marked, modalVisible, selectedDay])

    const _clearSelectedDate = useCallback(() => setMarked({}), [marked])

    const _saveDate = useCallback(() => {
        props?.onChoosenCalendar(selectedDay)
        setModalVisible(prevState => !prevState);
    }, [marked, selectedDay, modalVisible])

    useEffect(() => {
        LocaleConfig.locales['id'] = {
            monthNames: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'Nopember', 'Desember'],
            monthNamesShort: ['Jan.', 'Feb.', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
            dayNames: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum`at', 'Sabtu'],
            dayNamesShort: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
            today: "Hari ini"
        };
        LocaleConfig.defaultLocale = 'id';
        return () => { }
    }, [])
    return (
        <Modal
            animationType={"slide"}
            transparent
            statusBarTranslucent={false}
            visible={modalVisible}
            onRequestClose={_onCloseModal}>
            <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, .2)', justifyContent: 'center', padding: '5%' }}>
                <View style={{ backgroundColor: colors.white, borderRadius: 25, padding: 25 }}>
                    <Calendar
                        // Callback which gets executed when visible months change in scroll view. Default = undefined
                        onVisibleMonthsChange={(months) => { }}
                        // Max amount of months allowed to scroll to the past. Default = 50
                        pastScrollRange={0}
                        // Max amount of months allowed to scroll to the future. Default = 50
                        futureScrollRange={0}
                        // Enable or disable scrolling of calendar list
                        scrollEnabled={true}
                        // Enable or disable vertical scroll indicator. Default = false
                        showScrollIndicator={false}
                        // Enable horizontal scrolling, default = false
                        horizontal={false}
                        // Enable paging on horizontal, default = false
                        pagingEnabled={false}
                        // Set custom calendarWidth.
                        calendarWidth={width * .9}
                        // Initially visible month. Default = now
                        initialDate={moment().format('YYYY-MM-DD')}
                        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                        minDate={`1970-01-01`}
                        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                        maxDate={`3970-01-01`}
                        // Handler which gets executed on day press. Default = undefined
                        onDayPress={_onDayPress}
                        // Handler which gets executed on day long press. Default = undefined
                        onDayLongPress={day => { }}
                        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                        monthFormat={'yyyy MM'}
                        // Handler which gets executed when visible month changes in calendar. Default = undefined
                        onMonthChange={month => { }}
                        // Hide month navigation arrows. Default = false
                        hideArrows={false}
                        // Replace default arrows with custom ones (direction can be 'left' or 'right')
                        renderArrow={direction => <Icon name={`chevron-${direction}`} size={30} color={colors.black} style={direction == 'left' ? { marginLeft: -18 } : { marginRight: -18 }} />}
                        // Do not show days of other months in month page. Default = false
                        hideExtraDays={false}
                        // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
                        // day from another month that is visible in calendar page. Default = false
                        disableMonthChange={true}
                        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
                        firstDay={0}
                        // Hide day names. Default = false
                        hideDayNames={false}
                        // Show week numbers to the left. Default = false
                        showWeekNumbers={false}
                        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                        onPressArrowLeft={subtractMonth => subtractMonth()}
                        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                        onPressArrowRight={addMonth => addMonth()}
                        // Disable left arrow. Default = false
                        disableArrowLeft={false}
                        // Disable right arrow. Default = false
                        disableArrowRight={false}
                        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                        disableAllTouchEventsForDisabledDays={true}
                        // Replace default month and year title with custom one. the function receive a date as parameter
                        renderHeader={date => <MyText black bold>{LocaleConfig.locales.id.monthNames[moment(date).month()]} {moment().year()}</MyText>}
                        // Enable the option to swipe between months. Default = false
                        enableSwipeMonths={true}
                        markedDates={marked}
                        dayComponent={({ date: { dateString, day, month, timestamp, year }, state, marking }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => state !== 'disabled' && _onDayPress({ dateString, day, month, timestamp, year })}
                                    activeOpacity={state !== 'disabled' ? .5 : 1}
                                    style={{ backgroundColor: (`${day}/${month}/${year}` == selectedDay ? colors.cerulean : 'transparent'), borderWidth: .5, borderColor: (state === 'today' ? colors.emerald : colors.white), width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                                    <MyText style={{ color: state === 'disabled' ? 'gray' : (`${day}/${month}/${year}` == selectedDay ? colors.white : colors.black) }}>{day}</MyText>
                                </TouchableOpacity>
                            );
                        }}
                    />

                    <InputItems.MyButton
                        onPress={_saveDate}
                        style={[styles.button, { width: '100%', marginTop: 50 }]}
                        label={'Simpan'}
                        labelStyle={{ fontSize: 16 }} />
                    <MyText bold fontSize={16} color={colors.cerulean} style={{ marginTop: 24, marginBottom: 15 }} onPress={_clearSelectedDate}>Reset</MyText>
                </View>
            </View>
        </Modal>
    )
});