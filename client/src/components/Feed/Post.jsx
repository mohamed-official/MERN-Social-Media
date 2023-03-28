import { Avatar, Box, HStack, Text, VStack } from "@chakra-ui/react";
import moment from "moment";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

const Post = ({ post, user, setShowPreview, setPreviewSrc }) => {
  const date = moment(post.createdAt).fromNow();

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
        mb={4}
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
      <Text fontSize="xl" color="gray.600" mb={2}>
        {post.text}
      </Text>
      <Box maxH="700px" overflow="hidden">
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
            borderRadius: "0.5rem",
          }}
          width="100%"
          height="24rem"
        />
      </Box>
    </Box>
  );
};

export default Post;
