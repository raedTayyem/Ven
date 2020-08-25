import { UserService } from '../../services/UserService';


export function loadUser(userId) {
  
  return async dispatch => {
    try {
      const user = await UserService.getById(userId);
      dispatch({ type: 'SET_USER', user })
    } catch (err) {
      console.log('cannot get user', err)
    }
  }
}

export function login(userCreds) {

  return async dispatch => {
    
      const user = await UserService.login(userCreds);
      dispatch(setLoggedInUser(user));
  
  }

}
export function signup(userCreds) {
  return async dispatch => {
    
    const user = await UserService.signup(userCreds);
    dispatch(setLoggedInUser(user));
    
  };
}

export function logout() {
  return async dispatch => {
    await UserService.logout();
    dispatch(setLoggedInUser(null));
  };
}

export function updateUser(user) {
  return async dispatch => {
    await UserService.updateUser(user);
    dispatch(setLoggedInUser(user));
  };
}

export function setLoggedInUser(user) {
  return {
    type: 'SET_LOGGEDIN_USER',
    user
  };
}

