import React, { useRef } from 'react'
import { MyText } from '@Atoms'
import styles from './styles'
import { RNCamera } from 'react-native-camera';
import { useIsFocused } from '@react-navigation/core';
export default props => {
    const refCamera = useRef(<RNCamera />);
    const PendingView = () => (<MyText>CAMERA ERROR</MyText>)
    const isFocused = useIsFocused();
    return (
        <RNCamera
            ref={refCamera}
            style={styles.rnCamera}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
                title: 'Permission to use audio recording',
                message: 'We need your permission to use your audio',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
            }}
            onGoogleVisionBarcodesDetected={props?.onGoogleVisionBarcodesDetected}>
            {({ camera, status, recordAudioPermissionStatus }) =>
                (status === 'READY' && isFocused)
                && <>{props?.children}</> || <PendingView />
            }
        </RNCamera>
    )
}
