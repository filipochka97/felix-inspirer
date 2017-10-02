import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Input from 'components/common/input';
import Button from 'components/common/button';

class subjectNew extends PureComponent {
  constructor() {
    super();
    this.state = {
      formData: {},
    };
  }

  toggleNewSubjectForm = () =>
    this.props.toggleNewSubjectForm();

  createSubject = async () => {
    this.props.createSubject(this.state.formData)
      .then(() => this.props.toggleNewSubjectForm());
  }

  handleChangeInput = (e) => {
    const newData = { [e.target.name]: `${[e.target.value][0]}` };
    this.setState({
      formData: { ...this.state.formData, ...newData },
    });
  }

  render() {
    return (
      <div className="subject__inner">
        <div className="subject__header subject-header">
          <p className="subject-header__fullname">Add subject</p>
          <div className="subject-header__buttons">
            <div className="subject-header__button">
              <Button click={this.toggleNewSubjectForm}>Cancel</Button>
            </div>
            <div className="subject-header__button">
              <Button click={this.createSubject} primary>Save</Button>
            </div>
          </div>
        </div>
        <div className="subject__body subject-body">
          <div className="subject-body__inner subject-body__inner--left">
            <Input
              click={this.handleChangeInput}
              label="Subject name"
              name="name"
              required
            />
          </div>
          <div className="subject-body__inner subject-body__inner--center">
            <Input
              click={this.handleChangeInput}
              label="Teacher"
              name="teacher"
              required
            />
          </div>
        </div>
      </div>
    );
  }
}

subjectNew.propTypes = {
  createSubject: PropTypes.func.isRequired,
  toggleNewSubjectForm: PropTypes.func.isRequired,
};

export default subjectNew;
