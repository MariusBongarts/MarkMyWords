import { store } from './store';
export function initMarks(marks) {
    const reduxAction = {
        type: 'INIT_MARKS',
        marks: marks
    };
    store.dispatch(reduxAction);
}
export function addMark(mark) {
    const reduxAction = {
        type: 'ADD_MARK',
        mark: mark
    };
    store.dispatch(reduxAction);
}
export function removeMark(markId) {
    const reduxAction = {
        type: 'REMOVE_MARK',
        markId: markId
    };
    store.dispatch(reduxAction);
}
export function updateMark(mark) {
    const reduxAction = {
        type: 'UPDATE_MARK',
        mark: mark
    };
    store.dispatch(reduxAction);
}
//# sourceMappingURL=actions.js.map