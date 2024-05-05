import './SubDocCreate.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function SubDocCreate(props) {
  const { postId } = useParams();
  const [reqDocInfoList, setReqDocInfoList] = useState([]);
  const navigate = useNavigate();

  async function getReqDocInfoList(postId) {
    const response = await axios.post('/api/req-doc/info/list', postId, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  }

  useEffect(() => {
    async function setData() {
      const getResult = await getReqDocInfoList(postId);

      if (getResult.success) {
        if (getResult.data === null || getResult.data.length === 0) {
          alert("서류가 없습니다.");
          navigate(-1);
        } else {
          setReqDocInfoList(getResult.data);
        }
      } else {
        alert(getResult.message);
      }
    }

    setData();
  }, []);

  async function submit(data) {
    try {
      const response = await axios.post('/api/sub-doc/create', {
        postId: postId,
        userId: props.loginedId,
        subDocInfoList: data.subDocInfoList
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

  function getIdByReqDocInfo(reqDocInfo) {
    return "reqDocInfo" + reqDocInfo.id;
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (props.loginedId == null) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
    } else {
      const formData = {
        subDocInfoList: []
      };

      for (let i = 0; i < reqDocInfoList.length; i++) {
        let reqDocInfo = reqDocInfoList[i];

        formData.subDocInfoList.push({
          explainTxt: reqDocInfo.explainTxt,
          content: document.getElementById(getIdByReqDocInfo(reqDocInfo)).value
        });
      }

      const submitResult = await submit(formData);

      if (submitResult.success) {
        navigate(`/post/${postId}/detail`);
      } else {
        alert(submitResult.message);
      }
    }
  }

  return (
    <div className="ReqDocSubmit">
      <div className="container border rounded shadow" id="sub-doc-create-container">
        <span className="fw-bold fs-3">서류 정보</span>
        <div className="mt-4">
          <form onSubmit={handleFormSubmit}>
            {
              reqDocInfoList.map((reqDocInfo, index) => (
                <div key={index}>
                  <div className="mb-4">
                    <label htmlFor={reqDocInfo.id} className="form-label">{reqDocInfo.explainTxt}</label>
                    <textarea className="form-control input-req-doc-info" id={getIdByReqDocInfo(reqDocInfo)} rows="10"
                              maxLength={reqDocInfo.maxLen} minLength={reqDocInfo.minLen}
                              aria-describedby={getIdByReqDocInfo(reqDocInfo) + "HelpBlock"}></textarea>
                    <div id={getIdByReqDocInfo(reqDocInfo) + "HelpBlock"} className="form-text">
                      {reqDocInfo.minLen}자 이상, {reqDocInfo.maxLen}자 이하로 입력해주세요.
                    </div>
                  </div>
                </div>
              ))
            }
            <div className="mb-4">
              <button type="submit" class="btn btn-primary">제출</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SubDocCreate;