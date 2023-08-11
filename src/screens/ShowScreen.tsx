import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import BlogContext from '../context/BlogContext';

interface Props
    extends NativeStackScreenProps<RootStackParamList, 'ShowScreen'> {
    // other props ...
}

const ShowScreen = ({ route }: Props) => {
    const { data } = useContext(BlogContext);
    const { id } = route.params;

    const blogPost = data.find(blog => blog.id === id);
    return (
        <View>
            <Text>{blogPost?.title}</Text>
        </View>
    );
};

export default ShowScreen;

const styles = StyleSheet.create({});
