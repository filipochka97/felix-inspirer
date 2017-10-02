import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import SubjectClose from '../subjectClose';
import './subject.pcss';

class Subject extends PureComponent {
  state = {
    isClose: true,
  };

  render() {
    const { id } = this.props;

    return (
      <div className="subject">
        <SubjectClose
          id={id}
        />
      </div>
    );
  }
}

Subject.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Subject;
