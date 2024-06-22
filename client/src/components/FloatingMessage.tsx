import React from "react";
import '../styles/FloatingMessage.css';

export default function FloatingMessage({message}: {message: string}) {

    return <div className="float">{message}</div>
}