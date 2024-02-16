import LoginContainer from "../../containers/content/login/LoginContainer";
import UserCreate from "./user/create/UserCreate";
import SubDocDetailContainer from "../../containers/content/subDoc/detail/SubDocDetailContainer";
import Post from './post/Post';
import { Routes, Route } from 'react-router-dom';

function Content() {
  return (
    <div className="Content">
      <Routes>
        <Route exact path="/login" element={<LoginContainer />} />
        <Route exact path="/user/create" element={<UserCreate />} />
        <Route exact path="/sub-doc/:subDocId/detail" element={<SubDocDetailContainer />} />
        <Route path="*" element={<Post />} />
      </Routes>
    </div>
  );
}

export default Content;