import React from 'react';
import {FaInstagram,FaYoutube,FaTiktok, FaFacebook, FaTwitter} from 'react-icons/fa';


export default function SocialIcons (name,sized) {
    if (name === "instagram") {
        return <FaInstagram size={sized} />;
    } else if (name === "youtube") {
        return <FaYoutube size={sized} />;
    } else if (name === "tiktok"){
        return <FaTiktok size={sized} />
    } else if (name === "facebook"){
        return <FaFacebook size={sized} />
    } else if (name === "twitter"){
        return <FaTwitter size={sized} />
    }
}