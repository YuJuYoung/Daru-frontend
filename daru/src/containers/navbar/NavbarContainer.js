import { connect } from 'react-redux';
import Navbar from '../../components/navbar/Navbar'
import { removeLoginedId } from '../../redux/reducers/login/loginReducer';

function mapStateToProps(state) {
  return ({
    loginedId: state.login.loginedId
  })
}

function mapDispatchToProps(dispatch) {
  return ({
    removeLoginedId: function() {
      dispatch(removeLoginedId());
    }
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);