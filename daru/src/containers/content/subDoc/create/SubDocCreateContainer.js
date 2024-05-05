import { connect } from 'react-redux';
import SubDocCreate from '../../../../components/content/subDoc/create/SubDocCreate';

function mapStateToProps(state) {
  return ({
    loginedId: state.login.loginedId
  });
}

export default connect(mapStateToProps, null)(SubDocCreate);