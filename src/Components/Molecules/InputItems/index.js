import { log } from '@Utils';
import React, { useState } from 'react';
import { TextInput, Button, useTheme, RadioButton } from 'react-native-paper';
import { MyText } from '@Atoms';
import { View, TouchableOpacity } from 'react-native'
import styles from './styles';
const MyTextInput = (props) => {
    const { colors } = useTheme();
    // color
    const defaultColor = props.error ? colors.wildWaterMelon : colors.cerulean;
    const defaultPlaceholderColor = props.error ? colors.wildWaterMelon : colors.lightgray;
    const defaultTextColor = props.error ? colors.wildWaterMelon : colors.black;
    const defaultIconColor = props.error ? colors.wildWaterMelon : JSON.stringify(value) === '""' ? colors.lightgray : colors.cerulean;
    const defaultDropdownIconColor = props.error ? colors.wildWaterMelon : JSON.stringify(value) === '""' ? colors.lightgray : colors.black;
    // color

    const placeholder = props.placeholder || 'placeholder'
    let keyboardType = 'keyboardType' in props ? props.keyboardType : 'default';
    const [secureTextEntry, setSecureTextEntry] = useState('secureTextEntry' in props);
    let disabled = props.disabled || false;
    let value = typeof props.value === 'undefined' ? '' : props.value;
    let returnKeyType = props.returnKeyType || null;

    // RIGHT BUTTON
    const PasswordRightIcon = () => (<View style={styles.rightIconContainer}>
        <TextInput.Icon
            name={secureTextEntry ? 'eye-off' : 'eye'}
            onPress={() => setSecureTextEntry(prevState => !prevState)}
            size={20}
            color={defaultIconColor}
        />
    </View>)
    const DropDownRightIcon = () => (<>
        <TouchableOpacity activeOpacity={.8} onPress={props.dropdownPress} style={styles.dropDownRightIconContainer} />
        <View style={styles.rightIconContainer}>
            <TextInput.Icon
                onPress={props.dropdownPress}
                name={'chevron-down'}
                size={24}
                color={defaultDropdownIconColor} />
        </View>
    </>)
    const DefaultClearIcon = () => (<View style={styles.rightIconContainer}>
        <TextInput.Icon
            name={'close-circle'}
            onPress={() => props.onResetField(props.name)}
            size={20}
            color={defaultIconColor} />
    </View>)

    //LEFT 
    const LeftPhonePadIcon = () => (<View style={styles.leftIconContainer}>
        <MyText black style={styles.prefixNumber}>+62</MyText>
        <View style={styles.prefixDivider} />
    </View>)
    return (
        <View>
            <TextInput
                {...props.register}
                onBlur={props.onBlur}
                returnKeyType={returnKeyType}
                onChangeText={props.onChangeText}
                value={value}
                key={props.id}
                disabled={disabled}
                mode='outlined'
                activeOutlineColor={defaultColor}
                outlineColor={defaultPlaceholderColor}
                placeholder={placeholder}
                selectionColor={colors.cerulean}
                keyboardType={keyboardType}
                style={styles.textInput(keyboardType == 'phone-pad' ? 32 : 0)}
                theme={{ colors: { placeholder: defaultPlaceholderColor, text: defaultTextColor, } }}
                secureTextEntry={secureTextEntry}
                left={keyboardType == 'phone-pad' && <></>}
                right={'secureTextEntry' in props && <></>}
            />
            {/* //RIGHT */}
            {('secureTextEntry' in props && JSON.stringify(value) !== '""') && (<PasswordRightIcon />) ||
                'dropdown' in props && (<DropDownRightIcon />) ||
                JSON.stringify(value) !== '""' && (<DefaultClearIcon />)
            }
            {/* //LEFT */}
            {keyboardType == 'phone-pad' && (<LeftPhonePadIcon />)}
            {props.error && <MyText small left color={colors.wildWaterMelon}>{props.errorText}</MyText>}
        </View >
    )
}


const MyButton = (props) => {
    const { colors } = useTheme();
    const disabled = props?.disabled || false;
    const backgroundColor = props?.disabled ? colors.magnolia : ('secondary' in props ? colors.white : colors.cerulean);
    const labelColor = props?.disabled ? colors.silverChalice : ('secondary' in props ? colors.cerulean : colors.white);
    const borderWidth = props?.disabled ? 0 : ('secondary' in props ? 0.8 : 0);
    const btnLoading = props?.loading || false;
    return (
        <Button
            loading={btnLoading}
            disabled={disabled}
            onPress={disabled != true && props.onPress}
            style={[styles.button(borderWidth), props?.style]}
            contentStyle={[styles.buttonContent(backgroundColor), props?.contentStyle]}
            labelStyle={[styles.buttonLabel(labelColor), props?.labelStyle]}
            mode="contained"
        >{btnLoading != true ? (props?.label || 'label') : ''}</Button>
    )
}

const MyRadioInput = (props) => {
    const { colors } = useTheme();
    const defaultColor = props.error ? colors.wildWaterMelon : colors.cerulean;
    let value = typeof props.value === 'undefined' ? '' : props.value;
    return (
        <RadioButton.Group onValueChange={props.onChangeText} value={value}>
            <TextInput {...props.register} onBlur={props.onBlur} value={value} key={props.id} disabled={true} mode='outlined' style={{ display: 'none' }} />
            <View style={styles.hiddenInputPatch} />
            <View style={styles.switchWrapper}>
                <MyText left black>{props.placeholder}</MyText>
                <View style={styles.switchContainer}>
                    {
                        props?.data.map(({ code, description }) =>
                            <View key={`${code}-${description}`} style={styles.switchInnerContainer}>
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
            {props.error && <MyText small color={colors.wildWaterMelon}>Input {props.name} Salah</MyText>}
        </RadioButton.Group>
    );
}

const MyTitleBarInput = (props) => {
    const { colors } = useTheme();
    const disabled = props?.disabled || false;
    return <TextInput
        mode='outlined'
        style={styles.titleBarinput}
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
        {...props}
        disabled={disabled}
        onPress={disabled == false && props?.onPress}
    />
}

const MyListRadio = props => {
    const { colors } = useTheme();
    const defaultColor = props.error ? colors.wildWaterMelon : colors.cerulean;
    let value = typeof props.value === 'undefined' ? '' : props.value;
    return <View style={{ marginBottom: 60 }}>
        <RadioButton.Group onValueChange={props.onChangeText} value={value}>
            <TextInput {...props.register} onBlur={props.onBlur} value={value} key={props.id} disabled={true} mode='outlined' style={{ display: 'none' }} />
            <View style={styles.hiddenInputPatch} />
            <MyText left black bold>{props.label}</MyText>
            <MyText left >{props.placeholder}</MyText>
            {props?.data.map(({ code, description }) =>
                <TouchableOpacity key={`${code}-${description}`} onPress={() => props.onChangeText(code)} style={{ flex: 1, justifyContent: 'space-between', marginVertical: 13, flexDirection: 'row', borderBottomColor: colors.athensGray, borderBottomWidth: 1 }}>
                    <MyText black>{code}</MyText>
                    <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                        <MyText black>{description}</MyText>
                        <RadioButton value={code} />
                    </View>
                </TouchableOpacity>
            )}
        </RadioButton.Group>
    </View>
}
const MyListCheck = props => {
    const { colors } = useTheme();
    return <View>
        <MyText>MyListRadio</MyText>
    </View>
}
const MyTextArea = props => {
    const { colors } = useTheme();
    return <View>
        <MyText>MyListRadio</MyText>
    </View>
}

export {
    MyButton,
    MyTextInput,
    MyRadioInput,
    MyTitleBarInput,
    MyListRadio,
    MyListCheck,
    MyTextArea,
}