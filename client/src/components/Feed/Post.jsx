import { Avatar, Box, HStack, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  return (
    <Box bg="white" border="1px solid" borderColor="gray.200" p={4}>
      <HStack
        as={Link}
        to={`/u/${post.user}`}
        spacing={4}
        alignItems="center"
        borderBottom="1px solid"
        borderColor="gray.200"
        pb={4}
        mb={4}
      >
        <Avatar name="Mohamed Essam" size="md" />
        <Text fontSize="lg" color="gray.600">
          {post.user}
        </Text>
      </HStack>
      <Text fontSize="xl" color="gray.600" mb={2}>
        {post.text}
      </Text>
      <Box maxH="700px" overflow="hidden">
        <Image src={post.image} alt={post.text} />
      </Box>
    </Box>
  );
};

export default Post;
