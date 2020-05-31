import React, { useContext, useState, useEffect } from 'react';
import CustomFlipPagination from '../components/external/CustomFlipPagination';

function AllCards() {

    return (
        <CustomFlipPagination
            backgroundColor={"white"}
            cardsPerPage={24}
            pageBound={5}
        />
    );
}

export default AllCards;