import { connect } from 'react-redux';
import SubDocList from '../../../../components/content/subDoc/list/SubDocList';

function mapStateToProps(state) {
  return ({
    loginedId: state.login.loginedId
  });
}

export default connect(mapStateToProps, null)(SubDocList);