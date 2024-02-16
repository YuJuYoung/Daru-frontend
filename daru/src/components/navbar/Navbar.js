import './Navbar.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Navbar(props) {
  const navigate = useNavigate();

  async function logout(data) {
    const response = await axios.post('/api/login/logout', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  }

  async function handleLogoutClick() {
    const logoutResult = await logout(props.loginedId);

    if (logoutResult.success) {
      props.removeLoginedId();
      navigate('/');
    } else {
      alert(logoutResult.message);
    }
  }

  return (
    <div className="Navbar">
      <nav className="navbar navbar-expand-lg bg-primary shadow">
        <div className="container-fluid" id="navbar-conatiner">
          <Link className="navbar-brand text-white fw-bold fs-3" to="/">다루</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto me-auto mb-2 mb-lg-0">
              {
                props.loginedId == null
                ? null
                : <div>
                    <Link className="navbar-link text-white fw-bold fs-5 text-decoration-none" to="/post/create">글 등록</Link>
                    <Link className="navbar-link text-white fw-bold fs-5 ms-3 text-decoration-none" to="/post/my-list">등록한 글</Link>
                    <Link className="navbar-link text-white fw-bold fs-5 ms-3 text-decoration-none" to="/post/sub/list">제출한 글</Link>
                  </div>
              }
            </ul>
              {
                props.loginedId == null
                ? <div>
                    <Link className="navbar-link text-white fw-bold fs-5 text-decoration-none" to="/login">로그인</Link>
                    <Link className="navbar-link text-white fw-bold fs-5 ms-3 text-decoration-none" to="/user/create">회원가입</Link>
                  </div>
                : <div>
                    <span className="navbar-link text-white fw-bold fs-5 ms-3" onClick={handleLogoutClick}>로그아웃</span>
                  </div>
              }
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;