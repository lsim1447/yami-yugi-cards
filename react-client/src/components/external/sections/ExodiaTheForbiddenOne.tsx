import React from 'react';
import styled from 'styled-components';

const ExodiaWrapper = styled.div `
    padding-top: 18px;
    padding-bottom: 36px;
    text-align: center;
`;

const Description = styled.div `
    padding: auto 24px 24px 24px;
`;

const ExodiaImage = styled.img `
    height: 100%;
    max-height: 850px;
    width: 100%;
`;

const Title = styled.h1 `
    font-size: 48px;
    font-weight: 800;
`;

const ExodiaTheForbiddenOne = () => {
    return (
        <ExodiaWrapper>
            <Title> Exodia the Forbidden One </Title>
            <Description>
                "Exodia" (エクゾディア, Ekuzodia) is an archetype of DARK Spellcaster monsters, with its first member released in Legend of Blue 
                Eyes White Dragon and its first support released in Millennium Box Gold Edition. They are focused on alternative victory conditions,
                and has support related to summoning or strengthening Beatsticks resembling Exodia. It is related to the "Forbidden One" archetype.
                <p>
                    In the second anime series, the "Forbidden One" cards were notable for never successfully played until Yugi Muto was able to assemble 
                    all five pieces during his duel against Seto Kaiba during episode 1. "Exodia" appeared in that duel when Yugi gathered all five pieces
                    in his hand, after which it launched an attack, that was prompted by the line "Exodia, Obliterate" 
                    ("Hellfire's Rage, Exodo Flame!" in the original) from Yugi. The attack wiped out all three of Kaiba's "Blue-Eyes White Dragons" and Yugi won the Duel.
                </p>
            </Description>

            <ExodiaImage
                className="lazyload"
                data-src="/images/exodia-background.jpg"
            />
        </ExodiaWrapper>
    );
}

export default ExodiaTheForbiddenOne;