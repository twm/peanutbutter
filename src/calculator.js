import React from 'react';
import strUrl from './str.svg';
import dexUrl from './dex.svg';
import conUrl from './con.svg';
import intUrl from './int.svg';
import wisUrl from './wis.svg';
import chaUrl from './cha.svg';

const IMAGES = {
    'Str': strUrl,
    'Dex': dexUrl,
    'Con': conUrl,
    'Int': intUrl,
    'Wis': wisUrl,
    'Cha': chaUrl,
};

const Attribute = React.createClass({
    propTypes: {
        value: React.PropTypes.number.isRequired,
    },
    modifier() {
        var mod = Math.floor((this.props.value - 10) / 2);
        return (mod > 0) ? "+" + mod : "" + mod;
    },
    render() {
        return <div style={{
            position: 'relative',
            color: '#333',
            background: '#f0f0f0',
            borderRadius: '50%',
            width: '3.5rem',
            height: '3.5rem',
            lineHeight: '3.5rem',
            textAlign: 'center',
            fontSize: '1.5rem',
        }}>
            {this.props.value}
            <span style={{
                display: 'block',
                position: 'absolute',
                width: '1.75rem',
                height: '1.75rem',
                borderRadius: '50%',
                background: '#333',
                color: '#f0f0f0',
                top: 'calc(50% - (3rem / 2))',
                lineHeight: '1.75rem',
                right: '-1rem',
                fontSize: '1rem',
            }}>{this.modifier()}</span>
        </div>;
    }
});

// Future me: I apologize for the use of reduce().
const Calculator = React.createClass({
    attrs: ['Str', 'Dex', 'Con', 'Int', 'Wis', 'Cha'],
    buyCosts: {
        8: 0,
        9: 1,
        10: 2,
        11: 3,
        12: 4,
        13: 5,
        14: 6,
        15: 8,
        16: 10,
        17: 13,
        18: 16
    },
    getInitialState() {
        return {
            base: [8, 8, 8, 8, 8, 8],
            race: [0, 0, 0, 0, 0, 0],
            template: [0, 0, 0, 0, 0, 0],
            levelBuy: [0, 0, 0, 0, 0, 0],
        };
    },
    handleChange(stateKey, index, value) {
        var values = this.state[stateKey].slice();
        values[index] = Number(value);
        this.setState({[stateKey]: values});
    },
    pointCost() {
        return this.state.base.reduce((sum, value) => sum + this.buyCosts[value], 0);
    },
    /**
     * Every four levels you get to bump one stat.  Compute the
     * range of levels for which this buy is valid based on the
     * number of buys made.
     */
    levelRange() {
        var totalBuys = this.state.levelBuy.reduce((sum, value) => sum + value);
        var minLevel = totalBuys * 4;
        var maxLevel = minLevel + 3;
        return minLevel + '–' + maxLevel;
    },
    total(index) {
        return this.state.base[index] + this.state.race[index] + this.state.template[index] + this.state.levelBuy[index];
    },
    renderRow(attr, index) {
        return <tr key={attr}>
            <th colSpan="2"><img src={IMAGES[attr]} alt={attr} width="64" height="32" /></th>
            <td className="input">
                <input type="number" min="8" max="18" value={this.state.base[index]} autoComplete="off"
                    onChange={e => this.handleChange('base', index, e.target.value)} /></td>
            <td colSpan="2" className="operator">+</td>
            <td className="input">
                <input type="number" min="-20" max="20" value={this.state.race[index]} autoComplete="off"
                    onChange={e => this.handleChange('race', index, e.target.value)} /></td>
            <td colSpan="2" className="operator">+</td>
            <td className="input">
                <input type="number" min="-20" max="20" value={this.state.template[index]} autoComplete="off"
                    onChange={e => this.handleChange('template', index, e.target.value)} /></td>
            <td colSpan="2" className="operator">+</td>
            <td className="input">
                <input type="number" min="0" value={this.state.levelBuy[index]} autoComplete="off"
                    onChange={e => this.handleChange('levelBuy', index, e.target.value)} /></td>
            <td colSpan="2" className="operator">=</td>
            <td className="total"><Attribute value={this.total(index)} /></td>
        </tr>;
    },
    render() {
        return <table>
            <thead>
                <tr>
                    <td></td>
                    <th colSpan="3">Base</th>
                    <th colSpan="3">Race</th>
                    <th colSpan="3">Template</th>
                    <th colSpan="3">Levels</th>
                    <td></td>
                    <th colSpan="1">Total</th>
                </tr>
            </thead>
            <tbody>{this.attrs.map(this.renderRow, this)}</tbody>
            <tfoot>
                <tr>
                    <td colSpan="2"></td>
                    <td colSpan="15">{this.pointCost()} points spent<br />Levels {this.levelRange()}</td>
                </tr>
            </tfoot>
        </table>;
    }
});

export default Calculator;
