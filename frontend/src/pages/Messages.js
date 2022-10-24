import {useStateValue} from '../utils/stateProvider'
import MessageSent from '../components/MessageSent'
import MessageReceived from '../components/MessageReceived'

export default function Messages() {

    const [state,dispatch] = useStateValue()

    return(
        // <div>{state ? state.messages.map(message => message.content) : ''    state.messages.map(message => message.content)}</div>
        <div>
            {
                state ?
                state.messages ? 
              (
                state.messages.map((message,index) => message.senderId === state.user._id ? 
                <MessageSent key={'message' + index} message={message} /> : <MessageReceived key={'message' + index} message={message} />)
              ) 
              : 
              (
                ''
              )
              :
              ''
             }

        </div>
    )
}