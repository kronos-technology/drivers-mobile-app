import { Text, StyleSheet, ScrollView, View, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors, Fonts, Sizes, } from '../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';

const transactionsList = [
    {
        id: '1',
        transactionDate: 'October 30, 2017',
        transactionAmount: '$120.00',
        added: true,
    },
    {
        id: '2',
        transactionDate: 'September 24, 2017',
        transactionAmount: '$4.00',
        added: false,
    },
    {
        id: '3',
        transactionDate: 'April 28, 2016',
        transactionAmount: '$250.00',
        added: true,
    },
    {
        id: '4',
        transactionDate: 'October 25, 2019',
        transactionAmount: '$150.00',
        added: true,
    },
    {
        id: '5',
        transactionDate: 'March 13, 2014',
        transactionAmount: '$120.00',
        added: true,
    },
    {
        id: '6',
        transactionDate: 'May 31, 2015',
        transactionAmount: '$3.00',
        added: false,
    },
    {
        id: '7',
        transactionDate: 'November 28, 2015',
        transactionAmount: '$320.00',
        added: true,
    },
    {
        id: '8',
        transactionDate: 'April 28, 2016',
        transactionAmount: '$$4.50',
        added: false,
    },
    {
        id: '9',
        transactionDate: 'March 13, 2014',
        transactionAmount: '$120.00',
        added: true,
    },
];

const WalletScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {balanceInfo()}
                {sendAndAddMoneyButton()}
                {recentTransactionsInfo()}
            </View>
        </SafeAreaView>
    )

    function recentTransactionsInfo() {
        return (
            <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text style={{ marginBottom: Sizes.fixPadding, ...Fonts.blackColor20SemiBold }}>
                    Recent Transaction
                </Text>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 2.0, }}
                >
                    {
                        transactionsList.map((item, index) => (
                            <View key={`${item.id}`}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ marginRight: Sizes.fixPadding - 5.0, ...Fonts.blackColor17Medium }}>
                                            {item.added ? 'Money Added' : 'Send to Friend'}
                                        </Text>
                                        <Text style={{ ...Fonts.grayColor15Regular }}>
                                            {item.transactionDate}
                                        </Text>
                                    </View>
                                    <Text style={item.added ? { ...Fonts.greenColor17Medium } : { ...Fonts.redColor17Medium }}>
                                        {item.transactionAmount}
                                    </Text>
                                </View>
                                {
                                    index == transactionsList.length - 1
                                        ?
                                        null
                                        :
                                        <View style={{ marginVertical: Sizes.fixPadding * 2.0, backgroundColor: 'rgba(111, 111, 111, 0.20)', height: 1.0, }} />
                                }
                            </View>
                        ))
                    }
                </ScrollView>
            </View>
        )
    }

    function sendAndAddMoneyButton() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                    ...styles.sendAndAddMoneyButtonStyle,
                    marginRight: Sizes.fixPadding,
                    backgroundColor: Colors.whiteColor,
                }}>
                    <Text style={{ textAlign: 'center', ...Fonts.primaryColor18SemiBold }}>
                        Send to Bank
                    </Text>
                </View>
                <View style={{
                    marginLeft: Sizes.fixPadding,
                    backgroundColor: Colors.primaryColor,
                    ...styles.sendAndAddMoneyButtonStyle,
                }}>
                    <Text style={{ textAlign: 'center', ...Fonts.whiteColor18SemiBold }}>
                        Add Money
                    </Text>
                </View>
            </View>
        )
    }

    function balanceInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.grayColor16Regular }}>
                    Available Balance
                </Text>
                <Text style={{ lineHeight: 26.0, ...Fonts.blackColor22SemiBold }}>
                    $321.50
                </Text>
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
                    Wallet
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
    sendAndAddMoneyButtonStyle: {
        flex: 1,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center', justifyContent: 'center',
    }
})

export default WalletScreen;