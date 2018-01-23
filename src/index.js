import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


/**
 * tenemos nuestro punto de entrada de la app, por acá va a pasar el funcionamiento de toda nuestra app.
 */
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
