import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import {ScreenWidth} from '../utils'

const QButton = (props) => {
    const {title, onPress, buttonStyle} = props;
    return (
        <TouchableOpacity style={[styles.button, buttonStyle]} onPress={() => onPress()}>
            <Text style={styles.btnText}>{title}</Text>
        </TouchableOpacity>
    );
}

export default QButton;

const styles = StyleSheet.create({
    button: {
        margin: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-around',
        width: ScreenWidth / 3,
        borderRadius: 8
    },
    btnText: {
        fontSize: 16,
        color: '#fff',
        letterSpacing: 0.1,
        fontWeight: '500'
    }
});
