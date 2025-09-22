import { Slot } from "expo-router";

import {ThemeProvider, DarkTheme} from '@react-navigation/native'

const black = '#111111'
const white = '#e5e5e7'
const myTheme: typeof DarkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        primary: white,
        text: white,
        background: black,
        card: '#101010',
        border: '#101010',
    }
}


export default function RootLayout(){
    return <ThemeProvider value={myTheme}>
        <Slot />
    </ThemeProvider>
}