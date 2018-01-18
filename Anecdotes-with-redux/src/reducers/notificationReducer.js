const reducer = (store = null, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.notification
    default:
      return store
  }
}

const notificationSetting = (notification) => {
  return {
    type: 'SET_MESSAGE',
    notification
  }
}

export const notificationDeletion = () => {
  return {
    type: 'SET_MESSAGE',
    notification: null
  }
}

export const notify = (notification, timeout) => {
  return async (dispatch) => {
    await dispatch(
      notificationSetting(notification)
    )
    await setTimeout(() => {
      dispatch(notificationDeletion())
    }, 1000 * timeout);
  }
}

export default reducer