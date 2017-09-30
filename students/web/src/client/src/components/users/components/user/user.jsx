import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import UserClose from '../userClose';
import UserOpen from '../userOpen';
import UserEdit from '../userEdit';

import './user.pcss';

class User extends PureComponent {
  state = {
    isOpen: false,
    isEdited: false,
  };

  openUser = () =>
    this.setState({ isOpen: !this.state.isOpen });

  editUser = () =>
    this.setState({ isEdited: !this.state.isEdited });

  render() {
    const { id } = this.props;
    const { isOpen, isEdited } = this.state;

    return (
      <div className="user">
        { !isOpen &&
          <UserClose
            id={id}
            openUser={this.openUser}
          />
        }
        { isOpen && !isEdited &&
          <UserOpen
            id={id}
            openUser={this.openUser}
            editUser={this.editUser}
          />
        }
        { isEdited &&
          <UserEdit
            id={id}
            editUser={this.editUser}
          />
        }
      </div>
    );
  }
}

User.propTypes = {
  id: PropTypes.string.isRequired,
};

export default User;
