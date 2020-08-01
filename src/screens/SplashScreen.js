import React from 'react';
import { View, Image, StyleSheet, Dimensions, Text } from "react-native";
const { height, width } = Dimensions.get('window')
function SplashScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Text style={{ fontSize: 40, color: 'white', marginBottom: 15 }}>AyoShopping!</Text>
                <Image source={require('../assets/images/monitor.png')} style={{ height: 300, width: 0.8 * width }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#a29bfe'
    },
    logoContainer: {
        padding: 20,
        alignItems: 'center',
        justifyContent: "center",
    }
})

export default SplashScreen;