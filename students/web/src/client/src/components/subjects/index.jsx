import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import fromSubjects from 'resources/subject/subject.selectors';
import {
  fetchSubjectsList,
  createSubject,
} from 'resources/subject/subject.actions';

import Button from 'components/common/button';
import Subject from './components/subject';
import SubjectNew from './components/subjectNew';

import '../common/styles/index.pcss';
import './index.styles.pcss';

class Subjects extends Component {
  state = { isAddNew: false };

  componentDidMount() {
    this.props.fetchSubjectsList();
  }

  toggleNewSubjectForm = () =>
    this.setState({ isAddNew: !this.state.isAddNew });

  render() {
    const { subjectsList } = this.props;
    const createNewSubject = this.props.createSubject;
    const { isAddNew } = this.state;

    return (
      <div className="list">
        { !subjectsList.length && !isAddNew &&
          <div className="note">
            <p className="note__text">{"You don't have any subjects yet"}</p>
            <Button
              click={this.toggleNewSubjectForm}
              success
              large
            >Add your first subject
            </Button>
          </div>
        }
        { !!subjectsList.length &&
          <div className="list__header list-header">
            <div className="list-header__title">Subject</div>
            <div className="list-header__title">Teacher</div>
            <div className="list-header__button">
              <Button
                click={this.toggleNewSubjectForm}
                success
              >Add subject
              </Button>
            </div>
          </div>
        }
        <div className="list-body">
          { isAddNew &&
            <div className="list-body__item">
              <SubjectNew
                createSubject={createNewSubject}
                toggleNewSubjectForm={this.toggleNewSubjectForm}
              />
            </div>
          }
          { subjectsList.map(subject => (
            <div className="list-body__item" key={subject._id}>
              <Subject id={subject._id} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Subjects.propTypes = {
  subjectsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  createSubject: PropTypes.func.isRequired,
  fetchSubjectsList: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    subjectsList: fromSubjects.getSubjectsList(state),
  }),
  {
    fetchSubjectsList,
    createSubject,
  },
)(Subjects);
