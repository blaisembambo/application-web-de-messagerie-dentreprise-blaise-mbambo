import '../styles/MessageSent.css';
import { useEffect, useState } from 'react';
import { Transformation,Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from '@cloudinary/react';
import {scale} from '@cloudinary/transformation-builder-sdk/actions/resize';

//new CloudinaryImage("cld-sample.jpg").resize(scale().height(70));


export default function MessageSent({message}) {
    const content = message ? message.content : ''
    const date = ''
    const time = ''

    const [cld, setCld] = useState(
                new Cloudinary({
            cloud: {
            cloudName: process.env.REACT_APP_CLOUDINARY_CLOUDNAME
            }
        })
    );

    const [img, setImg] = useState({});

    useEffect(() => {
        if (content.type === "image") {
            setImg(cld.image(content.public_id).resize(scale().height(150)))
        }
    },[content.type])
    
    return(
        <div className='sent-message-container' style={{textAlign:'right'}}>
            <div className='sent-message-content' >
                {
                    content.type === "text" ? content.content
                        : 
                        <a className='image-linked' href={content.url} target="_blank">
                            <AdvancedImage cldImg={img} />
                        </a>
                }
                {/* <div class="triangle"></div> */}
            </div>
        </div>
    )
}