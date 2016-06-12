import React from 'react';

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
        var total = this.total(index);
        var mod = Math.floor((total - 10) / 2);
        var modStr = (mod > 0) ? "+" + mod : "" + mod;
        return <tr key={attr}>
            <th>{attr}</th>
            <td><input type="number" min="8" max="18" value={this.state.base[index]} autoComplete="off"
                onChange={e => this.handleChange('base', index, e.target.value)} /></td>
            <td><input type="number" min="-20" max="20" value={this.state.race[index]} autoComplete="off"
                onChange={e => this.handleChange('race', index, e.target.value)} /></td>
            <td><input type="number" min="-20" max="20" value={this.state.template[index]} autoComplete="off"
                onChange={e => this.handleChange('template', index, e.target.value)} /></td>
            <td><input type="number" min="0" value={this.state.levelBuy[index]} autoComplete="off"
                onChange={e => this.handleChange('levelBuy', index, e.target.value)} /></td>
            <td className="total">{total} ({modStr})</td>
        </tr>;
    },
    render() {
        return <table>
            <thead>
                <tr>
                    <td></td>
                    <th>Base</th>
                    <th>Race</th>
                    <th>Template</th>
                    <th>Levels</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>{this.attrs.map(this.renderRow, this)}</tbody>
            <tfoot>
                <tr>
                    <td></td>
                    <td colSpan="3">{this.pointCost()} points spent<br />Levels {this.levelRange()}</td>
                </tr>
            </tfoot>
        </table>;
    }
});

export default Calculator;
