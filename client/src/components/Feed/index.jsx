import { VStack } from "@chakra-ui/react";
import { useState } from "react";
import FullScreenImage from "../Images/FullScreen";
import NewPost from "./NewPost";
import Post from "./Post";

const Feed = ({ posts, showNewPost = false }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [previewSrc, setPreviewSrc] = useState("");

  return (
    <>
      {showPreview && (
        <FullScreenImage src={previewSrc} setShowPreview={setShowPreview} />
      )}
      <VStack spacing={16}>
        {showNewPost && <NewPost />}
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
    </>
  );
};

export default Feed;
