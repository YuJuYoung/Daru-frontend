import './MyPostList.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Pagination from "../../../../pagination/Pagination";

function MyPostList(props) {
  const navigate = useNavigate();

  const [postList, setPostList] = useState([]);

  const [pagination, setPagination] = useState({
    curPage: 1,
    maxPageCnt: 5,
    totalPage: 1
  });

  async function getPostList(data) {
    try {
      const response = await axios.post('/api/post/my-list', {
        userId: props.loginedId,
        criteria: data
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
    const getResult = await getPostList(pageData);

    if (getResult.success) {
      const resultData = getResult.data;

      setPagination({
        ...pagination,
        curPage: resultData.pageNum,
        totalPage: resultData.totalPage
      });

      setPostList(resultData.content);
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

  function handleListItemClick(postId) {
    navigate(`/post/${postId}/detail`);
  }

  return (
    <div className="MyPostList">
      <div className="container border rounded shadow" id="my-post-list-container">
        <span className="fw-bold fs-3">내 글 목록</span>
        <div id="my-post-list-content">
          <div className="mb-4 mt-5 container-fluid">
            <ul className="list-group">
              {
                postList.map((post, index) => (
                  <li key={index} className="list-group-item" onClick={() => handleListItemClick(post.id)}>
                    <div className="row">
                      <div className="col-sm-10">
                        <span>{post.title}</span>
                      </div>
                      <div className="col-sm-2">
                        <span>{post.createdAt}</span>
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

export default MyPostList;