import {
  Avatar,
  Box,
  Flex,
  HStack,
  IconButton,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { MdOutlineInsertComment } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setPost } from "../../state";

const Post = ({ post, user, setShowPreview, setPreviewSrc }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state.user.id);
  const isLiked = Boolean(post.likes[userId]);
  const likeCount = Object.keys(post.likes).length;
  const date = moment(post.createdAt).fromNow();
  const toast = useToast();

  const likePost = async () => {
    await axios
      .patch(
        `http://localhost:7096/posts/${post._id}/like`,
        { userId: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const updatedPost = res?.data;
        dispatch(setPost({ post: updatedPost }));
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Error, try again later!",
          status: "error",
          isClosable: true,
          duration: 3000,
          position: "top",
        });
      });
  };

  return (
    <Box
      w={{ base: "xs", sm: "md", md: "xl", lg: "2xl", xl: "3xl" }}
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      p={4}
      rounded="lg"
    >
      <HStack
        as={Link}
        to={`/u/${user.username}`}
        spacing={8}
        alignItems="center"
        borderBottom="1px solid"
        borderColor="gray.200"
        pb={4}
      >
        <Avatar
          src={user.avatarPath}
          name={`${user.firstName} ${user.lastName}`}
          size="md"
          as={Link}
          to={`/u/${user.username}`}
        />
        <VStack alignItems="start">
          <Text fontSize="lg" color="gray.600">
            {user.username}
          </Text>
          <Text fontSize="md" color="gray.500">
            {date}
          </Text>
        </VStack>
      </HStack>
      <Text fontSize="xl" color="gray.600" my={6}>
        {post.text.slice(0, 300)}{" "}
        {post.text.length > 300 && (
          <Text as={span} cursor="pointer" color="gray.400" display="inline">
            show more...
          </Text>
        )}
      </Text>
      <Box maxH="700px" overflow="hidden" rounded="lg">
        <LazyLoadImage
          onClick={(e) => {
            setShowPreview(true);
            setPreviewSrc(e.target.getAttribute("src"));
          }}
          effect="blur"
          src={`http://localhost:7096/assets/${post.imagePath}`}
          alt={post.text}
          style={{
            cursor: "pointer",
            objectFit: "cover",
          }}
          width="100%"
          height="24rem"
        />
      </Box>
      <Flex justifyContent="space-between" mt={8}>
        <IconButton
          as={HStack}
          gap={4}
          onClick={likePost}
          bg="transparent"
          color="purple.600"
          cursor="pointer"
        >
          {isLiked ? (
            <>
              <IoHeart size={30} />
              <Text fontSize="xl">{likeCount}</Text>
            </>
          ) : (
            <>
              <IoHeartOutline size={30} />
              <Text fontSize="xl">{likeCount}</Text>
            </>
          )}
        </IconButton>
        <IconButton bg="transparent" color="gray.500">
          {/* <IoMessage size={30} /> */}
          <MdOutlineInsertComment size={30} />
        </IconButton>
      </Flex>
    </Box>
  );
};

export default Post;
