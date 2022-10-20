import { useEffect } from "react";
import {useNavigate} from "react-router-dom"

export default function NavigateToChat() {

    const navigate = useNavigate();
    
    useEffect(() => {
        navigate('/app')
    },[])
    return(
        <div>
                
        </div>
    )
}