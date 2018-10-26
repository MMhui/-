import * as React from 'react';
import './index.styl';

export interface IProps {
    name: string;
}

function Footer({name}: IProps) {
    return (
        <div id="footer">
            <span>Written by {name}</span>
        </div>
    );
}

export default Footer;