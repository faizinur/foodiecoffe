import { log } from '@Utils';
import React, { useState } from 'react';
import { TextInput, Button, useTheme, RadioButton } from 'react-native-paper';
import { MyText } from '@Atoms';
import { View } from 'react-native'
const MyTextInput = (props) => {
    const { colors } = useTheme();
    const defaultColor = props.error ? colors.wildWaterMelon : colors.cerulean;
    let keyboardType = 'keyboardType' in props ? props.keyboardType : 'default';
    const [secureTextEntry, setSecureTextEntry] = useState('secureTextEntry' in props)
    let disabled = props.disabled || false;
    return (
        <View>
            <TextInput
                disabled={disabled}
                mode='outlined'
                activeOutlineColor={defaultColor}
                outlineColor={colors.lightgray}
                placeholder={props.placeholder || 'placeholder'}
                selectionColor={colors.cerulean}
                keyboardType={keyboardType}
                style={{ backgroundColor: colors.white, marginVertical: 5, fontSize: 14, paddingLeft: keyboardType == 'phone-pad' ? 32 : 0 }}
                theme={{ colors: { placeholder: colors.lightgray } }}
                secureTextEntry={secureTextEntry}
                left={keyboardType == 'phone-pad' && <></>}
                right={'secureTextEntry' in props && <></>}
            />
            {/* //LEFT */}
            {'secureTextEntry' in props && <View style={{ position: 'absolute', top: 28, right: 35, zIndex: 999999 }}>
                <TextInput.Icon
                    name={secureTextEntry ? 'eye-off' : 'eye'}
                    onPress={() => setSecureTextEntry(prevState => !prevState)}
                    size={20}
                    color={colors.cerulean}
                />
            </View> ||
                'dropdown' in props && <View style={{ position: 'absolute', top: 28, right: 35, zIndex: 999999 }}>
                    <TextInput.Icon
                        name={'chevron-down'}
                        onPress={props.dropdownPress}
                        size={24}
                        color={colors.lightgray}
                    />
                </View>
            }
            {/* //RIGHT */}
            {keyboardType == 'phone-pad' && <View style={{ position: 'absolute', top: 24, left: 15, zIndex: 999999, flexDirection: 'row' }}>
                <MyText color={colors.lightgray} style={{ marginVertical: 5 }}>+62</MyText>
                <View style={{ width: 1.3, height: 24, marginTop: 3, marginLeft: 16, backgroundColor: colors.lightgray }} />
            </View>}
            {props.error && <MyText small color={colors.wildWaterMelon} style={{ marginBottom: 12 }}>Input Salah</MyText>}
        </View>
    )
}


const MyButton = (props) => {
    const { colors } = useTheme();
    const isDisabled = props?.disabled || false;
    return (
        <Button
            disabled={isDisabled}
            onPress={props.onPress}
            style={{ marginVertical: 5, ...props?.style }}
            contentStyle={{ height: 52, backgroundColor: isDisabled ? colors.magnolia : colors.cerulean, ...props?.contentStyle }}
            labelStyle={{ color: isDisabled ? colors.lightgray : colors.white, fontWeight: '700', textTransform: 'capitalize' }}
            mode="contained"
        >{props?.label || 'label'}</Button>
    )
}

const MyRadioInput = (props) => {
    const { colors } = useTheme();
    const defaultColor = props.error ? colors.wildWaterMelon : colors.cerulean;
    const [value, setValue] = useState('')
    return (
        <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
            <View style={{ marginVertical: 12 }}>
                <MyText left color={colors.black}>{props.placeholder}</MyText>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                    {
                        props.config.data.map(({ code, description }) =>
                            <View key={`${code}-${description}`} style={{ flexDirection: 'row', flex: 1 }}>
                                <RadioButton
                                    value={code}
                                    uncheckedColor={colors.lightgray}
                                    color={defaultColor}
                                />
                                <MyText onPress={() => setValue(code)} center color={value == code ? colors.black : colors.lightgray}>{description}</MyText>
                            </View>
                        )
                    }
                </View>
            </View>
            {props.error && <MyText small color={colors.wildWaterMelon} style={{ marginBottom: 12 }}>Input Salah</MyText>}
        </RadioButton.Group>
    );
}

export {
    MyButton,
    MyTextInput,
    MyRadioInput,
}