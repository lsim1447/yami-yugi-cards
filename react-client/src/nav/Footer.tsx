import React, { useContext, useState, useEffect } from 'react';
import { 
    FooterDistributed,
    FooterLeft,
    FooterCenter,
    FooterRight,
    FooterLink,
    FooterCompanyName,
    FooterAboutCompany,
    FooterIcons
} from "./../components/internal/FooterComponents";

function Footer() {

  return (
    <FooterDistributed>
        <FooterLeft>
            <img src="milleniumIcon.png" />
            <h3>About the <span>Yami Yu-gi-oh Cards</span></h3>
            <FooterLink>
                <a href="/"> Home |</a>
                <a href="/all-cards"> All Cards |</a>
                <a href="/categories"> Categries |</a>
                <a href="/my-deck"> My Deck |</a>
                <a href="/checkout"> Checkout </a>
            </FooterLink>
            <FooterCompanyName>© 2020 Yami Yu-gi-oh Cards, Lázár Szilárd</FooterCompanyName>
        </FooterLeft>
        <FooterCenter>
            <div>
                <i className="fa fa-map-marker"></i>
                <p>
                    <span>NR. 746 - Lövéte, Harghita </span>
                    Romania 537 140
                </p>
            </div>
            <div>
                <i className="fa fa-phone"></i>
                <p> +40 755 418 425 </p>
            </div>
            <div>
                <i className="fa fa-envelope"></i>
                <p><a href="mailto:szilard.lazar@yahoo.com">szilard.lazar@yahoo.com</a></p>
            </div>
        </FooterCenter>
        <FooterRight>
            <FooterAboutCompany>
                <span> About the website </span>
                We are offering all kind of interesting cards to our customers. 
                Please attend our website and order the rarest / the most interesting / the most powerful cards on the World
            </FooterAboutCompany>
            <FooterIcons>
                <a href="https://www.facebook.com/szilard.lazar.359/"><i className="fa fa-facebook"></i></a>
                <a href="https://twitter.com/"><i className="fa fa-twitter"></i></a>
                <a href="https://www.instagram.com/szilardlazar/"><i className="fa fa-instagram"></i></a>
                <a href="https://www.linkedin.com/in/l%C3%A1z%C3%A1r-szil%C3%A1rd-b8140b148/"><i className="fa fa-linkedin"></i></a>
                <a href="https://www.youtube.com/"><i className="fa fa-youtube"></i></a>
            </FooterIcons>
        </FooterRight>
    </FooterDistributed>
  );
}

export default Footer;