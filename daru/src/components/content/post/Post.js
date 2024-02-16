import PostList from "./list/PostList";
import PostCreateContainer from "../../../containers/content/post/create/PostCreateContainer";
import PostDetailContainer from "../../../containers/content/post/detail/PostDetailContainer";
import ReqDocSubmitContainer from "../../../containers/content/post/reqDoc/submit/ReqDocSubmitContainer";
import MyPostListContainer from "../../../containers/content/post/list/myPost/MyPostListContainer";
import SubPostListContainer from "../../../containers/content/post/list/subPost/SubPostListContainer";
import SubDocListContainer from "../../../containers/content/post/subDoc/list/SubDocListContainer";
import { Routes, Route } from 'react-router-dom';

function Post() {
  return (
    <div className="Post">
      <Routes>
        <Route exact path="/post/create" element={<PostCreateContainer />} />
        <Route exact path="/post/:postId/detail" element={<PostDetailContainer />} />
        <Route exact path="/post/:postId/req-doc/submit" element={<ReqDocSubmitContainer />} />
        <Route exact path="/post/my-list" element={<MyPostListContainer />} />
        <Route exact path="/post/sub/list" element={<SubPostListContainer />} />
        <Route exact path="/post/:postId/sub-doc/list" element={<SubDocListContainer />} />
        <Route path="/" element={<PostList />} />
      </Routes>
    </div>
  );
}

export default Post;