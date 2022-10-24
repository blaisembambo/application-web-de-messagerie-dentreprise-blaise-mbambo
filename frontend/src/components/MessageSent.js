import '../styles/MessageSent.css'

export default function MessageSent({message}) {
    const content =message ? message.content : ''
    const date = ''
    const time = ''
    return(
        <div className='sent-message-container' style={{textAlign:'right'}}>
            <div className='sent-message-content' >
                {content}
                {/* <div class="triangle"></div> */}
            </div>
        </div>
    )
}