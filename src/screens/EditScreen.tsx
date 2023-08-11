import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BlogContext from '../context/BlogContext';

interface Props
    extends NativeStackScreenProps<RootStackParamList, 'EditScreen'> {}

type Blog = { id: string; title?: string; content?: string };

const EditScreen = ({ navigation, route }: Props) => {
    const { data, editBlogPost } = useContext(BlogContext);
    const { id } = route.params;
    const blogById = data?.find(blog => blog.id === id)!;
    const [blog, setBlog] = useState<Blog>(blogById);

    const handleAddBlogPost = () => {
        const newBlog = { id, title: blog.title, content: blog.content };
        editBlogPost(newBlog, () => navigation.navigate('Home'));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.labelStyle}>Enter Title: </Text>
            <TextInput
                value={blog?.title}
                onChangeText={text =>
                    setBlog(prev => ({ ...prev, title: text }))
                }
                style={styles.inputStyle}
                placeholder="Title"
            />
            <Text style={styles.labelStyle}>Enter Content: </Text>
            <TextInput
                value={blog?.content}
                onChangeText={text =>
                    setBlog(prev => ({ ...prev, content: text }))
                }
                style={styles.inputStyle}
                placeholder="Content"
            />

            <Button title="Save" onPress={handleAddBlogPost} />
        </View>
    );
};

export default EditScreen;

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
