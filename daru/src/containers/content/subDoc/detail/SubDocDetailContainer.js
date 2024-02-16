import { connect } from 'react-redux';
import SubDocDetail from '../../../../components/content/subDoc/detail/SubDocDetail';

function mapStateToProps(state) {
  return ({
    loginedId: state.login.loginedId
  });
}

export default connect(mapStateToProps, null)(SubDocDetail);