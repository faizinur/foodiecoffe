import { View, Text } from 'react-native';
import React, { useRef } from 'react';
import { useTheme } from 'react-native-paper';
import { Navbar } from '@Molecules';
import { log } from '@Utils';
import { PagerView } from 'react-native-pager-view';
import { HomeTemp, TransTemp, MenuTemp, MejaTemp } from '@Templates';
import styles from './styles';
const INITIAL_PAGE = 0;
export default props => {
    const refPagerView = useRef(<PagerView />);
    const { colors } = useTheme()
    setTimeout(() => {
        log('INI DI SLIDE KE 3')
        _onNavbarChange(3)
    }, 2000)
    const _onNavbarChange = (index) => refPagerView.current?.setPageWithoutAnimation(index)
    return (
        <>
            <PagerView
                ref={refPagerView}
                style={styles.container}
                initialPage={INITIAL_PAGE}
                scrollEnabled={false}>
                <HomeTemp  {...props} key={0} />
                <TransTemp {...props} key={1} />
                <MenuTemp {...props} key={2} />
                <MejaTemp {...props} key={3} />
            </PagerView>
            <Navbar {...props} onChange={_onNavbarChange} />
        </>
    )
}