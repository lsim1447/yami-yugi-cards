import React, { useContext, useState, useEffect } from 'react';
import { Alert, Breadcrumb, Button, Card, CardDeck, Col, Container, Jumbotron, Row } from 'react-bootstrap';
import styled from 'styled-components';

const ReadMoreWrapper = styled.div `
    
`;

const CustomCol = styled(Col) `
    border-left: 1px solid #D3D3D3;
    border-right: 1px solid #D3D3D3;
    min-height: 100vh;
`;

const LeftCol = styled(CustomCol) `
    background: url(/images/checkout-left.jpg) top center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    @media (max-width: 992px) {
        display: none;
    }
`;

const CenterCol = styled(CustomCol) `
    @media (max-width: 992px) {
        max-width: 100%;
        flex: 0 0 100%;
    }
`;

const RightCol = styled(CustomCol) `
    background: url(/images/read-more-right.jpg) top center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    @media (max-width: 992px) {
        display: none;
    }
`;

function ReadMore() {
    return (
        <Row>
            <LeftCol sm={2}/>
            <CenterCol>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active> Read More </Breadcrumb.Item>
                </Breadcrumb>
                <Jumbotron>
                    <h1>Getting Started</h1>
                    <p>
                        Other than your decks (refer to the Decks section below), you're going to need a few extra items to assist in gameplay. These items include:
                    </p>
                    <ul>
                        <li>A coin - some cards require a coin flip</li>
                        <li>Dice - some cards require a die roll</li>
                        <li>Counters - any small object that can be used as a marker to keep track of certain metrics that may affect some cards</li>
                        <li>Monster Tokens - (refer to Other Rules section below)</li>
                    </ul>
                </Jumbotron>
                <Jumbotron>
                    <h1>Decks</h1>
                    <p>
                        Each player must have three different types of YuGiOh decks to be eligible for gameplay:
                    </p>
                    <ul>
                        <li>Main Deck</li>
                        <li>Extra Deck</li>
                        <li>Side Deck</li>
                    </ul>
                    It is required that your Main Deck contains between 40 and 60 cards.
                    <Alert style={{marginTop: "12px", marginBottom: "12px"}} variant="warning">
                        Pro tip - keep your deck count close to the 40 card minimum so you draw your best cards at a higher frequency
                    </Alert>
                    <p>
                        Be aware that you can't just load your deck with multiple copies of the same card; you are limited to a maximum of three copies of the same card in your main deck.
                    </p>
                    <p>
                        The Extra Deck holds your Synchro and Fusion Monsters (refer to Monster Cards section below), which can be used during the game if certain requirements are met. This deck can hold anywhere from 0 to 15 cards and is not considered toward the count of your Main Deck.
                    </p>
                    <p>
                        The Side Deck is another separate set of 0 to 15 cards (not counting towards your Main Deck) that allows you to customize and adapt your deck to your specific opponent and/or the situation of the battle. Players are given the opportunity to swap any card from the Side to Main Deck after each duel in the battle, as long as both deck counts remain the same after the swap.
                    </p>
                </Jumbotron>
                <Jumbotron>
                    <h1>Game Zones</h1>
                    <p>
                        Before playing YuGiOh, it is necessary to know where cards can and can't be placed in the battlefield. There are six different game zones in the field:
                    </p>
                    <ul>
                        <li>Monster Card Zone</li>
                        <li>Spell & Trap Zone</li>
                        <li>Graveyard</li>
                        <li>Deck Zone</li>
                        <li>Field Card Zone</li>
                        <li>Extra Deck Zone</li>
                    </ul>
                    <p>
                        Up to five Monsters can be placed in the Monster Card Zone. These cards are positioned in the zone depending on what you want the card to do (more on this in the Monster Battle Rules section below).
                    </p>
                    <p>
                        Up to five Spell and/or Trap Cards can be placed in the Spell & Trap Zone. These cards can be activated by positioning them face-up in the zone, or they can just be laid face-down for use later.
                    </p>
                    <p>
                        Each player has a Graveyard where destroyed Monster Cards and used Spell & Trap Cards are sent. Graveyard cards are public knowledge, meaning that the cards are face-up and players can look through them at any time. The cards in the Graveyard should be in organized in the order in which they are sent there, and this order should not be changed.
                    </p>
                    <p>
                        Each player also has a Deck Zone where their Main Deck is located (face-down). Players draw cards for their hand from their deck in this zone.
                    </p>
                    <p>
                        The Field Card Zone is where special Spell Cards (Field Spell Cards) can be played. Only one can be played at a time by both players and any previously active Spell will be destroyed automatically upon the activation of a new Spell.
                    </p>
                    <p>
                        The Extra Deck Zone is where players put their Extra Deck (face-down). This deck is only viewable by the player that owns it.
                    </p>
                </Jumbotron>
                <Jumbotron>
                    <h1>YuGiOh Cards</h1>
                    <h3>Monster Cards</h3>
                    <p>
                        Here are the different types of Monster Cards (we'll get to how you summon them later):
                    </p>
                    <ul>
                        <li>Normal Monsters</li>
                        <li>Effect Monsters</li>
                        <li>Synchro Monsters</li>
                        <li>Tuner Monsters</li>
                        <li>Fusion Monsters</li>
                        <li>Ritual Monsters</li>
                    </ul>
                    <p>
                        Normal Monsters have no special effects but typically have higher ATK (strength) and DEF (defense) points than Effect Monsters.
                    </p>
                    Effect Monsters are monsters with special abilities. There are five different types:
                    <ul>
                        <li>Flip Effect - activated when a face-down card is flipped face-up</li>
                        <li>Continuous Effect - effect is active while monster is face-up in the battlefield and ends when monster is no longer active/face-up</li>
                        <li>Ignition Effect - used by declaring activation during your Main Phase (more on this later), some have costs</li>
                        <li>Trigger Effect - activated during a specified time</li>
                        <li>Quick Effect - can be activated whenever, even during an opponent's turn</li>
                    </ul>
                    <p>
                        As part of the Extra Deck, Synchro Monsters are powerful cards that can be summoned either by a Special Summon or a Synchro Summon.
                    </p>
                    <p>
                        Tuner Monsters are cards that allow you to Synchro Summon a Synchro Monster. These monsters are considered Synchro Material Monsters because they are material cards required to Synchro Summon.
                    </p>
                    <p>
                        The other monster cards found in your Extra Deck are Fusion Monsters. To summon these cards, you must perform a Fusion Summon.
                    </p>
                    <p>
                        Out of the main deck, Ritual Monsters are monster cards that also require a Special Summon called a Ritual Summon. You must have all the required cards together in your hand or in the battlefield.
                    </p>
                    <h3>Spell & Trap Cards</h3>
                    <p>
                        The main difference between Spell Cards and Trap Cards is that Spells are mainly used to boost offense while Traps are mainly used to disrupt opponent attacks. Also, Traps must be set in the field and can't be activated within the same turn, whereas most Spells can be activated on the same turn during which you play them. There are several different types of Spell and Trap cards:
                    </p>
                    Spell Cards:
                    <ul>
                        <li>Normal Spells</li>
                        <li>Ritual Spells</li>
                        <li>Continuous Spells</li>
                        <li>Equip Spells</li>
                        <li>Field Spells</li>
                        <li>Quick-Play Spells</li>
                    </ul>
                    Trap Cards:
                    <ul>
                        <li>Normal Traps</li>
                        <li>Continuous Traps</li>
                        <li>Counter Traps</li>
                    </ul>
                    <p>
                        The effects of Normal Spells can only be used once, and once it is used it is sent to the graveyard. These cards are activated by making your opponent aware of its use and placing it face-up in the battlefield. The specific effect of the spell is described on the card.
                    </p>
                </Jumbotron>
                <Jumbotron>
                    <p>
                        The <strong>Ritual Spell Card</strong> is one of the cards necessary to perform a Ritual Summon. After it is used, it is sent to the Graveyard.
                    </p>
                </Jumbotron>
                <Jumbotron>
                    <p>
                        <strong>Continuous Spells </strong>  are cards that stay in the battlefield and have a lasting, continuous effect on the game. This effect can either be positive for the user or negative for the user's opponent. Watch out though, there are cards the opponent can use to destroy these Continuous Spells.
                    </p>
                </Jumbotron>
                <Jumbotron>
                    <p>
                        <strong>Equip Spell Cards</strong> are attached to a monster in the field and improve that monster's abilities. These spells are continuous in the field, but they can only be attached to one monster. When this monster is destroyed, flipped face-down, or removed from the field, the Equip Spell is also destroyed.
                    </p>
                </Jumbotron>
                <Jumbotron>
                    <p>
                        <strong>Field Spell Cards</strong> are special spells that are activated in the Field Card Zone, which is a special area in the battlefield where only Field Spells can be played. Only one Field Spell can be active from both players and if somebody chooses to activate a new Field Spell, the previous one is destroyed.
                    </p>
                </Jumbotron>
                <Jumbotron>
                    <p>
                        <strong>Quick-Play Spells </strong> are special spells that can be played during any phase of your turn as well as your opponents turn.
                    </p>
                </Jumbotron>
                <Jumbotron>
                    <p>
                    To activate a <strong>Normal Trap Card</strong>, it must first be set in the field. Normal Traps, like Normal Spells, are single-use and after the effect takes action the card is then sent to the Graveyard.
                    </p>
                </Jumbotron>
                <Jumbotron>
                    <h1>Summoning Monsters</h1>
                    <p>
                        In order to use your monster cards, you need to summon them. Some summon actions are simple, but others take multiple steps and cards to complete. The different types of summons are as follows:
                    </p>
                    <ul>
                        <li>Normal Summon</li>
                        <li>Tribute Summon</li>
                        <li>Flip Summon</li>
                        <li>
                            Special Summon
                            <ul>
                                <li>Synchro Summon</li>
                                <li>Fusion Summon</li>
                                <li>Ritual Summon</li>
                            </ul>
                        </li>
                    </ul>
                    <p>
                        Normal Monsters and most Effect Monsters can be summoned simply by playing the card face-up into the battlefield. This is called a Normal Summon.
                    </p>
                    <p>
                        To summon monsters level 5 or higher, you must perform a Tribute Summon. A tribute is the action of sending one of the user's monsters to the Graveyard (like a sacrifice). If the monster you wish to summon is level 5 or 6, you must tribute one other monster. If the monster is level 7 or higher, it is required that you tribute two monsters!
                    </p>
                    <p>
                        When you set a monster in the battlefield (face-down in the defense position) it is not considered summoning. To actually summon these monsters, you must perform a Flip Summon. Set cards can only be Flip Summoned to the face-up attack position (not face-up defense) and you must wait until the next turn to do so if you just set the card.
                    </p>
                    <p>
                        Any monster that can't be Normal Summoned or set up for a Flip Summon has to be played to the field using a Special Summon. This includes Synchro, Fusion and Ritual Summons. When you perform a Special Summon, there is no restriction on the initial position of the monster in the battlefield. You may decide whether you want to face the monster up or down, and in the attack or defense position. Here are the step-by-step processes for each of the Special Summons:
                    </p>
                </Jumbotron>
                <Jumbotron>
                    <p>
                        Any monster that can't be Normal Summoned or set up for a Flip Summon has to be played to the field using a Special Summon. This includes Synchro, Fusion and Ritual Summons. When you perform a Special Summon, there is no restriction on the initial position of the monster in the battlefield. You may decide whether you want to face the monster up or down, and in the attack or defense position. Here are the step-by-step processes for each of the Special Summons:
                    </p>
                    <p>
                        Once the combined level of your controlled Tuner Monster and Normal Monster(s) is equal to the level of the Synchro Monster you wish to summon, you may declare a Synchro Summon. After declaring the summons, send the Synchro Material Monsters to the Graveyard and play your Synchro Monster from your Extra Deck.
                    </p>
                    <p>
                        Once all of the Fusion Material Monsters listed on the card of the Fusion Monster you wish to Fusion Summon are in your control, you must activate the Polymerization card, send the Fusion Material Monsters and Polymerization to the Graveyard, then play the Fusion Monster from your Extra Deck in the face-up (either attack or defense) position.
                    </p>
                    <p>
                        If you have the Ritual Monster and corresponding Ritual Spell and Tribute Card (shown on the Spell Card), activate the Spell Card and declare the Ritual Summon. Next, Tribute the necessary monsters and play the Ritual Monster from your hand in the face-up position.
                    </p>
                    <Alert style={{marginTop: "12px", marginBottom: "12px"}} variant="warning">
                        Some cards have effects with the ability to Special Summon, but you cannot use this effect to summon Special Summon Monsters because they must be summoned properly using the respective process above.
                    </Alert>
                </Jumbotron>
                <Jumbotron>
                    <Alert style={{marginTop: "12px", marginBottom: "12px", fontSize: "48px"}} variant="warning">
                        Want to play???
                    </Alert>
                </Jumbotron>
            </CenterCol>
            <RightCol sm={2}/>
        </Row>
    );
}

export default ReadMore;