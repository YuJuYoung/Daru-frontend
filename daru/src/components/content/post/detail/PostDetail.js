import axios from 'axios';
import './PostDetail.css';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function PostDetail(props) {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function setData() {
      const getResult = await getPost(postId);

      if (getResult.success) {
        setPost(getResult.data);
      } else {
        alert(getResult.message);
        navigate("/");
      }
    }

    setData();
  }, [navigate, postId]);

  async function getPost(postId) {
    try {
      const response = await axios.get(`/api/post/${postId}/detail`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  return (
    <div className="PostDetail">
      {
        post == null
        ? null
        : <div className="container border rounded shadow" id="post-detail-container">
            <span className="fw-bold fs-3">글 정보</span>
            <div className="mt-4">
              <div className="mb-4">
                <label htmlFor="title" className="form-label">제목</label>
                <input type="text" className="form-control" id="title"
                      value={post.title} readOnly />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="form-label">글 내용</label>
                <textarea className="form-control" id="description" rows="10"
                          value={post.description} readOnly></textarea>
              </div>
              {
                props.loginedId == null
                ? null
                : props.loginedId === post.writerId
                  ? <div className="mb-4">
                      <Link role="button" className="btn btn-primary" to={`/post/${postId}/sub-doc/list`}>제출된 서류 확인</Link>
                    </div>
                  : <div className="mb-4">
                      <Link role="button" className="btn btn-primary" to={`/post/${postId}/sub-doc/create`}>서류 제출</Link>
                    </div>
              }
            </div>
          </div>
      }
    </div>
  );
}

export default PostDetail;