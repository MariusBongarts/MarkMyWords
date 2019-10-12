import { Mark } from './../models/mark';
import { ReduxAction } from './reducer';
import { store } from './store';

export function changeTest(newValue: string) {
  const reduxAction: ReduxAction = {
    type: 'CHANGE_TEST',
    newTest: newValue
  }
  store.dispatch(reduxAction);
}

export function initMarks(marks: Mark[]) {
  const reduxAction: ReduxAction = {
    type: 'INIT_MARKS',
    marks: marks
  }
  store.dispatch(reduxAction);
}

export function addMark(mark: Mark) {
  const reduxAction: ReduxAction = {
    type: 'ADD_MARK',
    mark: mark
  }
  store.dispatch(reduxAction);
}

export function removeMark(markId: string) {
  const reduxAction: ReduxAction = {
    type: 'REMOVE_MARK',
    markId: markId
  }
  store.dispatch(reduxAction);
}

export function updateMark(mark: Mark) {
  const reduxAction: ReduxAction = {
    type: 'UPDATE_MARK',
    mark: mark
  }
  store.dispatch(reduxAction);
}