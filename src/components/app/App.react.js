import React, {PropTypes} from 'react';
import s from './App.scss';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div className={s.app}>App</div>);
  }
}

App.propTypes = {
};
