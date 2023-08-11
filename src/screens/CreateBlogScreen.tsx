import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState, useContext } from 'react';
import BlogContext from '../context/BlogContext';
import uuid from 'react-native-uuid';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

interface Props
    extends NativeStackScreenProps<RootStackParamList, 'CreateBlogScreen'> {
    // other props ...
}

type Blog = { title: string; content: string };
const CreateBlogScreen = ({ navigation }: Props) => {
    const { addBlogPost } = useContext(BlogContext);
    const [blog, setBlog] = useState<Blog>({} as Blog);

    const handleAddBlogPost = () => {
        const blogPost = { ...blog, id: uuid.v1().toString() };
        addBlogPost(blogPost, () => navigation.navigate('Home'));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.labelStyle}>Enter Title: </Text>
            <TextInput
                onChangeText={text =>
                    setBlog(prev => ({ ...prev, title: text }))
                }
                style={styles.inputStyle}
                placeholder="Title"
            />
            <Text style={styles.labelStyle}>Enter Content: </Text>
            <TextInput
                onChangeText={text =>
                    setBlog(prev => ({ ...prev, content: text }))
                }
                style={styles.inputStyle}
                placeholder="Content"
            />

            <Button title="Add Blog Post" onPress={handleAddBlogPost} />
        </View>
    );
};

export default CreateBlogScreen;

const styles = StyleSheet.create({
    container: { padding: 8 },
    inputStyle: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black',
        paddingHorizontal: 8,
        paddingVertical: 6,
        marginBottom: 15,
    },
    labelStyle: {
        fontSize: 20,
        marginBottom: 5,
    },
});
