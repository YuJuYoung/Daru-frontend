import './SubPostList.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Pagination from "../../../../pagination/Pagination";

function SubPostList(props) {
  const navigate = useNavigate();

  const [postList, setPostList] = useState([]);

  const [pagination, setPagination] = useState({
    curPage: 1,
    maxPageCnt: 5,
    totalPage: 1
  });

  async function getPostList(data) {
    const response = await axios.post('/api/post/sub/list', {
      userId: props.loginedId,
      criteria: data
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data;
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
    if (clickedPage < 1) {
      alert("이전 페이지가 없습니다.");
    } else if (clickedPage > pagination.totalPage) {
      alert("다음 페이지가 없습니다.")
    } else {
      setPageData({ pageNum: clickedPage });
    }
  }

  function handleListItemClick(postId) {
    navigate(`/post/${postId}/detail`);
  }

  return (
    <div className="MyPostList">
      <div className="container border rounded shadow" id="sub-post-list-container">
        <span className="fw-bold fs-3">서류 제출한 글 목록</span>
        <div id="sub-post-list-content">
          <div className="mb-4 mt-5 container-fluid">
            <ul className="list-group">
              {
                postList.map((post, index) => (
                  <li key={index} className="list-group-item" onClick={() => handleListItemClick(post.id)}>
                    <div className="row">
                      <div className="col-sm-9">
                        <span>{post.title}</span>
                      </div>
                      <div className="col-sm-2">
                        <span>{post.createdAt}</span>
                      </div>
                      <div className="col-sm-1">
                        <span>{post.writerName}</span>
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

export default SubPostList;