import { connect } from 'react-redux';
import MyPostList from '../../../../../components/content/post/list/myPost/MyPostList';

function mapStateToProps(state) {
  return ({
    loginedId: state.login.loginedId
  });
}

export default connect(mapStateToProps, null)(MyPostList);