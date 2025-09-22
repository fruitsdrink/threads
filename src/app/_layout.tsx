import { Slot } from "expo-router";

import {ThemeProvider, DarkTheme} from '@react-navigation/native'

const myTheme: typeof DarkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        primary: '#e5e5e7',
        background: '#212121',
        card: '#212121',
        border: '#212121',
    }
}


export default function RootLayout(){
    return <ThemeProvider value={myTheme}>
        <Slot />
    </ThemeProvider>
}