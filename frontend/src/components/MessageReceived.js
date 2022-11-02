import '../styles/MessageReceived.css';
import { useEffect, useState } from 'react';
import { Transformation,Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from '@cloudinary/react';
import {scale} from '@cloudinary/transformation-builder-sdk/actions/resize';



export default function MessageReceived({message}) {
    const content =message ? message.content : ''
    const date = ''
    const time = ''

    const [cld, setCld] = useState(
                new Cloudinary({
            cloud: {
            cloudName: 'bintole'
            }
        })
    );

    const [img, setImg] = useState({});

    useEffect(() => {
        if (content.type === "image") {
            setImg(cld.image(content.public_id).resize(scale().height(150)))
        }
    }, [content.type])
    
    return(
        <div  className='received-message-container'>
            <div className='received-message-content' style={{textAlign:'left'}}>
                 {
                    content.type === "text" ? content.content
                        : 
                        <div>
                            <AdvancedImage cldImg={img} />
                        </div>
                }
                {/* <div class="triangle"></div> */}
            </div>
            
        </div>
    )
}