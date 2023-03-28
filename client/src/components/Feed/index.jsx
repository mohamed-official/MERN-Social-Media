import { Box, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import FullScreenImage from "../Images/FullScreen";
import NewPost from "./NewPost";
import Post from "./Post";

const Feed = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [previewSrc, setPreviewSrc] = useState("");
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
    <Box w="90%" mx="auto" mb={16} pl={{ base: "0px", lg: "40%", xl: "0px" }}>
      {showPreview && (
        <FullScreenImage src={previewSrc} setShowPreview={setShowPreview} />
      )}
      <VStack spacing={16}>
        <NewPost />
        {posts.map((post) => (
          <Post
            key={post._doc._id}
            post={post._doc}
            user={post.user}
            setShowPreview={setShowPreview}
            setPreviewSrc={setPreviewSrc}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default Feed;
