import React from 'react';
import Calculator from './calculator.js';
import headerUrl from  './header.svg';


const Page = React.createClass({
    render() {
        return <div>
            <h1><img src={headerUrl} alt="Point Buy Calculator" /></h1>
            <Calculator />
        </div>;
    },
});

export default Page;
