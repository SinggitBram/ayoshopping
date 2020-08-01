import React from 'react';
import { View, Text, Image, StatusBar, StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider'; //import library atau module react-native-app-intro-slider
import Icon from 'react-native-vector-icons/Ionicons';

//data yang akan digunakan dalam onboarding
const slides = [
    {
        key: 1,
        title: 'Find Your Favorite Items',
        text: 'Search From Sellers Around The World',
        image: require('../assets/images/search.png')
    },
    {
        key: 2,
        title: 'Purchase Effortless',
        text: ' Our Services include Individual or Bulk Purchases',
        image: require('../assets/images/online-shop.png')
    },
    {
        key: 3,
        title: 'Secure Payment',
        text: 'Quick and Secure Payment With any Payment Method',
        image: require('../assets/images/secure-payment.png')
    },
    {
        key: 4,
        title: 'Free Delivery',
        text: 'We Deliver with Free Charge \n *Term & Condition Applied',
        image: require('../assets/images/free-shipping.png')
    }
];

const Intro = ({ navigation }) => {

    //menampilkan data slides kedalam renderItem
    const renderItem = ({ item }) => {
        return (
            <View style={styles.slide}>
                <Text style={styles.title}>{item.title}</Text>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.text}>{item.text}</Text>
            </View>
        );
    }

    //fungsi ketika onboarding ada di list terakhir atau screen terakhir / ketika button done di klik
    const onDone = () => {
        navigation.navigate('Login')
    }

    //mengcustom tampilan button done
    const renderDoneButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Icon
                    name="md-checkmark"
                    color="white"
                    size={24}
                />
            </View>
        );
    };

    //mengcustom tampilan next button
    const renderNextButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Icon
                    name="arrow-forward"
                    color="white"
                    size={24}
                />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <View style={{ flex: 1 }}>
                {/* merender atau menjalankan library react-native-app-intro-slider */}
                <AppIntroSlider
                    data={slides}
                    onDone={onDone}
                    renderItem={renderItem}
                    renderDoneButton={renderDoneButton}
                    renderNextButton={renderNextButton}
                    keyExtractor={(item, index) => index.toString()}
                    activeDotStyle={{ backgroundColor: '#191970' }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    slide: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#a29bfe'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#191970',
        marginBottom: 25
    },
    image: {
        height: 200,
        width: 200,
        marginBottom: 25
    },
    text: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        paddingHorizontal: 15,
        textAlign: 'center'
    },
    buttonCircle: {
        borderRadius: 300,
        backgroundColor: '#191970',
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default Intro