import React from 'react';
import ReactDOM from 'react-dom';
import FormSubmit from './components/FormSubmit';
import './styles/styles.scss';

const Layout = (props) => {
  return(
    <div>
      {props.children}
    </div>
  );
};


ReactDOM.render(<FormSubmit />, document.getElementById('app'));
