import React, { useContext, useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import BlogContext from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';
import uuid from 'react-native-uuid';

type HomeScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Home'
>;

// type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
    navigation: HomeScreenNavigationProp;
    // route: HomeScreenRouteProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const { data, deleteBlogPost, getBlogPosts } = useContext(BlogContext);

    useEffect(() => {
        console.log('use');
        getBlogPosts();
    }, []);
    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={blog => blog.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('ShowScreen', {
                                id: item.id,
                                title: item.title,
                            })
                        }>
                        <View style={styles.row}>
                            <Text style={styles.title}>{item.title}</Text>
                            <TouchableOpacity
                                onPress={() => deleteBlogPost(item.id)}>
                                <Feather
                                    name="trash"
                                    style={styles.icon}
                                    color="black"
                                />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
            />
            {/* <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
            /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        // borderBottomWidth: 1,
        borderColor: '#999',
        paddingHorizontal: 16,
        paddingVertical: 20,
    },
    title: {
        fontSize: 18,
    },
    icon: { fontSize: 24 },
});

export default HomeScreen;
