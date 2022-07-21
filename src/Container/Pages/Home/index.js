import React, { useRef, useState, useEffect } from 'react';
import { useTheme } from 'react-native-paper';
import { Navbar } from '@Molecules';
import { PagerView } from 'react-native-pager-view';
import { Skeleton } from '@Atoms';
import { HomeTemp, TransTemp, MenuTemp, MejaTemp } from '@Templates';
import styles from './styles';
const INITIAL_PAGE = 0;
export default props => {
    const refPagerView = useRef(<PagerView />);
    const refNavbar = useRef(<Navbar />);
    const { colors } = useTheme()
    const _onNavbarChange = (index) => refPagerView.current?.setPageWithoutAnimation(index)
    const _animateNavbar = (...args) => refNavbar?.current?.toggle(...args)
    const [appReady, setAppReady] = useState(false);
    useEffect(() => {
        setTimeout(() => setAppReady(true), 500);
        return () => { }
    }, [])
    return (
        appReady == false && <Skeleton.HomePage /> ||
        <>
            <PagerView
                ref={refPagerView}
                style={styles.container}
                initialPage={INITIAL_PAGE}
                scrollEnabled={false}>
                <HomeTemp  {...props} key={0} />
                {/* 
                <TransTemp {...props} key={1} />
                <MenuTemp {...props} key={2} />
                <MejaTemp {...props} key={3} animateNavbar={_animateNavbar} /> */}
            </PagerView>
            <Navbar {...props} ref={refNavbar} onChange={_onNavbarChange} INITIAL_PAGE={INITIAL_PAGE} />
        </>
    )
}