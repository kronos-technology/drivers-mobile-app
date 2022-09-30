import React, { useEffect } from "react";
import { View } from "react-native";
import * as Font from "expo-font";

const LoadingScreen = ({ navigation }) => {

    useEffect(() => {
        async function loadFont() {
            await Font.loadAsync({
                SF_Compact_Display_Regular: require("../assets/fonts/SF-Compact-Display-Regular.ttf"),
                SF_Compact_Display_Medium: require("../assets/fonts/SF-Compact-Display-Medium.ttf"),
                SF_Compact_Display_SemiBold: require("../assets/fonts/SF-Compact-Display-Semibold.ttf"),
                SF_Compact_Display_Bold: require("../assets/fonts/SF-Compact-Display-Bold.ttf"),
                SF_Compact_Display_Light: require("../assets/fonts/SF-Compact-Display-Light.ttf"),
                SF_Compact_Display_UltraLight: require("../assets/fonts/SF-Compact-Display-Ultralight.ttf"),
                SF_Compact_Display_Black: require("../assets/fonts/SF-Compact-Display-Black.ttf"),
                Gidugu_Regular: require('../assets/fonts/Gidugu-Regular.ttf'),
            });
            navigation.navigate('Splash');
        }
        loadFont();
    })

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
        </View>
    )
}

export default LoadingScreen;

