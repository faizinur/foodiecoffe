import { View, Dimensions, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { MyText } from '@Atoms'
import { log } from '@Utils'

import Animated, {
	useSharedValue,
	useAnimatedStyle,
	interpolate,
	useAnimatedScrollHandler
} from 'react-native-reanimated';
const { height, width } = Dimensions.get('window')
export default () => {
	const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
	const [todos, setTodos] = useState([])
	const [contentHeight, setContentHeight] = useState(0)
	const getTodos = useCallback(async () => {
		let todos = await (await fetch('https://jsonplaceholder.typicode.com/todos/')).json()
		setTodos(todos.filter(({ completed }) => completed == true).slice(0, 40))
	}, [todos])

	const cardTodo = ({ item: { title }, index }) => {
		return (
			<TouchableOpacity>
				<MyText left>{index} {title}</MyText>
				<MyText left></MyText>
			</TouchableOpacity>
		)
	}

	// const skrolY = new Animated.value(0)
	const scrollY = useSharedValue(0)
	const yPos = useAnimatedStyle(() => ({
		// transform: [{ translateY: interpolate(scrollY.value, [400, 60], [60, 400]) }]
	}))
	const scrollHandler = useAnimatedScrollHandler({
		onScroll: ({ contentOffset: { y } }) => {
			scrollY.value = y;
		},
	});

	useEffect(() => {
		log('Mount Expreimental');
		getTodos()
		return () => {
			log('Unmount Experimental');
		}
	}, []);

	return (<View style={{ backgroundColor: 'white', flex: 1 }}>
		<AnimatedFlatList
			onContentSizeChange={setContentHeight}
			contentContainerStyle={{ backgroundColor: 'green' }}
			onScroll={scrollHandler}
			keyExtractor={({ id }) => id}
			data={todos}
			renderItem={cardTodo}
			scrollEventThrottle={16}
			showsVerticalScrollIndicator={false}
		/>
		<Animated.View style={[yPos, { backgroundColor: 'red', top: height / 4, height: 30, width, position: 'absolute', }]}>
			<MyText left bold color={'skyblue'}>welcome {scrollY.value} {interpolate(scrollY.value, [400, 60], [60, 400])}</MyText>
		</Animated.View>

	</View>)
}