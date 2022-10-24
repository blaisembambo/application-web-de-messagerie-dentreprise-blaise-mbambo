import '../styles/MessageReceived.css'

export default function MessageReceived({message}) {
    const content =message ? message.content : ''
    const date = ''
    const time = ''
    return(
        <div  className='received-message-container'>
            <div className='received-message-content' style={{textAlign:'left'}}>
                {content}
                {/* <div class="triangle"></div> */}
            </div>
            
        </div>
    )
}