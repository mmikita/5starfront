import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

document.addEventListener("#closeButton", function(){ alert("Hello World!"); });


$(document).keyup(function(e) {
    if (e.keyCode === 27) { // Esc
        $("#closeButton").click()
    }
});
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
