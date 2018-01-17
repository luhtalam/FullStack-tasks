const reducer = (store = null, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.notification
    default:
      return store
  }
}

export const notificationSetting = (notification) => {
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

export default reducer