import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import { GoogleSignin, statusCodes } from '@react-native-community/google-signin'

const { height, width } = Dimensions.get('window')

export default function Biodata({ navigation }) {

    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        getCurrentUser()
    }, [])

    const getCurrentUser = async () => {
        const userInfo = await GoogleSignin.signInSilently()
        setUserInfo(userInfo)
    }

    const onLogoutPress = async () => {
        try {
            await GoogleSignin.revokeAccess()
            await GoogleSignin.signOut()
            navigation.navigate('Login')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.partAtas}>
                <Image source={userInfo === null ? require('../assets/images/Singgit_Bramantha.jpg') : { uri: userInfo.user.photo }} style={{ width: 80, height: 80, borderRadius: 300, marginBottom: 15 }} />
            </View>
            <View style={styles.partBawah}>
                <View style={styles.boxData}>
                    <View>
                        <Text style={{ borderBottomWidth: 1, borderBottomColor: '#a29bfe', width: 300, textAlign: 'center', color: 'white' }}>Data Diri:</Text>
                    </View>
                    <View style={styles.baris}>
                        <Text style={styles.tulisan}>Nama:</Text>
                        <Text style={styles.tulisan}>{userInfo === null ? 'Singgit Bramantha' : userInfo.user.name}</Text>
                    </View>
                    <View style={styles.baris}>
                        <Text style={styles.tulisan}>Tanggal Lahir:</Text>
                        <Text style={styles.tulisan}>27 December 1987</Text>
                    </View>
                    <View style={styles.baris}>
                        <Text style={styles.tulisan}>No. Telp:</Text>
                        <Text style={styles.tulisan}>08123456789</Text>
                    </View>
                    <View style={styles.baris}>
                        <Text style={styles.tulisan}>Email:</Text>
                        <Text style={styles.tulisan}>{userInfo === null ? 'Singgit Bramantha' : userInfo.user.email}</Text>
                    </View>
                </View>
                <View style={styles.boxSaldo}>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ borderBottomWidth: 1, borderBottomColor: '#a29bfe', width: 300, textAlign: 'center', color: 'white' }}>Saldo Anda:</Text>
                    </View>
                    <View style={styles.baris2}>
                        <Image source={require('../assets/images/logo-gopay.jpg')} style={{ width: 50, height: 50, borderRadius: 300, marginBottom: 15 }} />
                        <Text style={styles.tulisan}>Rp.300.000</Text>
                    </View>
                    <View style={styles.baris2}>
                        <Image source={require('../assets/images/logo-ovo.jpg')} style={{ width: 50, height: 50, borderRadius: 300, marginBottom: 15 }} />
                        <Text style={styles.tulisan}>Rp.700.000</Text>
                    </View>
                    <View style={styles.baris2}>
                        <Image source={require('../assets/images/logo-shopee.jpg')} style={{ width: 50, height: 50, borderRadius: 300, marginBottom: 15 }} />
                        <Text style={styles.tulisan}>Rp.200.000</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => onLogoutPress()} style={styles.buttonKeluar}>
                            <Text style={{ backgroundColor: "#a29bfe", color: "white", height: 30, paddingHorizontal: 25, paddingVertical: 5, borderRadius: 5, width: width * 0.85, textAlign: 'center' }}>LOGOUT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
    },
    partAtas: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#a29bfe",
        height: height * 0.2
    },
    partsBawah: {
        backgroundColor: "white",
    },
    boxData: {
        backgroundColor: "#30336b",
        display: "flex",
        elevation: 5,
        width: width * 0.9,
        borderRadius: 10,
        alignSelf: "center",
        paddingHorizontal: 15,
        marginTop: -25,
        flexDirection: "column",
        justifyContent: "space-between",
        paddingVertical: 10
    },
    tulisan: {
        fontSize: 13,
        marginVertical: 7,
        color: "white"
    },
    baris: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    baris2: {
        flexDirection: 'row',
        justifyContent: "space-around"
    },
    buttonKeluar: {
        marginTop: 10,
        alignItems: 'center',
        marginBottom: 10
    },
    boxSaldo: {
        backgroundColor: "#30336b",
        display: "flex",
        elevation: 5,
        width: width * 0.9,
        borderRadius: 10,
        alignSelf: "center",
        paddingHorizontal: 15,
        flexDirection: "column",
        justifyContent: "space-between",
        paddingVertical: 10,
        marginTop: 20
    }
});
