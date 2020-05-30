import React, { useContext, useState, useEffect } from 'react';
import  { CardContext }  from "./../contexts/CardContext";
import styled from 'styled-components';
import './../special-styles/checkout-modal.css'


function Test() {
    const { allCards, setAllCards } = useContext(CardContext);

    return (
        <div className="container demo">
            <div className="text-center">
                <button type="button" className="btn btn-demo" data-toggle="modal" data-target="#myModal2">
                    Right Sidebar Modal
                </button>
            </div>
            
            <div className="modal right fade" id="myModal2" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel2">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="myModalLabel2">Right Sidebar</h4>
                        </div>
                        <div className="modal-body">
                            <p>
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Test;