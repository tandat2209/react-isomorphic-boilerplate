import React, {PropTypes} from 'react';

export default class NotFound extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="not-found">Oops... Not found.. :)</div>
    );
  }
}

NotFound.propTypes = {
};
