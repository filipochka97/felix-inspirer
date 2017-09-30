import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import fromUsers from 'resources/user/user.selectors';

import Button from 'components/common/button';

class userOpen extends PureComponent {
  render() {
    const {
      firstName,
      lastName,
      email,
      photoUrl,
    } = this.props.user;

    const {
      editUser,
      openUser,
    } = this.props;

    return (
      <div className="user__inner">
        <div className="user__header user-header">
          <div className="user-header__photo">
            <img
              src={photoUrl}
              alt={`${firstName} ${lastName}`}
              className="user-header__img"
              width="30"
              height="30"
            />
          </div>
          <p className="user-header__fullname">{ firstName } { lastName }</p>
          <p className="user-header__email">{ email }</p>
          <div className="user-header__buttons">
            <div className="user-header__button">
              <Button click={editUser}>Edit</Button>
            </div>
            <div className="user-header__button">
              <button className="btn btn-details btn-details--open" onClick={openUser}>
                View details
              </button>
            </div>
          </div>
        </div>

        <div className="user__body user-body">
          <div className="user-body__inner user-body__inner--left">
            <div className="user-body__section">
              <div className="user-body__photo">
                <img
                  src={photoUrl}
                  alt={`${firstName} ${lastName}`}
                  className="user-body__img"
                  width="160"
                  height="160"
                />
              </div>
            </div>
          </div>
          <div className="user-body__inner user-body__inner--right">
            <div className="user-body__section">
              <p className="user-body__subtitle">Contacts</p>
              <div className="contacts user-body__text">
                <p className="contacts__item">
                  <b className="bold">Email: </b> {email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

userOpen.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    photoUrl: PropTypes.string,

  }).isRequired,
  editUser: PropTypes.func.isRequired,
  openUser: PropTypes.func.isRequired,
};

export default connect((state, { id }) => ({
  user: fromUsers.getUserById(state, id),
}))(userOpen);
