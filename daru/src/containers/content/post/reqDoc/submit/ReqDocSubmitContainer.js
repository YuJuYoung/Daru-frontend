import { connect } from 'react-redux';
import ReqDocSubmit from '../../../../../components/content/post/reqDoc/submit/ReqDocSubmit';

function mapStateToProps(state) {
  return ({
    loginedId: state.login.loginedId
  });
}

export default connect(mapStateToProps, null)(ReqDocSubmit);