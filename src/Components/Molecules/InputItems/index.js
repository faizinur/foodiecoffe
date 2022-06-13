import { log } from '@Utils';
import React, { useState } from 'react';
import { TextInput, Button, useTheme, RadioButton } from 'react-native-paper';
import { MyText } from '@Atoms';
import { View, TouchableOpacity } from 'react-native'
const MyTextInput = (props) => {
    const { colors } = useTheme();
    const defaultColor = props.error ? colors.wildWaterMelon : colors.cerulean;
    let keyboardType = 'keyboardType' in props ? props.keyboardType : 'default';
    const [secureTextEntry, setSecureTextEntry] = useState('secureTextEntry' in props);
    let disabled = props.disabled || false;
    let value = typeof props.value === 'undefined' ? '' : props.value;
    return (
        <View>
            <TextInput
                {...props.register}
                onBlur={props.onBlur}
                onChangeText={props.onChangeText}
                value={value}
                key={props.id}
                disabled={disabled}
                mode='outlined'
                activeOutlineColor={defaultColor}
                outlineColor={colors.lightgray}
                placeholder={props.placeholder || 'placeholder'}
                selectionColor={colors.cerulean}
                keyboardType={keyboardType}
                style={{ backgroundColor: colors.white, marginVertical: 5, fontSize: 14, paddingLeft: keyboardType == 'phone-pad' ? 32 : 0 }}
                theme={{ colors: { placeholder: colors.lightgray, text: colors.black, } }}
                secureTextEntry={secureTextEntry}
                left={keyboardType == 'phone-pad' && <></>}
                right={'secureTextEntry' in props && <></>}
            />
            {/* //LEFT */}
            {('secureTextEntry' in props && JSON.stringify(value) !== '""') && <View style={{ position: 'absolute', top: 28, right: 35, zIndex: 999999 }}>
                <TextInput.Icon
                    name={secureTextEntry ? 'eye-off' : 'eye'}
                    onPress={() => setSecureTextEntry(prevState => !prevState)}
                    size={20}
                    color={JSON.stringify(value) === '""' ? colors.lightgray : colors.cerulean}
                />
            </View> ||
                'dropdown' in props && (
                    <>
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={props.dropdownPress}
                            style={{ height: 60, width: '100%', position: 'absolute', top: 10, left: 0, borderRadius: 12, justifyContent: 'center', alignItems: 'center' }} >
                        </TouchableOpacity>
                        <View style={{ position: 'absolute', top: 28, right: 35, zIndex: 999999 }}>
                            <TextInput.Icon
                                onPress={props.dropdownPress}
                                name={'chevron-down'}
                                size={24}
                                color={JSON.stringify(value) === '""' ? colors.lightgray : colors.black}
                            />
                        </View>
                    </>
                )
                ||
                JSON.stringify(value) !== '""' && <View style={{ position: 'absolute', top: 28, right: 35, zIndex: 999999 }}>
                    <TextInput.Icon
                        name={'close-circle'}
                        onPress={() => props.onResetField(props.name)}
                        size={20}
                        color={JSON.stringify(value) === '""' ? colors.lightgray : colors.cerulean}
                    />
                </View>

            }
            {/* //RIGHT */}
            {keyboardType == 'phone-pad' && <View style={{ position: 'absolute', top: 24, left: 15, zIndex: 999999, flexDirection: 'row' }}>
                <MyText color={colors.black} style={{ marginVertical: 5 }}>+62</MyText>
                <View style={{ width: 1.3, height: 24, marginTop: 3, marginLeft: 16, backgroundColor: colors.lightgray }} />
            </View>}
            {props.error && <MyText small left color={colors.wildWaterMelon} style={{ marginBottom: 12 }}>{props.errorText}</MyText>}
        </View>
    )
}


const MyButton = (props) => {
    const { colors } = useTheme();
    const isDisabled = props?.disabled || false;
    const backgroundColor = props?.disabled ? colors.magnolia : ('secondary' in props ? colors.white : colors.cerulean);
    const labelColor = props?.disabled ? colors.silverChalice : ('secondary' in props ? colors.cerulean : colors.white);
    const borderWidth = props?.disabled ? 0 : ('secondary' in props ? 0.8 : 0);
    return (
        <Button
            disabled={isDisabled}
            onPress={props.onPress}
            style={{ marginVertical: 5, borderWidth, borderColor: colors.cerulean, ...props?.style }}
            contentStyle={{ height: 52, backgroundColor, ...props?.contentStyle }}
            labelStyle={{ color: labelColor, fontWeight: '700', textTransform: 'capitalize' }}
            mode="contained"
        >{props?.label || 'label'}</Button>
    )
}

const MyRadioInput = (props) => {
    const { colors } = useTheme();
    const defaultColor = props.error ? colors.wildWaterMelon : colors.cerulean;
    let value = typeof props.value === 'undefined' ? '' : props.value;
    return (
        <RadioButton.Group onValueChange={props.onChangeText} value={value}>
            <TextInput {...props.register} onBlur={props.onBlur} value={value} key={props.id} disabled={true} mode='outlined' style={{ display: 'none' }} />
            <View style={{ height: 5, width: 5, position: 'absolute', top: -1, left: 0, backgroundColor: 'white' }} />
            <View style={{ marginVertical: 12 }}>
                <MyText left color={colors.black}>{props.placeholder}</MyText>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                    {
                        props?.data.map(({ code, description }) =>
                            <View key={`${code}-${description}`} style={{ flexDirection: 'row', flex: 1 }}>
                                <RadioButton
                                    value={code}
                                    uncheckedColor={colors.lightgray}
                                    color={defaultColor}
                                />
                                <MyText onPress={() => props.onChangeText(code)} center color={value == code ? colors.black : colors.lightgray}>{description}</MyText>
                            </View>
                        )
                    }
                </View>
            </View>
            {props.error && <MyText small color={colors.wildWaterMelon} style={{ marginBottom: 12 }}>Input {props.name} Salah</MyText>}
        </RadioButton.Group>
    );
}

const MyTitleBarInput = (props) => {
    const { colors } = useTheme();
    return <TextInput
        mode='outlined'
        style={{ flex: 1, alignSelf: 'center', backgroundColor: colors.athensGray, fontSize: 14, fontFamily: 'ReadexProLight', paddingLeft: 15 }}
        activeOutlineColor={colors.white}
        outlineColor={colors.white}
        selectionColor={colors.cerulean}
        placeholderTextColor={colors.cerulean}
        theme={{ colors: { text: colors.cerulean } }}
        onSubmitEditing={props.onSubmitEditing}
        placeholder="Search"
        returnKeyType='search'
        returnKeyLabel='Ayo Cari!'
        dense={true}
    />
}

export {
    MyButton,
    MyTextInput,
    MyRadioInput,
    MyTitleBarInput,
}