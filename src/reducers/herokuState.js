
let initialState = {
  loadStatus: "",
  loadFailed: "false",
  newLink: "",
  modal: false
}

const herokuReducer = (state = "", action) => {
  switch (action.type) {
    case 'loadStatus':
      return {
        ...state,
        loadStatus: "loaded"
      }
    case 'loadFailed':
        return {
          ...state,
          loadFailed: "true"
     }
     case 'newLink':
        var link = action.payload;
        return {
          ...state,
          newLink: link
     }
     case 'reset':
     return { 
       ...initialState
       };
      default:
        return state
  }
}

export default herokuReducer;