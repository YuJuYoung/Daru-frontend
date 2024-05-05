import './SubDocList.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Pagination from '../../../pagination/Pagination';

function SubDocList(props) {
  const navigate = useNavigate();
  
  const { postId } = useParams();

  const [subDocList, setSubDocList] = useState([]);

  const [pagination, setPagination] = useState({
    curPage: 1,
    maxPageCnt: 5,
    totalPage: 1
  });

  async function getSubDocList(pageData) {
    try {
      const response = await axios.post('/api/sub-doc/list', {
        postWriterId: props.loginedId,
        postId: postId,
        criteria: pageData
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

  async function setPageData(pageData) {
    const getResult = await getSubDocList(pageData);

    if (getResult.success) {
      const resultData = getResult.data;

      setPagination({
        ...pagination,
        curPage: resultData.pageNum,
        totalPage: resultData.totalPage
      });

      setSubDocList(resultData.content);
    } else {
      alert(getResult.message);
    }
  };

  useEffect(() => {
    function setData() {
      setPageData({ pageNum: 1 });
    }
    setData();
  }, []);

  function handlePaginationClick(clickedPage) {
    setPageData({ pageNum: clickedPage });
  }

  function handleListItemClick(subDocId) {
    navigate(`/sub-doc/${subDocId}/detail`);
  }

  return (
    <div className="SubDocList">
      <div className="container border rounded shadow" id="sub-doc-list-container">
        <span className="fw-bold fs-3">제출된 서류 목록</span>
        <div id="sub-doc-list-content">
          <div className="mb-4 mt-5 container-fluid">
            <ul className="list-group">
              {
                subDocList.map((subDoc, index) => (
                  <li key={index} className="list-group-item" onClick={() => handleListItemClick(subDoc.id)}>
                    <div className="row">
                      <div className="col-sm-9">
                        <span>{subDoc.writerName}</span>
                      </div>
                      <div className="col-sm-2">
                        <span>{subDoc.createdAt}</span>
                      </div>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
        <Pagination pagination={pagination} handlePaginationClick={handlePaginationClick} />
      </div>
    </div>
  );
}

export default SubDocList;