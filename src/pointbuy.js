import React from 'react';
import Calculator from './calculator.js';
import headerUrl from  './header.svg';


const Page = React.createClass({
    render() {
        return <div>
            <h1><img src={headerUrl} alt="Point Buy Calculator" width="500" height="55" /></h1>
            <Calculator />
            <p><small><a href="https://github.com/twm/peanutbutter">Peanut Butter</a> ©{"\x1b"}2016 Tom Most.<br />Includes React ©{"\x1b"}2013–2016 Facebook, Inc.</small></p>
        </div>;
    },
});

export default Page;
