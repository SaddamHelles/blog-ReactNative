import { createContext, PropsWithChildren, useReducer } from 'react';
import jsonServer from '../api/jsonServer';
interface ContextProps {
    data: BlogPosts[];
    addBlogPost: (blogPost: BlogPosts, callback: () => void) => void;
    deleteBlogPost: (id: string) => void;
    editBlogPost: (id: BlogPosts, callback: () => void) => void;
    getBlogPosts: () => void;
}

type BlogPosts = { id: string; title?: string; content?: string };

const initialState: State = {
    blogs: [{ id: '#1', title: 'TEST POST', content: 'TEST CONTENT' }],
};

type State = {
    blogs: BlogPosts[];
};

enum Actions {
    GetBlogPosts = 'GetBlogPosts',
    AddBlogPost = 'AddBlogPost',
    DeleteBlogPost = 'DeleteBlogPost',
    EditBlogPost = 'EditBlogPost',
}

// type Action = {
//     payload: any;
//     type: Actions;
// };

type Action =
    | { type: Actions.GetBlogPosts; payload: BlogPosts[] }
    | { type: Actions.AddBlogPost; payload: BlogPosts }
    | { type: Actions.DeleteBlogPost; payload: { id: string; title: string } }
    | { type: Actions.EditBlogPost; payload: BlogPosts };

const blogReducer = (state: State, action: Action): State => {
    const { type, payload } = action;
    switch (type) {
        case Actions.GetBlogPosts:
            console.log();
            console.log('payload: ', payload);
            return { ...state, blogs: payload };
        case Actions.AddBlogPost:
            return { ...state, blogs: [...state.blogs, payload] };
        case Actions.DeleteBlogPost:
            console.log(payload.id);
            const filteredBlogs = state.blogs.filter(
                blog => blog.id !== payload.id
            );
            return { ...state, blogs: filteredBlogs };
        case Actions.EditBlogPost:
            console.log(payload.id);
            const editBlog = state.blogs.map(blog =>
                blog.id !== payload.id ? blog : payload
            );
            return { ...state, blogs: editBlog };
        default:
            return state;
    }
};

const BlogContext = createContext<ContextProps>({} as ContextProps);

export const BlogProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const [state, dispatch] = useReducer(blogReducer, initialState);

    const getBlogPosts = () => {
        jsonServer
            .get('/blogposts')
            .then(response =>
                dispatch({ type: Actions.GetBlogPosts, payload: response.data })
            );
    };

    const addBlogPost = (blog: BlogPosts, callback: () => void) => {
        jsonServer.post('/blogposts', blog);
        // .then(response =>
        //     dispatch({ type: Actions.AddBlogPost, payload: response.data })
        // );
        callback();
    };

    const deleteBlogPost = (id: string) => {
        try {
            jsonServer.delete(`/blogposts/${id}`);

            // dispatch({
            //     type: Actions.DeleteBlogPost,
            //     payload: { id, title: '' },
            // });
        } catch (err) {
            console.log(err);
        }
    };
    const editBlogPost = (newBlog: BlogPosts, callback: () => void) => {
        try {
            jsonServer.put(`/blogposts/${newBlog.id}`, newBlog);

            // dispatch({
            //     type: Actions.EditBlogPost,
            //     payload: newBlog,
            // });
            callback();
        } catch (err) {
            console.log(err);
        }
    };
    const contextValues = {
        data: state.blogs,
        getBlogPosts,
        addBlogPost,
        deleteBlogPost,
        editBlogPost,
    };

    return (
        <BlogContext.Provider value={contextValues}>
            {children}
        </BlogContext.Provider>
    );
};

export default BlogContext;

// const addBlogPost = (dispatch: Dispatch<Action>) => {
//     return () =>
//         dispatch({ type: Actions.AddBlogPost, payload: { title: 'SDM' } });
// };

// export const { Context, Provider } = createDataContext(
//     blogReducer,
//     { addBlogPost },
//     initialState
// );
