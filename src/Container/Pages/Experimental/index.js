import { View, Text, Button } from 'react-native'
import React from 'react'
import { UsePolling } from '@CustomHooks';

const { log } = console;
export default () => {

    const [startPolling, stopPolling] = UsePolling(async () => {
        fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.json())
            .then(json => log(json))
    })

    return (
        <View>
            <Text>buat navbar, kalau nilai scrollY kurang dari 1/3 ukuran layar maka navbarnya gak usah di translateY, kalau lebih besar dari 1/3 tinggi layar suruh translateY</Text>
            <View>
                <Button title='start' onPress={startPolling} />
                <Button title='stop' onPress={stopPolling} />
            </View>
        </View>
    )
}
