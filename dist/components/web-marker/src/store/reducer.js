const INITIAL_STATE = {
    marks: []
};
export const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'INIT_MARKS':
            return Object.assign(Object.assign({}, state), { marks: action.marks, lastAction: action.type });
        case 'ADD_MARK':
            return Object.assign(Object.assign({}, state), { marks: [...state.marks, action.mark], lastAction: action.type });
        case 'REMOVE_MARK':
            return Object.assign(Object.assign({}, state), { marks: state.marks.filter(e => e.id !== action.markId), lastAction: action.type });
        case 'UPDATE_MARK':
            return Object.assign(Object.assign({}, state), { marks: state.marks.map(mark => mark.id === action.mark.id ? action.mark : mark), lastAction: action.type });
        default:
            return state;
    }
};
//# sourceMappingURL=reducer.js.map