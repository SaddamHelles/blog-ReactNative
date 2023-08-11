import { Dispatch, createContext, PropsWithChildren, useReducer } from 'react';

interface ContextProps {
    data: BlogPosts[];
    addBlogPost: (blogPost: BlogPosts, callback: () => void) => void;
    deleteBlogPost: (id: string) => void;
    editBlogPost: (id: BlogPosts, callback: () => void) => void;
}

type BlogPosts = { id: string; title?: string; content?: string };

const initialState: State = {
    blogs: [{ id: '#1', title: 'TEST POST', content: 'TEST CONTENT' }],
};

type State = {
    blogs: BlogPosts[];
};

enum Actions {
    AddBlogPost = 'AddBlogPost',
    DeleteBlogPost = 'DeleteBlogPost',
    EditBlogPost = 'EditBlogPost',
}

type Action = {
    payload: BlogPosts;
    type: Actions;
};

const blogReducer = (state: State, action: Action): State => {
    const { type, payload } = action;
    switch (type) {
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

    const addBlogPost = (blog: BlogPosts, callback: () => void) => {
        dispatch({ type: Actions.AddBlogPost, payload: blog });
        callback();
    };

    const deleteBlogPost = (id: string) => {
        dispatch({
            type: Actions.DeleteBlogPost,
            payload: { id, title: '' },
        });
    };
    const editBlogPost = (newBlog: BlogPosts, callback: () => void) => {
        dispatch({
            type: Actions.EditBlogPost,
            payload: newBlog,
        });
        callback();
    };
    const contextValues = {
        data: state.blogs,
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
