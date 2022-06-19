import { DefaultTheme } from 'react-native-paper';
export default {
    ...DefaultTheme,
    // Specify custom property
    myOwnProperty: true,
    // Specify custom property in nested object
    colors: {
        ...DefaultTheme.colors,
        primary: '#3BAFDA',
        accent: '#F1556C',
        black: '#1B1D21',
        jumbo: '#75777C',
        silverChalice: '#B0B0B0',
        lightgray: '#CDCFD2',
        athensGray: '#EEEFF1',
        alabaster: '#FBFBFB',
        white: '#FFFFFF',
        cerulean: '#3BAFDA',
        fog: '#D5D0FF',
        moonRaker: '#DFDBFF',
        titanWhite: '#EEEBFF',
        magnolia: '#F5F4FF',
        wildWaterMelon: '#F1556C',
        valencia: '#E24C4B',
        emerald: '#19CC85',
        caribbeanGreen: '#09DB93',
        lightningYellow: '#FAC319',
        text: 'black',
    },
    fonts: {
        light: {
            fontFamily: "ReadexProLight",
            fontWeight: "normal"
        },
        medium: {
            fontFamily: "ReadexProMedium",
            fontWeight: "normal"
        },
        regular: {
            fontFamily: "ReadexProRegular",
            fontWeight: "normal"
        },
        thin: {
            fontFamily: "ReadexProExtraLight",
            fontWeight: "normal"
        }
    },
    roundness: 12,
};

// color name ref : https://www.hexdictionary.com/color/ff1800