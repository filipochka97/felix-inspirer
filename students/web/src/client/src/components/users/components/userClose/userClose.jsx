import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import fromUsers from 'resources/user/user.selectors';

class userClose extends PureComponent {
  render() {
    const { firstName, lastName, photoUrl } = this.props.user;
    const { email } = this.props.user;

    return (
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
            <button
              className="btn btn-details"
              onClick={this.props.openUser}
            >
              View details
            </button>
          </div>
        </div>
      </div>
    );
  }
}

userClose.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    photoUrl: PropTypes.string,
  }).isRequired,
  openUser: PropTypes.func.isRequired,
};

export default connect(
  (state, { id }) => ({
    user: fromUsers.getUserById(state, id),
  }),
)(userClose);
