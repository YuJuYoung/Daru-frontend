import './SubDocDetail.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function SubDocDetail(props) {
  const navigate = useNavigate();
  const { subDocId } = useParams();

  const [subDocInfoList, setSubDocInfoList] = useState([]);

  async function getSubDocInfoList() {
    const response = await axios.post(`/api/sub-doc/info/list`, {
        loginedId: props.loginedId,
        subDocId: subDocId
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  }

  useEffect(() => {
    async function setData() {
      const getResult = await getSubDocInfoList();

      if (getResult.success) {
        setSubDocInfoList(getResult.data);
      } else {
        alert(getResult.message);
        navigate(-1);
      }
    }

    setData();
  }, []);

  function getIdBySubDocInfo(subDocInfo) {
    return "subDocInfo" + subDocInfo.id;
  }

  return (
    <div className="SubDocDetail">
      <div className="container border rounded shadow" id="sub-doc-detail-container">
        <span className="fw-bold fs-3">서류 정보</span>
        <div className="mt-4">
          {
            subDocInfoList.map((subDocInfo, index) => (
            <div key={index}>
                <div className="mb-4">
                <label htmlFor={getIdBySubDocInfo(subDocInfo)} className="form-label">{subDocInfo.explainTxt}</label>
                <textarea className="form-control sub-doc-info" id={getIdBySubDocInfo(subDocInfo)} rows="10"
                          value={subDocInfo.content} readOnly></textarea>
                </div>
            </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default SubDocDetail;