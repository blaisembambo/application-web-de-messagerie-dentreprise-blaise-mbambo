export const initialState = {
    userLoggedIn:false,
    user:{}
  }

const reducer = (state,action) => {
    switch (action.type) {
        case 'setUserLoggedIn': {
                return {...state, ['userLoggedIn']:!state.userLoggedIn};
            }
        
        case 'setUser' : {
            return {...state,['user']:action.payload}
        }
    
        default:
            return state;
            
    }

}

export default reducer;