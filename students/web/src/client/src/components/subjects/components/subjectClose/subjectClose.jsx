import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { archiveSubject } from 'resources/subject/subject.actions';
import fromSubjects from 'resources/subject/subject.selectors';
import Button from 'components/common/button';

class subjectClose extends Component {
  archiveSubject = () => {
    this.props.archiveSubject(this.props.id);
  }

  render() {
    const { name, teacher } = this.props.subject;

    return (
      <div className="subject__header subject-header">
        <p className="subject-header__fullname">{ name }</p>
        <p className="subject-header__email">{ teacher }</p>
        <div className="subject-header__buttons">
          <div className="subject-header__button">
            <Button danger click={this.archiveSubject}>Archive</Button>
          </div>
        </div>
      </div>
    );
  }
}

subjectClose.propTypes = {
  id: PropTypes.string.isRequired,
  subject: PropTypes.shape({
    name: PropTypes.string.isRequired,
    teacher: PropTypes.string.isRequired,
  }).isRequired,
  archiveSubject: PropTypes.func.isRequired,
};

export default connect(
  (state, { id }) => ({
    subject: fromSubjects.getSubjectById(state, id),
  }),
  { archiveSubject },
)(subjectClose);
