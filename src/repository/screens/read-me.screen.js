import React, {Component, PropTypes} from 'react';
import {WebView} from 'react-native';

import {
  ViewContainer,
  LoadingContainer
} from "@components";

import {connect} from 'react-redux';
import {getReadMe} from '../repository.action';

const mapStateToProps = state => ({
  readMe: state.repository.readMe,
  isPendingReadMe: state.repository.isPendingReadMe,
});

const mapDispatchToProps = dispatch => ({
  getReadMe: (user, repoName) => dispatch(getReadMe(user, repoName)),
});

class ReadMe extends Component {
  componentDidMount() {
    const repo = this.props.navigation.state.params.repository;
    this.props.getReadMe(repo.owner.login, repo.name);
  }

  render() {
    const {
      readMe,
      isPendingReadMe,
    } = this.props;

    return (
      <ViewContainer barColor="dark">
        {isPendingReadMe && <LoadingContainer animating={isPendingReadMe} center/>}
        {!isPendingReadMe && <WebView source={{html: readMe}} />}
      </ViewContainer>
    );
  }
}

ReadMe.propTypes = {
  getReadMe: PropTypes.func,
  readMe: PropTypes.string,
  isPendingReadMe: PropTypes.bool,
  navigation: PropTypes.object,
};

export const ReadMeScreen = connect(mapStateToProps, mapDispatchToProps)(ReadMe);