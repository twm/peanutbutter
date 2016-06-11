/**
 * This module is used to render index.html at Webpack build time.
 */
import ReactDOMServer from 'react-dom/server';
import Page from './pointbuy.js';

const head = `
<!DOCTYPE html>
<html lang="en_US">
<head>
    <meta charset="utf-8">
    <title>D&amp;D 3.5 Point Buy Calculator</title>
    <style>
        body {
            font-family: "Fira Sans", sans-serif;
            color: black;
            background: white;
        }
        h1 {
            font-family: "Fondamento", sans-serif;
        }
        th {
            text-align: left;
            font-weight: normal;
        }
        td.total {
            text-align: right;
        }
        input[type=number] {
            color: inherit;
            border: none;
            background: transparent;
            width: 3em;
            font: inherit;
            text-align: right;
        }
    </style>
    <script defer src="client.js"></script>
</head>
<body><div id="app">`;

const tail = `</div></body></html>`;

export default function render() {
    return head + ReactDOMServer.renderToString(<Page />) + tail;
}
