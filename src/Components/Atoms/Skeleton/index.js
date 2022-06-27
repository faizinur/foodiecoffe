import React from "react";
import { View, Dimensions } from 'react-native'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
const { width, height } = Dimensions.get('window');

const Image = props => {
    return <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item />
    </SkeletonPlaceholder>
}

const HomePage = () =>
    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'space-between', alignItems: 'center', paddingTop: '5%' }}>
        <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item width={width * .9} height={54} borderRadius={12} marginHorizontal={width * .05} />
        </SkeletonPlaceholder>
        <View style={{ height: height * .4, justifyContent: 'space-evenly', alignItems: 'center' }}>
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

export {
    Image,
    HomePage,
}