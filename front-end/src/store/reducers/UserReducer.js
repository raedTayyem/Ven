let localLoggedinUser = null;
if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);


const initialState = {
  loggedInUser: localLoggedinUser,
  currUser: null,
}

export function UserReducer(state = initialState, action) {
  
  switch (action.type) {
    
    case 'SET_LOGGEDIN_USER':
      return { ...state, loggedInUser: action.user };
    case 'SET_USER':
      return { ...state, currUser: action.user };
    default:
      return state;
  }
}


