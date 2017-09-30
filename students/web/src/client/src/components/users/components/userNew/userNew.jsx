import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { uploadPhoto } from 'resources/user/user.actions';
import constants from 'helpers/constants';

import Input from 'components/common/input';
import Button from 'components/common/button';
import FieldHint from 'components/common/fieldHint';

class userNew extends PureComponent {
  constructor() {
    super();
    this.state = {
      previewPhotoUrl: null,
      tempPhotoData: null,
      validationErrors: {},
      formData: {
        photoUrl: constants.DEFAULT_PHOTO,
        photoColors: constants.PHOTO_COLORS,
      },
    };
  }

  toggleNewUserForm = () =>
    this.props.toggleNewUserForm();

  createUser = async () => {
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
      this.props.createUser(this.state.formData)
        .then(({ errors, isBadRequest }) => {
          if (isBadRequest) {
            errors.map(error => Object.assign(validationErrors, error));
            this.setState({
              validationErrors,
            });
          } else {
            this.props.toggleNewUserForm();
          }
        });
    }
  }

  handleChangeInput = (e) => {
    const newData = { [e.target.name]: `${[e.target.value][0]}` };
    this.setState({
      formData: { ...this.state.formData, ...newData },
    });
  }

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
    const { photoUrl } = this.state.formData;
    const { previewPhotoUrl, validationErrors } = this.state;

    return (
      <div className="user__inner">
        <div className="user__header user-header">
          <p className="user-header__fullname">Add student</p>
          <div className="user-header__buttons">
            <div className="user-header__button">
              <Button click={this.toggleNewUserForm}>Cancel</Button>
            </div>
            <div className="user-header__button">
              <Button click={this.createUser} primary>Save</Button>
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
              label="Upload photo"
              name="avatar"
              type="file"
              accept="image/*"
            />
            { <FieldHint isError={validationErrors.uploadPhoto && true}>
              {validationErrors.uploadPhoto}
            </FieldHint> }
          </div>
          <div className="user-body__inner user-body__inner--center">
            <Input
              click={this.handleChangeInput}
              label="First name"
              name="firstName"
              required
            />
            { <FieldHint isError={validationErrors.firstName && true}>
              {validationErrors.firstName}
            </FieldHint> }
            <Input
              click={this.handleChangeInput}
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

userNew.propTypes = {
  createUser: PropTypes.func.isRequired,
  toggleNewUserForm: PropTypes.func.isRequired,
};

export default userNew;
