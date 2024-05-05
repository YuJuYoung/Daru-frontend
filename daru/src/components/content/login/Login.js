import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm(props) {
  const navigate = useNavigate();

  function isCorrectEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
  }
  
  function checkFormData(data) {
    let result = {
      alertMessage: null,
      correct: false
    };
  
    if (!isCorrectEmail(data.email)) {
      result.alertMessage = '잘못된 이메일 주소입니다.';
    } else {
      result.correct = true;
    }
    return result;
  }
  
  async function login(data) {
    try {
      const response = await axios.post('/api/login', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
  
  async function handleFormSubmit(e) {
    e.preventDefault();
  
    let formData = {
      email: document.getElementById('inputEmail').value,
      password: document.getElementById('inputPassword').value
    };
  
    const checkResult = checkFormData(formData);
  
    if (checkResult.correct) {
      const loginResult = await login(formData);
  
      if (loginResult.success) {
        props.setLoginedId(loginResult.data);
        navigate('/');
      } else {
        alert(loginResult.message);
      }
    } else {
      alert(checkResult.alertMessage);
    }
  }

  return (
    <div className="Login">
      <div className="container border rounded shadow" id="login-form-container">
        <span className="fw-bold fs-3">로그인 정보</span>
        <div className="mt-5">
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4 row">
              <label htmlFor="inputEmail" className="col-sm-3 col-form-label">이메일</label>
              <div className="col-sm-9">
                <input type="email" className="form-control" id="inputEmail" />
              </div>
            </div>
            <div className="mb-4 row">
              <label htmlFor="inputPassword" className="col-sm-3 col-form-label">비밀번호</label>
              <div className="col-sm-9">
                <input type="password" className="form-control" id="inputPassword" />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">로그인</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;