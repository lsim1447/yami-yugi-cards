import React, { useContext, useEffect } from 'react';
import { HideOverlaysContext }  from "../../contexts/HideOverlaysContext";
import styled from 'styled-components';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const PageNotFoundWrapper = styled.div `
    background: url(/images/404-error-page-not-found.jpg) fixed center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    min-height: 100vh;
`;

function PageNotFound() {
  const { hideAllOverlays } = useContext(HideOverlaysContext);

  useEffect(() => {
    setTimeout(() => {
      confirmAlert({
        title: 'Page not found!',
        message: 'This page is not exists or currently is not working. Please try again later.',
        buttons: [
          {
            label: 'Navigate to the Homepage',
            onClick: () => {
                window.location.href = '/'
            }
          },
          {
            label: 'Stay on this page',
            onClick: () => {}
          }
        ]
      });
    }, 5000);
  }, []);
  
  return (
    <PageNotFoundWrapper onClick={() => hideAllOverlays()} />
  );
}

export default PageNotFound;