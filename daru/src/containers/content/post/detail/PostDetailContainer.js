import { connect } from 'react-redux';
import PostDetail from '../../../../components/content/post/detail/PostDetail';

function mapStateToProps(state) {
  return ({
    loginedId: state.login.loginedId
  });
}
    
export default connect(mapStateToProps, null)(PostDetail);