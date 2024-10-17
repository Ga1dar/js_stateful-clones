'use strict';

/**
 * @param {Object}  currentState
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let currentState = { ...state };

  for (const action of actions) {
    if (action.type === 'clear') {
      currentState = {};
      states.push({ ...currentState });
    }

    if (action.type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData };
      states.push({ ...currentState });
    }

    if (action.type === 'removeProperties') {
      currentState = { ...currentState };

      for (const key of action.keysToRemove) {
        if (key in currentState) {
          delete currentState[key];
        }
      }
      states.push({ ...currentState });
    }
  }

  return states;
}

module.exports = transformStateWithClones;
