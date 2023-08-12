// In App.js in a new project

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { BlogProvider } from './src/context/BlogContext';
import EditScreen from './src/screens/EditScreen';
import HomeScreen from './src/screens/HomeScreen';
import ShowScreen from './src/screens/ShowScreen';
import CreateBlogScreen from './src/screens/CreateBlogScreen';
export type RootStackParamList = {
    Home: undefined;
    ShowScreen: { id: string; title?: string };
    CreateBlogScreen: undefined;
    EditScreen: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
function App() {
    return (
        <BlogProvider>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        title: 'Blog',
                        statusBarColor: '#f8bdff',
                        navigationBarColor: '#f8bdff',
                        headerTintColor: '#550370',
                        statusBarStyle: 'dark',
                        contentStyle: { backgroundColor: 'white' },
                    }}>
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={({ navigation }) => ({
                            headerRight: () => (
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate('CreateBlogScreen')
                                    }>
                                    <Ionicons
                                        name="add-circle-outline"
                                        size={30}
                                        color="black"
                                    />
                                </TouchableOpacity>
                            ),
                        })}
                    />
                    <Stack.Screen
                        name="ShowScreen"
                        component={ShowScreen}
                        options={({ navigation, route }) => ({
                            headerRight: () => (
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate(
                                            'EditScreen',
                                            route.params
                                        )
                                    }>
                                    <FontAwesome
                                        name="edit"
                                        size={30}
                                        color="black"
                                    />
                                </TouchableOpacity>
                            ),
                            headerTitle: route.params.title?.toUpperCase(),
                        })}
                    />
                    <Stack.Screen
                        name="CreateBlogScreen"
                        component={CreateBlogScreen}
                    />
                    <Stack.Screen name="EditScreen" component={EditScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </BlogProvider>
    );
}

export default App;
