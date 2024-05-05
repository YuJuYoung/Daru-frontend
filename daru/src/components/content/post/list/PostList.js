import './PostList.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Pagination from '../../../pagination/Pagination';

function PostList() {
  const navigate = useNavigate();

  const [postList, setPostList] = useState([]);
  
  const [pagination, setPagination] = useState({
    curPage: 1,
    maxPageCnt: 5,
    totalPage: 1
  });

  const [searching, setSearching] = useState({
    keyword: null
  })

  async function getPostList(data) {
    try {
      const response = await axios.post('/api/post/list', data, {
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

      setSearching({
        ...searching,
        keyword: resultData.keyword
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
    setPageData({
      pageNum: clickedPage,
      keyword: searching.keyword
    });
  }

  function handleSearch(e) {
    e.preventDefault();
    setPageData({
      pageNum: 1,
      keyword: document.getElementById("search-keyword").value
    });
  }

  function handleListItemClick(postId) {
    navigate(`/post/${postId}/detail`);
  }

  return (
    <div className="PostList">
      <div className="container border rounded shadow" id="post-list-container">
        <span className="fw-bold fs-3">글 목록</span>
        <div id="post-list-content">
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
        <div className="search-bar">
          <div className="search-bar-container container-fluid">
            <form className="d-flex" role="search" onSubmit={handleSearch}>
              <input className="form-control me-2" type="search" placeholder="제목 검색" aria-label="Search" id="search-keyword" />
              <button className="btn btn-outline-primary" type="submit">Search</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostList;