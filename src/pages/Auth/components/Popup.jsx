import React from 'react';
import "./index.css";
import {GrClose} from "react-icons/gr";

const Popup = ({message,handleClose,isValid}) => {
    return (
        <div className="popup">
            <div className={`popup-inner ${isValid ? "success" : "error"}`}>
                <h3>{message}</h3>
                <GrClose onClick={handleClose} className="icon"/>
            </div>
        </div>
    );
};

export default Popup;