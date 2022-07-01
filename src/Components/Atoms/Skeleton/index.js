import React from "react";
import { View, Dimensions, StyleSheet } from 'react-native'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
const { width, height } = Dimensions.get('window');

const Image = props => {
    return <View style={{ ...props.style }}>
        <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item {...props.style[1]} />
        </SkeletonPlaceholder>
    </View>
}

const HomePage = () =>
    <View style={styles.HomePageWrapper}>
        <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item width={width * .9} height={54} borderRadius={12} marginHorizontal={width * .05} />
        </SkeletonPlaceholder>
        <View style={styles.imageEmptySkeleton}>
            <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item width={160} height={160} borderRadius={32} />
            </SkeletonPlaceholder>
            <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item width={width * .9} height={31} borderRadius={12} />
            </SkeletonPlaceholder>
            <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item width={width * .9} height={48} borderRadius={12} />
            </SkeletonPlaceholder>
        </View>
        <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item width={width} height={66} borderRadius={0} />
        </SkeletonPlaceholder>
    </View>

const styles = StyleSheet.create({
    HomePageWrapper: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '5%'
    },
    imageEmptySkeleton: {
        height: height * .4,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    }
})

export {
    Image,
    HomePage,
}