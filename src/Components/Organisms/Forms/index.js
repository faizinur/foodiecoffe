import React, { useCallback, useEffect, useImperativeHandle, forwardRef, useRef } from 'react'
import { View, } from 'react-native'
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { MyText } from '@Atoms';
import { log, CONSTANT } from '@Utils';
import { InputItems, DropdownModal } from '@Molecules';

export default forwardRef(({ formname = 'myFieldArray', inputList, defaultValue = {}, onFormSubmit, renderButton = undefined, autoClear = false, containerStyle = {}, submitLabel = 'default label', loading = false }, ref) => {
    const refDropdownModal = useRef(<DropdownModal />)

    //Forms
    const FORM_NAME = formname;
    let focusedInput = '';
    let populatedInputlist = inputList.map((inputList) => ({ ...inputList, [inputList.name]: inputList.name in defaultValue ? defaultValue.value : inputList.value }));
    let inputTypes = inputList.map(({ name, type }) => ({ name, type })).reduce((acc, { name, type }) => ({ ...acc, [name]: type }), {})
    const {
        register,
        control,
        handleSubmit,
        reset,
        setValue,
        getValues,
        trigger,
        setError,
        formState: { errors, isValid },
    } = useForm({ defaultValues: { [FORM_NAME]: populatedInputlist }, mode: 'onChange', reValidateMode: 'onChange', });
    const { fields } = useFieldArray({ control, name: FORM_NAME });


    const _onResetField = (name, value = '') => {
        setValue(name, value);
        trigger(name);
    }

    const _onSubmit = async serialized => {
        delete serialized[FORM_NAME];
        onFormSubmit(serialized);
        autoClear == true && reset();
    }

    const _setDefaultValue = useCallback(() => {
        if (JSON.stringify(defaultValue) == '{}') return false;
        Object.keys(defaultValue).map(key => {
            _onResetField(key, defaultValue[key])
            trigger(key)
        })
    }, [])


    useImperativeHandle(ref, () => ({
        resetForms: () => reset(),
        setErrorField: (...args) => setError(...args)
    }));

    useEffect(() => {
        log('Mount Forms')
        _setDefaultValue();
        return () => {
            log('Unmount Forms')
            focusedInput = '';
            populatedInputlist = [];
            inputTypes = {};
        }
    }, [])
    return (
        <View style={containerStyle}>
            {fields?.map(({ id, name, type, inputProps, controllerProps, config }, index) => (
                <View key={`controller-${id}`} >
                    <Controller
                        control={control}
                        name={name}
                        rules={controllerProps?.rules}
                        render={({ field: { onChange, onBlur, value, name, ref } }) => (
                            type == 'text' &&
                            <InputItems.MyTextInput
                                loading={loading}
                                id={id}
                                register={register(`${FORM_NAME}.${name}.value`)}
                                name={name}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                error={name in errors}
                                errorText={errors[name]?.message}
                                onResetField={_onResetField}
                                onFocus={name => focusedInput = name}
                                {...inputProps}
                            />
                            || type == 'dropdown' &&
                            <InputItems.MyTextInput
                                loading={loading}
                                id={id}
                                register={register(`${FORM_NAME}.${name}.value`)}
                                name={name}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                error={name in errors}
                                errorText={errors[name]?.message}
                                onResetField={_onResetField}
                                onFocus={name => focusedInput = name}
                                disabled
                                dropdown
                                dropdownPress={() => refDropdownModal.current?.toggle({ name, data: config.data })}
                                {...inputProps}
                            />
                            || type == 'radio' &&
                            <InputItems.MyRadioInput
                                loading={loading}
                                id={id}
                                register={register(`${FORM_NAME}.${name}.value`)}
                                name={name}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                error={name in errors}
                                errorText={errors[name]?.message}
                                onResetField={_onResetField}
                                onFocus={name => focusedInput = name}
                                data={config?.data || []}
                                {...inputProps} />
                            || type == 'listRadio' &&
                            <InputItems.MyListRadio
                                loading={loading}
                                id={id}
                                register={register(`${FORM_NAME}.${name}.value`)}
                                name={name}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                error={name in errors}
                                errorText={errors[name]?.message}
                                onFocus={name => focusedInput = name}
                                data={config?.data || []}
                                {...inputProps} />
                            || type == 'listCheck' &&
                            <InputItems.MyListCheck
                                loading={loading}
                                id={id}
                                register={register(`${FORM_NAME}.${name}.value`)}
                                name={name}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                error={name in errors}
                                errorText={errors[name]?.message}
                                onFocus={name => focusedInput = name}
                                data={config?.data || []}
                                {...inputProps} />
                            || type == 'textArea' &&
                            <InputItems.MyTextArea
                                loading={loading}
                                id={id}
                                register={register(`${FORM_NAME}.${name}.value`)}
                                name={name}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                error={name in errors}
                                errorText={errors[name]?.message}
                                onFocus={name => focusedInput = name}
                                data={config?.data || []}
                                {...inputProps} />
                            || <MyText>Undefined Input {type}</MyText>
                        )}
                    />
                </View>
            ))}
            {fields.length > 0 && (
                renderButton === undefined ? <InputItems.MyButton
                    loading={loading}
                    label={submitLabel}
                    onPress={handleSubmit(_onSubmit)}
                /> : renderButton(handleSubmit(_onSubmit))
            )}
            <DropdownModal
                ref={refDropdownModal}
                onSelectList={_onResetField}
            />
        </View>
    )
})
