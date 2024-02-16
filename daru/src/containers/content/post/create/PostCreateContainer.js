import { connect } from 'react-redux';
import PostCreate from '../../../../components/content/post/create/PostCreate';

function mapStateToProps(state) {
  return ({
    loginedId: state.login.loginedId
  });
}
  
export default connect(mapStateToProps, null)(PostCreate);