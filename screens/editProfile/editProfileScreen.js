import { Text, StyleSheet, View, Image, ScrollView, SafeAreaView, StatusBar, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes, } from '../../constants/styles';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomSheet } from "@rneui/themed";

const EditProfileScreen = ({ navigation }) => {

    const [fullName, setFullName] = useState('Cameron Williamson');
    const [email, setEmail] = useState('cameronwilliamson@gmail.com');
    const [mobileNumber, setMobileNumber] = useState('(444) 147-8965');
    const [showProfileOptionsSheet, setShowProfileOptionsSheet] = useState(false);
    const [from, setFrom] = useState('');

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {profilePic()}
                    {fullNameInfo()}
                    {emailInfo()}
                    {mobileNumberInfo()}
                    {licenceInfo()}
                    {saveButton()}
                </ScrollView>
                {profilePicOptionSheet()}
            </View>
        </SafeAreaView>
    )

    function profilePicOptionSheet() {
        return (
            <BottomSheet
                isVisible={showProfileOptionsSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                onBackdropPress={() => { setShowProfileOptionsSheet(false) }}
            >
                <View style={{ paddingVertical: Sizes.fixPadding + 5.0, backgroundColor: Colors.whiteColor }}>
                    <Text
                        onPress={() => setShowProfileOptionsSheet(false)}
                        style={{ textAlign: 'center', ...Fonts.blackColor20Bold }}
                    >
                        {from == 'profile' ? 'Change Profile Photo' : 'Change License Photo'}
                    </Text>
                    {divider()}
                    <Text style={{ textAlign: 'center', ...Fonts.redColor16Regular }}>
                        Remove Current Photo
                    </Text>
                    {divider()}
                    <Text style={{ textAlign: 'center', ...Fonts.blackColor16Regular }}>
                        Take Photo
                    </Text>
                    {divider()}
                    <Text style={{ textAlign: 'center', ...Fonts.blackColor16Regular }}>
                        Choose From Library
                    </Text>
                </View>
            </BottomSheet>
        )
    }

    function divider() {
        return (
            <View style={{ backgroundColor: 'rgba(111, 111, 111, 0.2)', height: 1.0, marginVertical: Sizes.fixPadding + 5.0, }} />
        )
    }

    function saveButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => { navigation.pop() }}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor20SemiBold }}>
                    Save
                </Text>
            </TouchableOpacity>
        )
    }

    function licenceInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Regular }}>
                    License
                </Text>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        setFrom('license')
                        setShowProfileOptionsSheet(true)
                    }}
                    style={styles.licenceInfoWrapStyle}
                >
                    <Text style={{ ...Fonts.blackColor16Medium, flex: 1, }}>
                        license.jpg
                    </Text>
                    <MaterialCommunityIcons name="shield-check" size={20} color='#087F23' />
                </TouchableOpacity>
            </View >
        )
    }

    function mobileNumberInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Regular }}>
                    Mobile Number
                </Text>
                <TextInput
                    value={mobileNumber}
                    onChangeText={(value) => setMobileNumber(value)}
                    selectionColor={Colors.primaryColor}
                    style={styles.textFieldStyle}
                    keyboardType="phone-pad"
                />
            </View>
        )
    }

    function emailInfo() {
        return (
            <View style={{ marginVertical: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Regular }}>
                    Email
                </Text>
                <TextInput
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                    selectionColor={Colors.primaryColor}
                    style={styles.textFieldStyle}
                    keyboardType="email-address"
                />
            </View>
        )
    }

    function fullNameInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Regular }}>
                    Full Name
                </Text>
                <TextInput
                    value={fullName}
                    onChangeText={(value) => setFullName(value)}
                    selectionColor={Colors.primaryColor}
                    style={styles.textFieldStyle}
                />
            </View>
        )
    }

    function profilePic() {
        return (
            <View style={{ marginBottom: Sizes.fixPadding * 2.0, alignSelf: 'center', alignItems: 'center', }}>
                <Image
                    source={require('../../assets/images/users/user1.png')}
                    style={{ width: 100.0, height: 100.0, borderRadius: 50.0, }}
                />
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        setFrom('profile')
                        setShowProfileOptionsSheet(true)
                    }}
                    style={styles.cameraIconWrapStyle}
                >
                    <MaterialIcons name="camera-alt" size={15} color={Colors.whiteColor} />
                </TouchableOpacity>
            </View >
        )
    }

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
                    Edit Profile
                </Text>
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
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 1,
    },
    cameraIconWrapStyle: {
        position: 'absolute',
        bottom: 0.0,
        right: 5.0,
        backgroundColor: Colors.primaryColor,
        width: 32.0, height: 32.0,
        borderRadius: 16.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.whiteColor,
        borderWidth: 2.5,
    },
    textFieldStyle: {
        backgroundColor: 'rgba(111, 111, 111, 0.05)',
        borderRadius: Sizes.fixPadding - 5.0,
        ...Fonts.blackColor16Medium,
        padding: Sizes.fixPadding + 2.0,
    },
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding * 3.0,
        elevation: 1.5,
        shadowColor: Colors.primaryColor
    },
    bottomSheetWrapStyle: {
        paddingBottom: Sizes.fixPadding - 5.0,
        paddingTop: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        borderTopLeftRadius: 0.0,
        borderTopRightRadius: 0.0
    },
    licenceInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(111, 111, 111, 0.05)',
        borderRadius: Sizes.fixPadding - 5.0,
        padding: Sizes.fixPadding + 2.0,
    }
})

export default EditProfileScreen;