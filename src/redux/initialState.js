import {DEFAULT_STYLES, DEFAULT_TITLE} from '../consts';

const defaultState = {
  title: DEFAULT_TITLE,
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: DEFAULT_STYLES,
};

export const normalizeInitialState = (state) => {
  return state || defaultState;
};
