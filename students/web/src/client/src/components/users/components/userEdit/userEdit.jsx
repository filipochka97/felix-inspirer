import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  updateUser,
  archiveUser,
  uploadPhoto,
} from 'resources/user/user.actions';
import fromUsers from 'resources/user/user.selectors';
import constants from 'helpers/constants';

import Input from 'components/common/input';
import Button from 'components/common/button';
import FieldHint from 'components/common/fieldHint';

class userEdit extends PureComponent {
  constructor(props) {
    super(props);
    const { user } = this.props;
    this.state = {
      previewPhotoUrl: null,
      tempPhotoData: null,
      validationErrors: {},
      formData: {
        firstName: user.firstName,
        lastName: user.lastName,
        photoUrl: user.photoUrl,
        photoColors: user.photoColors,
        email: user.email,
      },
    };
  }

  updateUser = async () => {
    const validationErrors = {};
    const { tempPhotoData, formData } = this.state;

    if (tempPhotoData) {
      await uploadPhoto(tempPhotoData)
        .then(({ photoUrl, photoColors }) => this.setState({
          validationErrors: {
            ...validationErrors,
            uploadPhoto: null,
          },
          formData: {
            ...formData,
            photoUrl,
            photoColors,
          },
        }))
        .catch(() => this.setState({
          validationErrors: {
            ...validationErrors,
            uploadPhoto: 'Photo must be less than 5 MB',
          },
        }));
    }

    if (!validationErrors.uploadPhoto) {
      this.props.updateUser(this.props.id, this.state.formData)
        .then(({ errors, isBadRequest }) => {
          if (isBadRequest) {
            errors.map(error => Object.assign(validationErrors, error));
            this.setState({
              validationErrors,
            });
          } else {
            this.props.editUser();
          }
        });
    }
  }

  archiveUser = () =>
    this.props.archiveUser(this.props.id);

  handleChangeInput = (e) => {
    const newData = { [e.target.name]: `${[e.target.value][0]}` };
    this.setState({
      formData: { ...this.state.formData, ...newData },
    });
  }

  handleChangeDatepicker = dateOfBirth =>
    this.setState({
      formData: { ...this.state.formData, dateOfBirth },
    });

  handleChangeFile = (e) => {
    if (e.target.files[0]) {
      if (e.target.files[0].size < constants.UPLOAD_LIMIT) {
        const previewPhotoUrl = new FileReader();
        previewPhotoUrl.readAsDataURL(e.target.files[0]);
        previewPhotoUrl.onload = ev =>
          this.setState({
            previewPhotoUrl: ev.target.result,
            validationErrors: {
              ...this.state.validationErrors,
              uploadPhoto: null,
            },
          });

        const tempPhotoData = new FormData();
        tempPhotoData.append('avatar', e.target.files[0]);
        this.setState({
          tempPhotoData,
        });
      } else {
        this.setState({
          previewPhotoUrl: null,
          tempPhotoData: null,
          validationErrors: {
            ...this.state.validationErrors,
            uploadPhoto: 'Photo must be less than 5 MB',
          },
        });
      }
    }
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      photoUrl,
    } = this.props.user;

    const { editUser } = this.props;
    const { previewPhotoUrl, validationErrors } = this.state;

    return (
      <div className="user__inner">
        <div className="user__header user-header">
          <div className="user-header__photo">
            <img
              className="user-header__img"
              src={photoUrl}
              alt=""
            />
          </div>
          <p className="user-header__fullname">{ firstName } { lastName }</p>
          <p className="user-header__email">{ email }</p>
          <div className="user-header__buttons">
            <div className="user-header__button">
              <Button click={editUser}>Cancel</Button>
            </div>
            <div className="user-header__button">
              <Button danger click={this.archiveUser}>Archive</Button>
            </div>
            <div className="user-header__button">
              <Button primary click={this.updateUser}>Save</Button>
            </div>
          </div>
        </div>
        <div className="user__body user-body">
          <div className="user-body__inner user-body__inner--left">
            <div className="user-body__photo">
              <img
                className="user-body__img"
                src={previewPhotoUrl || photoUrl}
                alt=""
              />
            </div>
            <Input
              click={this.handleChangeFile}
              name="avatar"
              type="file"
              label="Upload photo"
              accept="image/*"
            />
            { <FieldHint isError={validationErrors.uploadPhoto && true}>
              {validationErrors.uploadPhoto}
            </FieldHint> }
          </div>
          <div className="user-body__inner user-body__inner--center">
            <Input
              click={this.handleChangeInput}
              defaultValue={firstName}
              label="First name"
              name="firstName"
              required
            />
            { <FieldHint isError={validationErrors.firstName && true}>
              {validationErrors.firstName}
            </FieldHint> }
            <Input
              click={this.handleChangeInput}
              defaultValue={lastName}
              label="Last name"
              name="lastName"
              required
            />
            { <FieldHint isError={validationErrors.lastName && true}>
              {validationErrors.lastName}
            </FieldHint> }
          </div>
          <div className="user-body__inner user-body__inner--right">
            <Input
              click={this.handleChangeInput}
              defaultValue={email}
              label="Email"
              name="email"
              type="email"
              required
            />
            { <FieldHint isError={validationErrors.email && true}>
              {validationErrors.email}
            </FieldHint> }
          </div>
        </div>
      </div>
    );
  }
}

userEdit.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    photoUrl: PropTypes.string,
    photoColors: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
  archiveUser: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
};

export default connect(
  (state, { id }) => ({ user: fromUsers.getUserById(state, id) }),
  { updateUser, archiveUser },
)(userEdit);
