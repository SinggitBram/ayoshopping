import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import Intro from '../screens/Intro';
import Login from '../screens/Login';
import Biodata from '../screens/Biodata'
import Register from '../screens/Register'
import TestApi from '../screens/TestApi'

const Stack = createStackNavigator();

const MainNavigation = () => (
    <Stack.Navigator>
        <Stack.Screen name="Intro" component={Intro} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Biodata" component={Biodata} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="TestApi" component={TestApi} options={{ headerShown: false }} />
    </Stack.Navigator>
)

function AppNavigation() {
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        setTimeout(() => {
            setIsLoading(!isLoading)
        }, 2000)
    }, [])

    if (isLoading) {
        return <SplashScreen />
    }

    return (
        <NavigationContainer>
            <MainNavigation />
        </NavigationContainer>
    )
}

export default AppNavigation;