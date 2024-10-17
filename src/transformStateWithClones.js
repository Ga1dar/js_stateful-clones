'use strict';

/**
 * @param {Object}  currentState
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const states = [];
  let currentState = { ...state };

  for (const action of actions) {
    if (action.type === 'clear') {
      // eslint-disable-next-line no-param-reassign
      currentState = {};
      states.push({ ...currentState });
    }

    if (action.type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData };
      states.push({ ...currentState });
    }

    if (action.type === 'removeProperties') {
      for (const key of actions.keysToRemove) {
        if (currentState[key] === actions.keysToRemove[key]) {
          delete currentState[key];
          states.push({ ...currentState });
        }
      }
    }
  }

  return states;
}

module.exports = transformStateWithClones;
