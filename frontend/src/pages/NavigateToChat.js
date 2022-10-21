import { useEffect } from "react";
import {useNavigate} from "react-router-dom"
import {useStateValue} from '../utils/stateProvider'

export default function NavigateToChat() {

    const navigate = useNavigate();
    const [state,dispatch] = useStateValue()
    
    useEffect(() => {
        navigate('/app/'+state.user ? state.user._id:'1')
    },[])
    return(
        <div>
                
        </div>
    )
}