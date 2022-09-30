import { Text, StyleSheet, ScrollView, Dimensions, View, SafeAreaView, TextInput, StatusBar, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors, Fonts, Sizes, } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { Menu, MenuItem } from 'react-native-material-menu';

const { width, height } = Dimensions.get('window');

const busIssuesList = [
    'Tire puctured', 'Engine breakdown', 'Got an accident', 'Empty fuel', 'Other reason'
];

const BusIssuesScreen = ({ navigation }) => {

    const [fullName, setFullName] = useState('Cameron Williamson');
    const [email, setEmail] = useState('cameronwilliamson@gmail.com');
    const [busNumber, setBusNumber] = useState('2589');
    const [showBusIssue, setShowBusIssue] = useState(false);
    const [selectedBusIssue, setSelectedBusIssue] = useState(busIssuesList[1]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {fullNameInfo()}
                    {emailInfo()}
                    {busNumberInfo()}
                    {busIssueInfo()}
                    {submitButton()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function submitButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.pop()}
                style={styles.buttonStyle}
            >
                <Text style={{ ...Fonts.whiteColor20SemiBold }}>
                    Submit
                </Text>
            </TouchableOpacity>
        )
    }

    function busIssueInfo() {
        return (
            <View style={{ marginTop: Sizes.fixPadding + 5.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Regular }}>
                    Bus Issue
                </Text>
                <Menu
                    visible={showBusIssue}
                    style={{ paddingTop: Sizes.fixPadding, width: width - 40.0, maxHeight: height - 100.0, }}
                    anchor={
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => setShowBusIssue(true)}
                            style={styles.busIssuesInfoWrapStyle}
                        >
                            <Text style={{ ...Fonts.blackColor16Medium, }}>
                                {selectedBusIssue}
                            </Text>
                            <MaterialIcons
                                name="arrow-drop-down"
                                color={Colors.primaryColor}
                                size={24}
                            />
                        </TouchableOpacity>
                    }
                    onRequestClose={() => setShowBusIssue(false)}
                >
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {
                            busIssuesList.map((item, index) => (
                                <MenuItem
                                    key={index}
                                    textStyle={{ marginTop: Sizes.fixPadding - 20.0, ...Fonts.blackColor16Medium }}
                                    onPress={() => {
                                        setSelectedBusIssue(item)
                                        setShowBusIssue(false)
                                    }}
                                >
                                    {item}
                                </MenuItem>
                            ))
                        }
                    </ScrollView>
                </Menu>
            </View>
        )
    }

    function busNumberInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginBottom: Sizes.fixPadding - 5.0, ...Fonts.grayColor14Regular }}>
                    Bus Number
                </Text>
                <TextInput
                    value={busNumber}
                    onChangeText={(value) => setBusNumber(value)}
                    selectionColor={Colors.primaryColor}
                    style={styles.textFieldStyle}
                    keyboardType="number-pad"
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
                    Bus Issues
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
    busIssuesInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(111, 111, 111, 0.05)',
        borderRadius: Sizes.fixPadding - 5.0,
        padding: Sizes.fixPadding + 2.0,
    }
})

export default BusIssuesScreen;