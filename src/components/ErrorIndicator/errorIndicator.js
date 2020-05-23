import React from 'react';
import './errorIndicator.css'
import  errorImg from '../../images/error.png'
const ErrorIndicator = () => {
    return (
        <div className="errorWrapper">
            <div className="errorTitle">Something has gone wrong</div>
            <div className="errorSubTitle">(but we will fix it soon)</div>
            <img className="errorImg" src={errorImg} alt="errorImg"/>
        </div>
    )
};
export default ErrorIndicator;