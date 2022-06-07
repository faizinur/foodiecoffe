import { View, Text } from 'react-native';
import React, { useRef } from 'react';
import { MyText } from '@Atoms';
import { useTheme } from 'react-native-paper';
import { Navbar } from '@Molecules';
import { log } from '@Utils';
import { PagerView } from 'react-native-pager-view';

import { HomeTemp, TransTemp, MenuTemp, MejaTemp, AkunTemp } from '@Templates';
export default props => {
    const refPagerView = useRef(<PagerView />);
    const { colors } = useTheme()
    const _onNavbarChange = (index) => {
        refPagerView.current?.setPageWithoutAnimation(index)
    }
    return (
        <>
            <PagerView
                ref={refPagerView}
                style={{ flex: 1 }}
                initialPage={0}
                scrollEnabled={false}
            >
                <HomeTemp  {...props} key='0' />
                <TransTemp {...props} key='1' />
                <MenuTemp {...props} key='2' />
                <MejaTemp {...props} key='3' />
                <AkunTemp {...props} key='4' />
            </PagerView>
            <Navbar onChange={_onNavbarChange} />
        </>
    )
}