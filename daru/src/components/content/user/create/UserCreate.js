import './UserCreate.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateForm() {
  const navigate = useNavigate();

  function isCorrectEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
  }
  
  function isCorrectPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/.test(password);
  }
  
  function isCorrectName(name) {
    return /^\S+$/.test(name);
  }
  
  function isCorrectPhoneNumber(phoneNumber) {
    return /^\d{10,11}$/.test(phoneNumber);
  }
  
  function checkFormData(data) {
    let result = {
      alertMessage: null,
      correct: false
    };
  
    if (!isCorrectEmail(data.email)) {
      result.alertMessage = '잘못된 이메일 주소입니다.';
    } else if (!isCorrectPassword(data.password)) {
      result.alertMessage = '잘못된 비밀번호입니다.';
    } else if (!isCorrectName(data.name)) {
      result.alertMessage = '잘못된 이름입니다.';
    } else if (!isCorrectPhoneNumber(data.phoneNumber)) {
      result.alertMessage = '잘못된 전화번호입니다.';
    } else {
      result.correct = true;
    }
    return result;
  }
  
  async function createUser(data) {
    try {
      const response = await axios.post('/api/user/create', data, {
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
    
    const formData = {
      email: document.getElementById('inputEmail').value,
      password: document.getElementById('inputPassword').value,
      name: document.getElementById('inputName').value,
      phoneNumber: document.getElementById('inputPhoneNumber').value
    };
  
    const checkResult = checkFormData(formData);
  
    if (checkResult.correct) {
      const createResult = await createUser(formData);
  
      if (createResult.success) {
        navigate('/login');
      } else {
        alert(createResult.message);
      }
    } else {
      alert(checkResult.alertMessage);
    }
  }

  return (
    <div className="CreateForm">
      <div className="container border rounded shadow" id="user-create-form-container">
        <span className="fw-bold fs-3">회원가입 정보</span>
        <div className="mt-5">
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label htmlFor="inputEmail" className="form-label">이메일 주소</label>
              <input type="email" className="form-control" id="inputEmail" />
            </div>
            <div className="mb-4">
              <label htmlFor="inputPassword" className="form-label">비밀번호</label>
              <input type="password" id="inputPassword" className="form-control" aria-describedby="passwordHelpBlock" />
              <div id="passwordHelpBlock" className="form-text">
                길이는 8자리 이상, 20자리 이하여야하고 영문 대소문자, 숫자, 특수문자(띄어쓰기 제외)로 이루어져야합니다.
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="inputName" className="form-label">이름</label>
              <input type="text" className="form-control" id="inputName" />
            </div>
            <div className="mb-4">
              <label htmlFor="inputPhoneNumber" className="form-label">휴대폰 번호</label>
              <input type="text" className="form-control" id="inputPhoneNumber" aria-describedby="phoneNumberHelpBlock" />
              <div id="phoneNumberHelpBlock" className="form-text">
                '-'를 제외하고 입력해주세요.
              </div>
            </div>
            <button type="submit" className="btn btn-primary">회원가입</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateForm;