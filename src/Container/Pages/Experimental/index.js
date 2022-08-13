import { View, Text } from 'react-native'
import React from 'react'

export default () => {
    return (
        <View>
            <Text>buat navbar, kalau nilai scrollY kurang dari 1/3 ukuran layar maka navbarnya gak usah di translateY, kalau lebih besar dari 1/3 tinggi layar suruh translateY</Text>
        </View>
    )
}

