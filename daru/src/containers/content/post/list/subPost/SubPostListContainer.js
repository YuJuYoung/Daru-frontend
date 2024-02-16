import { connect } from 'react-redux';
import SubPostList from '../../../../../components/content/post/list/subPost/SubPostList';

function mapStateToProps(state) {
  return ({
    loginedId: state.login.loginedId
  });
}

export default connect(mapStateToProps, null)(SubPostList);