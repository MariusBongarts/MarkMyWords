import { Mark } from './../models/mark';

export interface State {
  marks: Mark[],
  lastAction?: ReduxAction
}

const INITIAL_STATE: State = {
  marks: []
};

export type ReduxActionType = 'ADD_MARK' | 'REMOVE_MARK' | 'CHANGE_TEST' | 'INIT_MARKS' | 'UPDATE_MARK';

export interface ReduxAction {
  type: ReduxActionType,
  marks?: Mark[],
  mark?: Mark,
  markId?: string,
}


export const reducer = (state = INITIAL_STATE, action: ReduxAction) => {
  switch (action.type) {
    case 'INIT_MARKS':
      return {
        ...state,
        marks: action.marks,
        lastAction: action.type
      };
    case 'ADD_MARK':
      return {
        ...state,
        marks: [...state.marks, action.mark],
        lastAction: action.type
      };
    case 'REMOVE_MARK':
      return {
        ...state,
        marks: state.marks.filter(e => e.id !== action.markId),
        lastAction: action.type
      };
    case 'UPDATE_MARK':
      return {
        ...state,
        marks: state.marks.map(mark => mark.id === action.mark.id ? action.mark : mark),
        lastAction: action.type
      };
    default:
      return state;
  }
};