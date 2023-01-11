
const ActionType = {
  SET_ACTIVE_TAG: 'SET_ACTIVE_TAG',
  UNSET_ACTIVE_TAG: 'UNSET_ACTIVE_TAG'
}

function setActiveTagActionCreator (activeTag) {
  return {
    type: ActionType.SET_ACTIVE_TAG,
    payload: {
      activeTag
    }
  }
}

function unsetActiveTagActionCreator () {
  return {
    type: ActionType.UNSET_ACTIVE_TAG
  }
}

export {
  ActionType,
  setActiveTagActionCreator,
  unsetActiveTagActionCreator
}
