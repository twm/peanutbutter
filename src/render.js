/**
 * This module is used to render index.html at Webpack build time.
 */
import ReactDOMServer from 'react-dom/server';
import Page from './pointbuy.js';
// CSS is inlined into the HTML below, so import its content.
import styles from './styles.css';

export default function render(client) {
    const head = `
        <!DOCTYPE html>
        <html lang="en_US">
        <head>
            <meta charset="utf-8">
            <title>D&amp;D 3.5 Point Buy Calculator</title>
            <style>${styles}</style>
            <script defer src="${client}"></script>
        </head>
        <body><div id="app">`;

    const tail = `</div></body></html>`;

    return head + ReactDOMServer.renderToString(<Page />) + tail;
}
