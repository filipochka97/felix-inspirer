import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import fromUsers from 'resources/user/user.selectors';
import {
  fetchUsersList,
  createUser,
} from 'resources/user/user.actions';

import Button from 'components/common/button';
import User from './components/user';
import UserNew from './components/userNew';

import '../common/styles/index.pcss';
import './index.styles.pcss';

class Users extends Component {
  state = { isAddNew: false };

  componentDidMount() {
    this.props.fetchUsersList();
  }

  toggleNewUserForm = () =>
    this.setState({ isAddNew: !this.state.isAddNew });

  render() {
    const { usersList } = this.props;
    const createNewUser = this.props.createUser;
    const { isAddNew } = this.state;

    return (
      <div className="list">
        { !usersList.length && !isAddNew &&
          <div className="note">
            <p className="note__text">{"You don't have any students yet"}</p>
            <Button
              click={this.toggleNewUserForm}
              success
              large
            >Create your first student
            </Button>
          </div>
        }
        { !!usersList.length &&
          <div className="list__header list-header">
            <div className="list-header__title">Student</div>
            <div className="list-header__title">Email</div>
            <div className="list-header__button">
              <Button
                click={this.toggleNewUserForm}
                success
              >Add student
              </Button>
            </div>
          </div>
        }
        <div className="list-body">
          { isAddNew &&
            <div className="list-body__item">
              <UserNew
                createUser={createNewUser}
                toggleNewUserForm={this.toggleNewUserForm}
              />
            </div>
          }
          { usersList.map(user => (
            <div className="list-body__item" key={user._id}>
              <User id={user._id} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Users.propTypes = {
  usersList: PropTypes.arrayOf(PropTypes.object).isRequired,
  createUser: PropTypes.func.isRequired,
  fetchUsersList: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    usersList: fromUsers.getUsersList(state),
  }),
  {
    fetchUsersList,
    createUser,
  },
)(Users);
