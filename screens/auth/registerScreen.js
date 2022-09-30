import { Text, StyleSheet, Image, ScrollView, View, SafeAreaView, TextInput, StatusBar, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes, } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';

const RegisterScreen = ({ navigation }) => {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [agreeWithTerm, setAgreeWithTerm] = useState(true);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0, }}>
                    {fullNameInfo()}
                    {emailInfo()}
                    {mobileNumberInfo()}
                    {agreeWithTermInfo()}
                    {registerButton()}
                    {orText()}
                    {loginWithGoogleOption()}
                    {loginWithFacebookOption()}
                </ScrollView>
            </View>
            {alreadyAccountInfo()}
        </SafeAreaView>
    )

    function header() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.pop()}
                    style={styles.backIconWrapStyle}
                >
                    <MaterialIcons name="keyboard-arrow-left" size={24} color={Colors.blackColor} />
                </TouchableOpacity>
                <Text style={{ textAlign: 'center', flex: 1, ...Fonts.blackColor20Bold }}>
                    Register Account
                </Text>
            </View>
        )
    }

    function alreadyAccountInfo() {
        return (
            <View style={{ backgroundColor: Colors.whiteColor, padding: Sizes.fixPadding + 5.0 }}>
                <Text style={{ textAlign: 'center' }}>
                    <Text style={{ ...Fonts.grayColor16Regular }}>
                        Already have an account?  { }
                    </Text>
                    <Text
                        onPress={() => navigation.push('Login')}
                        style={{ ...Fonts.primaryColor16Medium }}
                    >
                        Login now
                    </Text>
                </Text>
            </View>
        )
    }

    function loginWithFacebookOption() {
        return (
            <View style={styles.loginWithFacebookWrapStyle}>
                <Image
                    source={require('../../assets/images/icons/facebook.png')}
                    style={{ width: 24.0, height: 24.0, resizeMode: 'contain' }}
                />
                <Text style={{ marginLeft: Sizes.fixPadding + 5.0, ...Fonts.whiteColor16Medium }}>
                    Login with Facebook
                </Text>
            </View>
        )
    }

    function loginWithGoogleOption() {
        return (
            <View style={styles.loginWithGoogleWrapStyle}>
                <Image
                    source={require('../../assets/images/icons/google.png')}
                    style={{ width: 24.0, height: 24.0, resizeMode: 'contain' }}
                />
                <Text style={{ marginLeft: Sizes.fixPadding + 5.0, ...Fonts.blackColor16Medium }}>
                    Login with Google
                </Text>
            </View>
        )
    }

    function orText() {
        return (
            <Text style={{ textAlign: 'center', ...Fonts.grayColor15Medium }}>
                OR
            </Text>
        )
    }

    function registerButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => { navigation.push('Verification') }}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor20SemiBold }}>
                    Register
                </Text>
            </TouchableOpacity>
        )
    }

    function agreeWithTermInfo() {
        return (
            <View style={styles.agreeWithTermInfoWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setAgreeWithTerm(!agreeWithTerm)}
                    style={{
                        ...styles.checkBoxStyle,
                        backgroundColor: agreeWithTerm ? Colors.primaryColor : Colors.whiteColor,
                        borderColor: agreeWithTerm ? Colors.primaryColor : Colors.grayColor,
                    }}
                >
                    {
                        agreeWithTerm
                            ?
                            <MaterialIcons name="check" size={15} color={Colors.whiteColor} />
                            :
                            null
                    }
                </TouchableOpacity>
                <Text style={{ flex: 1, marginLeft: Sizes.fixPadding }}>
                    <Text style={{ ...Fonts.grayColor14Regular }}>
                        By creating an account, you agree to our { }
                    </Text>
                    <Text style={{ ...Fonts.primaryColor14Medium }}>
                        Terms and Condition
                    </Text>
                </Text>
            </View>
        )
    }

    function mobileNumberInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.blackColor15Medium }}>
                    Mobile Number
                </Text>
                <TextInput
                    value={mobileNumber}
                    onChangeText={(value) => setMobileNumber(value)}
                    selectionColor={Colors.primaryColor}
                    style={styles.textFieldStyle}
                    placeholder='Your mobile number'
                    keyboardType='phone-pad'
                />
            </View>
        )
    }

    function emailInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.blackColor15Medium }}>
                    Email
                </Text>
                <TextInput
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                    selectionColor={Colors.primaryColor}
                    style={styles.textFieldStyle}
                    keyboardType="email-address"
                    placeholder='Your email address'
                />
            </View>
        )
    }

    function fullNameInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.blackColor15Medium }}>
                    Full Name
                </Text>
                <TextInput
                    value={fullName}
                    onChangeText={(value) => setFullName(value)}
                    selectionColor={Colors.primaryColor}
                    style={styles.textFieldStyle}
                    placeholder='Your full name'
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backIconWrapStyle: {
        width: 36.0,
        height: 36.0,
        borderRadius: 18.0,
        backgroundColor: 'rgba(111, 111, 111, 0.05)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textFieldStyle: {
        backgroundColor: 'rgba(111, 111, 111, 0.05)',
        borderRadius: Sizes.fixPadding - 5.0,
        ...Fonts.blackColor15Regular,
        padding: Sizes.fixPadding + 2.0,
    },
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 3.0,
        margin: Sizes.fixPadding * 2.0,
        elevation: 1.5,
        shadowColor: Colors.primaryColor
    },
    forgetPasswordTextStyle: {
        marginVertical: Sizes.fixPadding - 8.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignSelf: 'flex-end',
        ...Fonts.primaryColor13Medium
    },
    loginWithGoogleWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 3.0,
        borderColor: Colors.lightGrayColor,
        borderWidth: 1.0,
        backgroundColor: Colors.whiteColor,
        margin: Sizes.fixPadding * 2.0,
    },
    loginWithFacebookWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 3.0,
        backgroundColor: Colors.blueColor,
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    checkBoxStyle: {
        width: 17.0,
        height: 17.0,
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2.0,
    },
    agreeWithTermInfoWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding - 5.0,
        flexDirection: 'row',
        alignItems: 'center',
    }
})

export default RegisterScreen;