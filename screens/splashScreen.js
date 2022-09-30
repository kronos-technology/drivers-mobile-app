import { Text, StyleSheet, BackHandler, View, Image, SafeAreaView, StatusBar } from 'react-native'
import React, { useCallback } from 'react'
import { Colors, Fonts, Sizes, } from '../constants/styles';
import { useFocusEffect } from '@react-navigation/native';

const SplashScreen = ({ navigation }) => {

    const backAction = () => {
        BackHandler.exitApp();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    setTimeout(() => {
        navigation.navigate('Login')
    }, 2000);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {appLogoWithTitle()}
            </View>
        </SafeAreaView>
    )

    function appLogoWithTitle() {
        return (
            <>
                <View style={styles.appLogoWrapStyle}>
                    <Image
                        source={require('../assets/images/marker.png')}
                        style={{ width: 42.0, height: 56.0, resizeMode: 'contain', tintColor: Colors.whiteColor }}
                    />
                </View>
                <Text style={{ lineHeight: 60.0, ...Fonts.primaryColor40Regular }}>
                    Catch Bus
                </Text>
            </>
        )
    }
}

const styles = StyleSheet.create({
    appLogoWrapStyle: {
        width: 100.0,
        height: 100.0,
        borderRadius: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor,
        elevation: 5.0,
        shadowColor: Colors.primaryColor,
    }
})

export default SplashScreen;