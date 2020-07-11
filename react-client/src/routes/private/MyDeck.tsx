import React, { useContext, useState, useEffect } from 'react';
import { CardDeck, Col, Row } from 'react-bootstrap';
import { HideOverlaysContext } from "../../contexts/HideOverlaysContext";
import { UserContext } from "../../contexts/UserContext";
import { getInitialProductList, IProductDetails } from '../../models/Product';
import SimpleFlipCard from '../../components/external/card/SimpleFlipCard';
import { BackgroundContainer, CenterWrapper } from '../../components/internal/CommonContainers';
import { CloseIcon, SandwichIcon, SideBarMenuContainer, SideBarMenuLeft, SideBarMenuRight, SideBarListContainer, SideBarListItem, BoxedItem, LogoBold, LogoTitle } from '../../components/internal/SideBarComponents';
import { SIDE_BAR_OPTIONS_API } from '../../constants';
import { getUserById } from '../../repositories/UserRepository';
import { findAllCardsByIds } from '../../repositories/CardRepository';
import { getSignedUserId } from '../../services/UserService';
import '../../special-styles/sidebar-left.css'

function MyDeck() {
    const { user } = useContext(UserContext);
    const { hideAllOverlays } = useContext(HideOverlaysContext);
    const [ nrOfProductsToShow ] = useState(20);
    const [ allProductsInYourDeck, setAllProducts ] = useState<IProductDetails[]>(getInitialProductList(nrOfProductsToShow));
    const [ products, setProducts ] = useState<IProductDetails[]>(getInitialProductList(nrOfProductsToShow));
    const [ isLeftSideBarVisible, setIsLeftSideBarVisible ] = useState<boolean>(true);

    const getDeckValue = () => {
        if (allProductsInYourDeck && allProductsInYourDeck.length) {
            return allProductsInYourDeck.reduce((accumulator: number, currentProduct: IProductDetails) => {
                const price: number = Number((currentProduct && currentProduct.card_prices && currentProduct.card_prices[0]) ? currentProduct.card_prices[0].amazon_price : 0);
                const newAccumulator: number = Number((accumulator + price).toFixed(2));

                return newAccumulator ? newAccumulator : accumulator;
            }, 0);
        } else {
            return 0;
        }
    }

    const getNrOfProductsByType = (type: string) => {
        if (!products) return 0;
        if (type === "All") return allProductsInYourDeck.length;
        return allProductsInYourDeck.filter((product: IProductDetails) => product.type?.includes(type)).length;
    }

    const filterProductsByType = (type: string, deny?: boolean) => {
        if (type === "All") {
            setProducts(allProductsInYourDeck);
        } else {
            const filteredProducts: IProductDetails[] = 
                deny ?
                    allProductsInYourDeck.filter(product => !product.type?.includes(type)) :
                    allProductsInYourDeck.filter(product => product.type?.includes(type));
            setProducts(filteredProducts); 
        }
    }

    const toggleSidebar = (show: boolean) => {
        setIsLeftSideBarVisible(show);
    }

    useEffect(() => {
        const USER_ID = getSignedUserId();

        if (USER_ID) {
            getUserById(USER_ID)
                .then(currentUser => {
                    const IDS = (currentUser && currentUser.deck) ? currentUser.deck : [];

                    if (IDS) {
                        findAllCardsByIds(IDS).then(userProducts => {
                            setProducts([]);
                            setProducts(userProducts);
                            setAllProducts([]);
                            setAllProducts(userProducts);
                        }).catch(error => {
                            console.log('Error(/api/cards/findAllByIds): ', error);
                        })
                    } else {
                        setProducts([]);
                    }
                })
        }
    }, []);

    return (
        <BackgroundContainer theme={{backgroundImage: "/images/my-deck-background.jpg"}} onClick={() => hideAllOverlays()}>
            <Row>
                <Col sm={3}>
                    <div>
                        <SandwichIcon className={"fa fa-bars"  + (isLeftSideBarVisible ? "" : " opacity_one")} onClick={() => toggleSidebar(true)}></SandwichIcon>
                        <SideBarMenuLeft className={(isLeftSideBarVisible ? "" : " hide_menu")}>
                            <CloseIcon className="fa fa-times" onClick={() => toggleSidebar(false)}></CloseIcon>
                            <CenterWrapper>
                                <BoxedItem>
                                    Check your 
                                    <LogoBold>
                                        Deck
                                    </LogoBold>
                                </BoxedItem>
                                <LogoTitle>
                                    Be a Professional Duel Master
                                </LogoTitle>
                            </CenterWrapper>

                            <SideBarListContainer>
                            {
                                SIDE_BAR_OPTIONS_API.map(item => {
                                    return (
                                        <SideBarListItem
                                            key={item.eventKey + Math.random()}
                                            onClick={() => filterProductsByType(item.type)}
                                        >
                                            {item.type} ({getNrOfProductsByType(item.type)})
                                        </SideBarListItem>
                                    )
                                })
                            }
                            </SideBarListContainer>
                        </SideBarMenuLeft>
                    </div>
                </Col>
                <Col sm={7}>
                    <CardDeck>
                    {
                        products.map((product: IProductDetails) => {
                            return (
                                <SimpleFlipCard 
                                    isFullDescriptionVisible={false}
                                    product={product}
                                    key={product.id + Math.random()}
                                />
                            );
                        })
                    }
                    </CardDeck>
                </Col>
                <Col sm={2}>
                    <SideBarMenuContainer>
                        <SideBarMenuRight>
                            <SideBarListContainer>
                                <SideBarListItem style={{fontSize: "22px"}}>
                                    Name:  <a href={"/profile"}> {user.username} </a>
                                </SideBarListItem>
                            </SideBarListContainer>
                            <SideBarListContainer>
                                <SideBarListItem>
                                    Your deck's value: {getDeckValue()} $
                                </SideBarListItem>
                            </SideBarListContainer>
                            <SideBarListContainer>
                                <SideBarListItem onClick={() => setProducts(allProductsInYourDeck)}>
                                    Cards: { allProductsInYourDeck.length }
                                </SideBarListItem>
                            </SideBarListContainer>
                            <SideBarListContainer>
                                <SideBarListItem onClick={() => filterProductsByType('Monster')}>
                                    Monster cards: { getNrOfProductsByType('Monster') }
                                </SideBarListItem>
                            </SideBarListContainer>
                            <SideBarListContainer>
                                <SideBarListItem onClick={() => filterProductsByType('Monster', true)}>
                                    Special cards: { allProductsInYourDeck.length - getNrOfProductsByType('Monster') }
                                </SideBarListItem>
                            </SideBarListContainer>
                            <CenterWrapper>
                                <BoxedItem>
                                    Name your 
                                    <LogoBold>
                                        Beast
                                    </LogoBold>
                                </BoxedItem>
                                <LogoTitle>
                                    Let's Be Professional. Never Give Up!
                                </LogoTitle>
                            </CenterWrapper>
                        </SideBarMenuRight>
                    </SideBarMenuContainer>
                </Col>
            </Row>
        </BackgroundContainer>
    );
    
}

export default MyDeck;