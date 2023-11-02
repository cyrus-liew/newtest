import React from 'react'
import { FaFacebookSquare, FaTwitterSquare, FaRedditSquare, FaWhatsappSquare } from 'react-icons/fa'

const SocialShareButtons = ({url, title}) => {
  return( 
  <div className="w-full flex justify-between">
    <a target="_blank" rel="noreferrer" href="https://www.facebook.com/">
        <FaFacebookSquare className="text-[#3b5998] w-12 h-auto"/>
    </a>
    <a target="_blank" rel="noreferrer" href="https://twitter.com/?lang=en-sg">
        <FaTwitterSquare className="text-[#00acee] w-12 h-auto"/>
    </a>
    <a target="_blank" rel="noreferrer" href="https://www.reddit.com/?rdt=57178">
        <FaRedditSquare className="text-[#FF4500] w-12 h-auto"/>
    </a>
    <a target="_blank" rel="noreferrer" href="https://web.whatsapp.com/">
        <FaWhatsappSquare className="text-[#25D366] w-12 h-auto"/>
    </a>
  </div>
  );
}

export default SocialShareButtons