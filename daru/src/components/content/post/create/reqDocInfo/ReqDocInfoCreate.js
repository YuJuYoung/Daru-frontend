import './ReqDocInfoCreate.css';
import { useState } from 'react';

function RequestedInfo({ reqDocInfoList, setReqDocInfoList }) {
  const [localReqDocInfoList, setLocalReqDocInfoList] = useState([]);

  function checkFormData(data) {
    let result = {
      alertMessage: null,
      correct: false
    };
  
    if (data.explainTxt === "" || data.minLenth === "" || data.maxLenth === "") {
      result.alertMessage = '모두 입력해주세요.';
    } else {
      result.correct = true;
    }
    return result;
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    const formData = {
      explainTxt: document.getElementById('inputExplainTxt').value,
      minLen: document.getElementById('inputMinLen').value,
      maxLen: document.getElementById('inputMaxLen').value
    };

    const checkResult = checkFormData(formData);

    if (checkResult.correct) {
      setReqDocInfoList([...reqDocInfoList, formData]);
      setLocalReqDocInfoList([...localReqDocInfoList, formData]);
    } else {
      alert(checkResult.alertMessage);
    }
  }

  return (
    <div className="ReqDocInfoCreate">
      <div className="container rounded border pt-4 pb-4" id="req-doc-info-container">
        <div className="mb-4">
          <span className="fw-bold fs-3">서류 정보</span>
        </div>
        <div className="requested-info-list">
          <div className="mb-4">
            <ul class="list-group">
              {
                localReqDocInfoList.map((reqDocInfo, index) => (
                  <li class="list-group-item" key={index}>
                    <div className="row">
                      <div className="col-sm-8">
                        <span>{reqDocInfo.explainTxt}</span>
                      </div>
                      <div className="col-sm-3">
                        <span>{reqDocInfo.minLen}자 이상, {reqDocInfo.maxLen}자 이하</span>
                      </div>
                      <div className="col-sm-1">
                        <button type="button" class="btn-close" aria-label="Close"></button>
                      </div>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
        <div className="requested-info-create-form">
          <form onSubmit={handleFormSubmit}>
            <div className="row mb-4">
              <div className="col-sm-8">
                <label htmlFor="inputExplainTxt" className="form-label">요구 정보 설명</label>
                <input type="text" className="form-control" id="inputExplainTxt" maxLength="50" />
              </div>
              <div className="col-sm-2">
                <label htmlFor="inputMinLen" className="form-label">최소 길이</label>
                <input type="number" className="form-control" id="inputMinLen" />
              </div>
              <div className="col-sm-2">
                <label htmlFor="inputMaxLen" className="form-label">최대 길이</label>
                <input type="number" className="form-control" id="inputMaxLen" />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">요구 정보 추가</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RequestedInfo;