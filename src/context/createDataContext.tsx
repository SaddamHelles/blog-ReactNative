import React, {
    PropsWithChildren,
    createContext,
    useReducer,
    ReactNode,
} from 'react';

type Action = { type: string; payload?: any };

type Reducer<StateType, ActionType> = (
    state: StateType,
    action: ActionType
) => StateType;

type ActionsType<ActionMap> = {
    [key: string]: (dispatch: React.Dispatch<Action>, payload?: any) => void;
};

type ContextValueType<StateType, ActionsMap> = {
    state: StateType;
    actions: ActionsMap;
};

const createDataContext = <StateType, ActionType, ActionsMap>(
    reducer: Reducer<StateType, ActionType>,
    actions: any,
    initialState: StateType
) => {
    const Context = createContext<any>({});

    const Provider: React.FC<PropsWithChildren> = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, initialState);

        const boundActions: any = {};
        for (const key in actions) {
            boundActions[key] = actions[key](dispatch);
        }
        return (
            <Context.Provider value={{ state, ...boundActions }}>
                {children}
            </Context.Provider>
        );
    };

    return { Context, Provider };
};

export default createDataContext;
