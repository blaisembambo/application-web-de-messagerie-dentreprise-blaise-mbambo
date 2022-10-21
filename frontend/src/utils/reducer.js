export const initialState = {
    userLoggedIn:false,
    user:{},
    currentContact:{},
    messages:{}
  }

const reducer = (state,action) => {
    switch (action.type) {
        case 'setUserLoggedIn': {
                return {...state, ['userLoggedIn']:!state.userLoggedIn};
            }
        
        case 'setUser' : {
            return {...state,['user']:action.payload}
        }

        case 'setCurrentContact' : {
            return {...state,['currentContact']:action.payload}
        }

        case 'setMessages' : {
            return {...state,['messages']:action.payload}
        }
    
        default:
            return state;
            
    }

}

export default reducer;