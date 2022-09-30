import React, { useRef, useState, useCallback } from 'react';
import { BackHandler, StatusBar, Dimensions, Easing, Animated, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Dialog } from '@rneui/themed';
import { Key } from "../../constants/key";
import MapViewDirections from 'react-native-maps-directions';
import BottomSheet from 'react-native-simple-bottom-sheet';
import { useFocusEffect } from '@react-navigation/native';

const busRoutesList = [
    {
        id: '1',
        coordinate: {
            latitude: 22.650329,
            longitude: 88.361861,
        },
        time: '10:20 am',
        route: '9 Bailey Drive, Fredericton, NB E3B 5A3',
        markerColor: '#E57373',
    },
    {
        id: '2',
        coordinate: {
            latitude: 22.624979,
            longitude: 88.380070,
        },
        time: '10:40 am',
        route: '40 Pictou Island Road, Pictou Island',
        markerColor: '#FFB74D',
    },
    {
        id: '3',
        coordinate: {
            latitude: 22.658567,
            longitude: 88.441909,
        },
        time: '11:00 am',
        route: '1 Refinery Road, Come By',
        markerColor: '#F06292',
    },
    {
        id: '4',
        coordinate: {
            latitude: 22.688345,
            longitude: 88.418891,
        },
        time: '11:20 am',
        route: '38 Whiteshell Avenue, Winnipeg',
        markerColor: '#64B5F6',
    },
    {
        id: '5',
        coordinate: {
            latitude: 22.678525,
            longitude: 88.460777,
        },
        time: '11:40 am',
        route: '225 Belleville St, Victoria, BC',
        markerColor: '#4DB6AC',
    },
];

const { width, height } = Dimensions.get('screen');

const HomeScreen = ({ navigation }) => {

    const backAction = () => {
        backClickCount == 1 ? BackHandler.exitApp() : _spring();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    function _spring() {
        setBackClickCount(1);
        setTimeout(() => {
            setBackClickCount(0)
        }, 1000)
    }

    const [backClickCount, setBackClickCount] = useState(0);
    const [showMenu, setShowMenu] = useState(false);
    const [logoutDialog, setLogoutDialog] = useState(false);

    const offsetValue = useRef(new Animated.Value(0)).current;

    const scaleValue = useRef(new Animated.Value(1)).current;
    const closeButtonOffset = useRef(new Animated.Value(0)).current;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            {profileInfoWthOptions()}
            {drawerShadow()}
            {busRoutes()}
            {logoutInfo()}
            {
                backClickCount == 1
                    ?
                    <View style={[styles.animatedView]}>
                        <Text style={{ ...Fonts.whiteColor14Regular }}>
                            Press Back Once Again to Exit
                        </Text>
                    </View>
                    :
                    null
            }
        </SafeAreaView>
    );

    function logoutInfo() {
        return (
            <Dialog
                visible={logoutDialog}
                onRequestClose={() => { setLogoutDialog(false) }}
                overlayStyle={styles.dialogStyle}
            >
                <Text style={{ margin: Sizes.fixPadding * 2.5, textAlign: 'center', ...Fonts.blackColor18SemiBold }}>
                    Are you sure you want logout?
                </Text>
                <View style={{ backgroundColor: 'rgba(111,111,111,0.3)', height: 1.0, }} />
                <View style={{ flexDirection: 'row', }}>
                    <Text
                        onPress={() => setLogoutDialog(false)}
                        style={styles.cancelAndLogoutTextStyle}
                    >
                        Cancel
                    </Text>
                    <View style={{ marginBottom: Sizes.fixPadding - 15.0, backgroundColor: 'rgba(111,111,111,0.3)', width: 1.0, height: 50.0 }} />
                    <Text
                        onPress={() => {
                            setLogoutDialog(false)
                            navigation.push('Login')
                        }}
                        style={styles.cancelAndLogoutTextStyle}
                    >
                        Yes, Logout
                    </Text>
                </View>
            </Dialog>
        )
    }

    function busRoutes() {
        return (
            <Animated.View style={{
                ...styles.overlayViewStyle,
                borderRadius: showMenu ? Sizes.fixPadding + 5.0 : 0,
                transform: [
                    { scale: scaleValue },
                    { translateX: offsetValue },
                ]
            }}>
                <Animated.View style={{
                    transform: [{
                        translateY: closeButtonOffset
                    }]
                }}>
                    {header()}
                </Animated.View>
                <View style={{ flex: 1, marginTop: !showMenu ? Sizes.fixPadding + 5.0 : Sizes.fixPadding - 25.0, }}>
                    {busRouteMapView()}
                </View>
                {busRouteInfo()}
            </Animated.View>
        )
    }

    function busRouteMapView() {
        const currentBusLocation = {
            latitude: 22.667695,
            longitude: 88.369422,
        }

        return (
            <View style={{ flex: 1, borderBottomLeftRadius: showMenu ? Sizes.fixPadding + 5.0 : 0.0, overflow: 'hidden', }}>
                <MapView
                    region={{
                        latitude: 22.589799,
                        longitude: 88.394494,
                        latitudeDelta: 0.17,
                        longitudeDelta: 0.17,
                    }}
                    style={{ height: '100%', }}
                    provider={PROVIDER_GOOGLE}
                    mapType="terrain"
                >
                    {
                        busRoutesList.map((item) => (
                            <Marker key={`${item.id}`} coordinate={item.coordinate}>
                                <View style={{
                                    ...styles.routeMarkerStyle,
                                    backgroundColor: item.markerColor,
                                }}>
                                    <Image
                                        source={require('../../assets/images/icons/location.png')}
                                        resizeMode="contain"
                                        style={{ width: 15.0, height: 15.0, tintColor: Colors.whiteColor }}
                                    />
                                </View>
                            </Marker>
                        ))
                    }
                    {
                        busRoutesList.map((item, index) => (
                            busRoutesList.length - 1 !== index ?
                                <MapViewDirections
                                    key={`${item.id}`}
                                    origin={item.coordinate}
                                    destination={busRoutesList[index + 1].coordinate}
                                    apikey={Key.apiKey}
                                    strokeColor={Colors.primaryColor}
                                    strokeWidth={3}
                                />
                                :
                                null
                        ))
                    }
                    <Marker coordinate={currentBusLocation}>
                        <Image
                            source={require('../../assets/images/icons/bus.png')}
                            resizeMode="contain"
                            style={{ marginBottom: Sizes.fixPadding - 25.0, width: 50.0, height: 50.0, resizeMode: 'contain' }}
                        />
                    </Marker>
                </MapView>
            </View>
        )
    }

    function drawerShadow() {
        return (
            showMenu
                ?
                <Animated.View style={{
                    ...styles.overlayShadowStyle,
                    borderRadius: showMenu ? Sizes.fixPadding + 5.0 : 0,
                    transform: [
                        { scale: scaleValue },
                        { translateX: offsetValue },

                    ]
                }
                }>
                </Animated.View >
                :
                null
        )
    }

    function profileInfoWthOptions() {
        return (
            <View style={{ paddingVertical: Sizes.fixPadding * 2.0, }}>
                {profileInfo()}
                <View style={{ maxWidth: width / 1.6, marginTop: Sizes.fixPadding * 3.0, flex: 1, }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                Animated.timing(scaleValue, {
                                    toValue: showMenu ? 1 : 0.85,
                                    duration: 300,
                                    useNativeDriver: true,
                                }).start()

                                Animated.timing(offsetValue, {
                                    toValue: showMenu ? 0 : 230,
                                    duration: 300,
                                    useNativeDriver: true,
                                    easing: Easing.linear,
                                }).start()

                                Animated.timing(closeButtonOffset, {
                                    toValue: !showMenu ? -30 : 0,
                                    duration: 300,
                                    useNativeDriver: true
                                }).start()

                                setShowMenu(!showMenu);
                            }}
                        >
                            {profileOptionSort({ option: 'Bus Route', icon: require('../../assets/images/icons/busRoute.png') })}
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => { navigation.push('Wallet') }}
                        >
                            {profileOptionSort({ option: 'Wallet', icon: require('../../assets/images/icons/wallet.png') })}
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => { navigation.push('BusIssues') }}
                        >
                            {profileOptionSort({ option: 'Bus Issues', icon: require('../../assets/images/icons/busIssue.png') })}
                        </TouchableOpacity>

                        {profileOptionSort({ option: 'Contact Us', icon: require('../../assets/images/icons/contact.png') })}

                        {profileOptionSort({ option: 'Terms & Conditions', icon: require('../../assets/images/icons/termsAndCondition.png') })}

                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => setLogoutDialog(true)}
                        >
                            {profileOptionSort({ option: 'Logout', icon: require('../../assets/images/icons/logout.png') })}
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        )
    }

    function profileOptionSort({ option, icon, }) {
        return (
            <View style={styles.profileOptionWrapStyle}>
                <View style={styles.profileOptionIconWrapStyle}>
                    <Image
                        source={icon}
                        style={{ width: 20.0, height: 20.0, resizeMode: 'contain' }}
                    />
                </View>
                <Text style={{ marginRight: Sizes.fixPadding * 2.0, flex: 1, marginLeft: Sizes.fixPadding, ...Fonts.whiteColor16Medium }}>
                    {option}
                </Text>
            </View>
        )
    }

    function profileInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center', }}>
                <View style={styles.profileImageWrapStyle}>
                    <Image
                        source={require('../../assets/images/users/user1.png')}
                        style={{ width: 60.0, height: 60.0, borderRadius: 30.0, }}
                    />
                </View>
                <View style={{ marginHorizontal: Sizes.fixPadding }}>
                    <Text numberOfLines={1} style={{ maxWidth: width - 95.0, lineHeight: 18.0, ...Fonts.whiteColor18SemiBold }}>
                        Cameron Williamson
                    </Text>
                    <Text
                        onPress={() => navigation.push('EditProfile')}
                        style={{ ...Fonts.whiteColor16Regular }}
                    >
                        View Profile
                    </Text>
                </View>
            </View >
        )
    }

    function header() {
        return (
            <View
                style={{
                    marginTop: showMenu ? Sizes.fixPadding * 3.0 : 0.0,
                    ...styles.headerWrapStyle,
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        Animated.timing(scaleValue, {
                            toValue: showMenu ? 1 : 0.85,
                            duration: 300,
                            useNativeDriver: true,
                        }).start()

                        Animated.timing(offsetValue, {
                            toValue: showMenu ? 0 : 230,
                            duration: 300,
                            useNativeDriver: true,
                        }).start()

                        Animated.timing(closeButtonOffset, {
                            toValue: !showMenu ? -30 : 0,
                            duration: 300,
                            useNativeDriver: true
                        }).start()

                        setShowMenu(!showMenu);
                    }}
                    style={styles.menuButtonWrapStyle}
                >
                    <MaterialIcons name="menu" size={22} color={Colors.blackColor} />
                </TouchableOpacity>
                <Text style={{ flex: 1, textAlign: 'center', ...Fonts.blackColor20Bold }}>
                    Bus Route
                </Text>
            </View>
        )
    }

    function busRouteInfo() {
        return (
            <BottomSheet
                isOpen={false}
                sliderMinHeight={busRoutesList.length * 120 > height / 2.2 ? height / 2.2 : busRoutesList.length * 120}
                sliderMaxHeight={showMenu ? busRoutesList.length * 120 > height / 2.2 ? height / 2.2 : busRoutesList.length * 120 : height - 100}
                lineContainerStyle={{ width: 0.0, height: 0.0, }}
                lineStyle={{ width: 0.0, height: 0.0, }}
                wrapperStyle={{
                    ...styles.bottomSheetWrapStyle,
                    borderBottomLeftRadius: showMenu ? Sizes.fixPadding + 5.0 : 0.0,
                }}
            >
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor20SemiBold }}>
                    Bus Route
                </Text>
                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    {
                        busRoutesList.map((item) => (
                            <View
                                key={`${item.id}`}
                                style={styles.busRouteInfoWrapStyle}
                            >
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ width: 60.0, ...Fonts.blackColor14Regular }}>
                                        {item.time}
                                    </Text>
                                    <View style={{ marginHorizontal: Sizes.fixPadding + 5.0, alignItems: 'center', justifyContent: 'center' }}>
                                        <View style={styles.roadStyle}>
                                            <View style={{ backgroundColor: Colors.whiteColor, width: 1.5, height: Sizes.fixPadding * 4.3, }} />
                                        </View>
                                        <View style={{
                                            backgroundColor: item.markerColor,
                                            ...styles.routeMarkerStyle,
                                            position: 'absolute',
                                        }}>
                                            <Image
                                                source={require('../../assets/images/icons/location.png')}
                                                style={{ tintColor: Colors.whiteColor, width: 18.0, height: 18.0, resizeMode: 'contain' }}
                                            />
                                        </View>
                                    </View>
                                    <Text numberOfLines={2} style={{ marginRight: Sizes.fixPadding - 7.0, flex: 1, ...item.isArrive ? { ...Fonts.grayColor14Regular } : { ...Fonts.blackColor14Regular } }}>
                                        {item.route}
                                    </Text>
                                </View>
                            </View>
                        ))
                    }
                </ScrollView>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => { navigation.push('StartTrip') }}
                    style={styles.buttonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor20SemiBold }}>
                        Start
                    </Text>
                </TouchableOpacity>
            </BottomSheet>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primaryColor,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    menuButtonWrapStyle: {
        width: 36.0,
        height: 36.0,
        borderRadius: 18.0,
        backgroundColor: 'rgba(111, 111, 111, 0.05)',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute', zIndex: 1,
    },
    roadStyle: {
        width: 13.0,
        alignItems: 'center',
        backgroundColor: 'rgba(71, 72, 76, 0.74)',
        height: Sizes.fixPadding * 4.8,
        justifyContent: 'center'
    },
    busRouteInfoWrapStyle: {
        height: Sizes.fixPadding * 4.8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    routeMarkerStyle: {
        width: 25.0,
        height: 25.0,
        borderRadius: 12.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding + 3.0,
        marginVertical: Sizes.fixPadding * 2.0,
        elevation: 1.5,
        shadowColor: Colors.primaryColor
    },
    bottomSheetWrapStyle: {
        paddingBottom: Sizes.fixPadding - 5.0,
        paddingTop: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        borderTopLeftRadius: 0.0,
        borderTopRightRadius: 0.0,
    },
    markerStyle: {
        width: 27.0,
        height: 27.0,
        tintColor: Colors.primaryColor,
    },
    overlayViewStyle: {
        flexGrow: 1,
        backgroundColor: Colors.whiteColor,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0.0,
        right: 0,
        paddingTop: Sizes.fixPadding + 5.0,
    },
    overlayShadowStyle: {
        flexGrow: 1,
        backgroundColor: 'rgba(255,255,255,0.5)',
        position: 'absolute',
        top: 20,
        bottom: 20,
        left: -20.0,
        right: 0,
        paddingTop: Sizes.fixPadding + 5.0,
    },
    dialogStyle: {
        paddingVertical: 0.0,
        paddingHorizontal: 0.0,
        backgroundColor: Colors.whiteColor,
        width: width - 40,
        borderRadius: Sizes.fixPadding - 5.0
    },
    cancelAndLogoutTextStyle: {
        textAlign: 'center',
        alignSelf: 'center',
        flex: 1,
        ...Fonts.primaryColor17SemiBold
    },
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 40,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
    profileOptionWrapStyle: {
        marginBottom: Sizes.fixPadding * 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileOptionIconWrapStyle: {
        width: 42.0,
        height: 42.0,
        borderRadius: 21.0,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImageWrapStyle: {
        width: 70.0,
        height: 70.0,
        borderRadius: 35.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    headerWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default HomeScreen;
