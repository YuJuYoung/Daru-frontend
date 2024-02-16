import { connect } from 'react-redux';
import Login from '../../../components/content/login/Login'
import { setLoginedId } from '../../../redux/reducers/login/loginReducer';

function mapDispatchToProps(dispatch) {
  return ({
    setLoginedId: function(loginedId) {
      dispatch(setLoginedId(loginedId));
    }
  });
}

export default connect(null, mapDispatchToProps)(Login);