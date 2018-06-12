import React from 'react';
import ReactDOM from 'react-dom';
import FormSubmit from './components/FormSubmit';

const Layout = (props) => {
  return(
    <div>
      <p>header</p>
      {props.children}
      <p>footer</p>
    </div>
  );
};


ReactDOM.render(<FormSubmit />, document.getElementById('app'));
