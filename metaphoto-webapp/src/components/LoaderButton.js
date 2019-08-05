import React from "react";
import { Button } from "react-bootstrap";
import "./LoaderButton.css";
import {SyncIcon} from "react-octicons";

export default ({
                    isLoading,
                    text,
                    loadingText,
                    className = "",
                    disabled = false,
                    ...props
                }) =>
    //TODO: fix spin
    <Button
        className={`LoaderButton ${className}`}
        disabled={disabled || isLoading}
        {...props}
    >
        {isLoading && <SyncIcon className="spinning" /> }
        {!isLoading ? text : loadingText}
    </Button>;
