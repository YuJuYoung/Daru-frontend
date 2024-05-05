import './PostCreate.css';
import axios from 'axios';
import ReqDocInfoCreate from './reqDocInfo/ReqDocInfoCreate';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PostCreate(props) {
  const [reqDocInfoList, setReqDocInfoList] = useState([]);
  const navigate = useNavigate();

  function checkFormData(data) {
    let result = {
      alertMessage: null,
      correct: false
    };
  
    if (data.title === "" || data.description === "") {
      result.alertMessage = '모두 입력해주세요.';
    } else {
      result.correct = true;
    }
    return result;
  }

  async function create(data) {
    try {
      const response = await axios.post('/api/post/create', {
        title: data.title,
        description: data.description,
        writerId: props.loginedId,
        reqDocInfoList: data.reqDocInfoList
      }, {
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

    if (props.loginedId == null) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
    } else {
      const formData = {
        title: document.getElementById('inputTitle').value,
        description: document.getElementById('inputDescription').value,
        reqDocInfoList: reqDocInfoList
      };
  
      const checkResult = checkFormData(formData);
  
      if (checkResult.correct) {
        const createResult = await create(formData);
  
        if (createResult.success) {
          navigate('/');
        } else {
          alert(createResult.message);
        }
      } else {
        alert(checkResult.alertMessage);
      }
    }
  }

  return (
    <div className="PostCreate">
      <div className="container border rounded shadow" id="post-create-form-container">
        <span className="fw-bold fs-3">글 등록 정보</span>
        <div className="mt-4">
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label htmlFor="inputTitle" className="form-label">제목</label>
              <input type="text" className="form-control" id="inputTitle" maxLength="30" aria-describedby="titleHelpBlock" />
              <div id="titleHelpBlock" className="form-text">
                30자 이하로 입력해주세요.
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="inputDescription" className="form-label">글 내용</label>
              <textarea className="form-control" id="inputDescription" rows="10" maxLength="1000"
                        aria-describedby="descriptionHelpBlock"></textarea>
              <div id="descriptionHelpBlock" className="form-text">
                1000자 이하로 입력해주세요.
              </div>
            </div>
            <div className="mb-4">
              <button type="submit" className="btn btn-primary">등록</button>
            </div>
          </form>
        </div>
        <ReqDocInfoCreate reqDocInfoList={reqDocInfoList} setReqDocInfoList={setReqDocInfoList} />
      </div>
    </div>
  );
}

export default PostCreate;