import { legacy_createStore } from "redux";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
};
const projectsInitState = {
    entities: {},
    ids: [],
};

const reduserProjects = (state = projectsInitState, action) => {
    switch (action.type) {
        case "addProject":
            const { projectName, projectDescription } = action.payload;
            const newState = {
                // ...state,
                entities: {
                    ...state?.entities,
                    [projectName]: {
                        name: projectName || "",
                        description: projectDescription || "",
                        tasks: [],
                    },
                },
                ids: [...state.ids, projectName],
            };
            // const newStateJSON = JSON.stringify(newState);
            // localStorage.setItem("projectsState", newStateJSON);
            return newState;

        default: {
            return state;
        }
    }
};

const reduserTascs = (state = {}, action) => {
    switch (action.type) {
        // case "addProjectTasks": {
        //     const { projectName } = action.payload;
        //     const newState = {
        //         ...state,
        //         [projectName]: {
        //             columns: {
        //                 Quie: { id: 1, tasks: [] },
        //                 Develop: { id: 2, tasks: [] },
        //                 Done: { id: 3, tasks: [] },
        //             },
        //             listOfColumns: ["Quie", "Develop", "Done"],
        //             tasks: {},
        //             listOfTasks: [],
        //         },
        //     };

        //     return newState;
        // }
        case "addTask": {
            const {
                projectName,
                taskName,
                taskTitle,
                taskDescription,
                startDate,
                priority,
                endDate,
                duration,
                subTask,
                files,
                comments,
            } = action.payload;
            const newState = {
                ...state,
                [projectName]: {
                    columns: {
                        Quie: {
                            id: 1,
                            tasks: [
                                ...(state[projectName]?.columns?.Quie?.tasks ||
                                    []),
                                taskName,
                            ],
                        },
                        Develop: { id: 2, tasks: [] },
                        Done: { id: 3, tasks: [] },
                    },
                    listOfColumns: ["Quie", "Develop", "Done"],
                    tasks: {
                        ...(state[projectName]?.tasks || {}),
                        [taskName]: {
                            id: taskName,
                            taskTitle,
                            columnName: "Quie",
                            taskDescription,
                            startDate,
                            priority,
                            endDate,
                            duration,
                            subTask,
                            files,
                            comments,
                        },
                    },
                    listOfTasks: [
                        ...(state[projectName]?.listOfTasks || []),
                        taskName,
                    ],
                },
            };

            return newState;
        }
        case "updateTasks": {
            const { projectName, newItems } = action.payload;
            return { ...state, [projectName]: newItems };
        }
        // case "addCommentToTask":{
        //     const { id, taskId } = action.payload;

        //     const newState = {
        //         ...state,
        //         [id]: { id, text, parent, taskId },
        //         commentsList: [...state.commentsList, id],
        //     };
        //     return newState;
        // }
        default: {
            return state;
        }
    }
};
const reduserComments = (state = {}, action) => {
    switch (action.type) {
        case "addComment":
            const { id, text, parent, taskId } = action.payload;

            const newState = {
                ...state,
                [id]: { id, text, parent, taskId },
                commentsList: [...(state.commentsList || []), id],
            };
            return newState;
        default: {
            return state;
        }
    }
};

const projectAndTasksRedusers = combineReducers({
    reduserProjects,
    reduserTascs,
    reduserComments,
});
const persistedReducer = persistReducer(persistConfig, projectAndTasksRedusers);
export const store = legacy_createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export let persistor = persistStore(store);
