import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Feed from "../components/Feed";
import { setPosts } from "../state";

const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    await axios
      .get("http://localhost:7096/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(setPosts({ posts: res?.data }));
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <Feed posts={posts} showNewPost={true} />
    </>
  );
};

export default Home;
