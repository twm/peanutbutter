/**
 * This module is used to render index.html at Webpack build time.
 */
import ReactDOMServer from 'react-dom/server';
import Page from './pointbuy.js';
import styles from './styles.css';

const head = `
<!DOCTYPE html>
<html lang="en_US">
<head>
    <meta charset="utf-8">
    <title>D&amp;D 3.5 Point Buy Calculator</title>
    <style>${styles}</style>
    <script defer src="client.js"></script>
</head>
<body><div id="app">`;

const tail = `</div></body></html>`;

export default function render() {
    return head + ReactDOMServer.renderToString(<Page />) + tail;
}
