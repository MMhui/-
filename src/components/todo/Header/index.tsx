import * as React from 'react';
import './index.styl'

export interface IProps {
    title: string;
}

export default function Header({title}: IProps) {
    return (
        <header className="main-header">
            <h1>{title}</h1>
        </header>
    )
}