import React, { useRef } from 'react';
import { useTheme } from 'react-native-paper';
import { Navbar } from '@Molecules';
import { PagerView } from 'react-native-pager-view';
import { HomeTemp, TransTemp, MenuTemp, MejaTemp } from '@Templates';
import styles from './styles';
const INITIAL_PAGE = 3;
export default props => {
    const refPagerView = useRef(<PagerView />);
    const { colors } = useTheme()
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
            <Navbar {...props} onChange={_onNavbarChange} INITIAL_PAGE={INITIAL_PAGE} />
        </>
    )
}