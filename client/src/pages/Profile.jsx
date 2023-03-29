import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Feed from "../components/Feed";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const { id } = useParams();
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    await axios
      .get(`http://localhost:7096/posts/${id}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPosts(res?.data);
      });
  };

  const getUser = async () => {
    await axios
      .get(`http://localhost:7096/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res?.data);
      });
  };

  useEffect(() => {
    getPosts();
    getUser();
  }, []);

  return (
    <>
      <VStack mb={16}>
        <Box
          w={{ base: "xs", sm: "md", md: "xl", lg: "2xl", xl: "3xl" }}
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          px={8}
          py={4}
          rounded="lg"
        >
          <Flex justifyContent="space-between">
            <HStack spacing={{ base: 4, md: 8 }}>
              <Avatar
                src={user?.avatarPath}
                name={`${user?.firstName} ${user?.lastName}`}
                size="lg"
                cursor="pointer"
              />
              <Box>
                <Text fontSize="lg" color="gray.600">
                  {user?.username}
                </Text>
              </Box>
            </HStack>
            <HStack spacing={{ base: 4, md: 8 }}>
              <Button
                size={{ base: "sm", md: "md" }}
                bg="purple.600"
                colorScheme="purple"
                variant="solid"
                display={{ base: "none", md: "flex" }}
              >
                {user?.friends?.length} Friends
              </Button>
              <Button
                size={{ base: "sm", md: "md" }}
                bg="purple.600"
                colorScheme="purple"
                variant="solid"
              >
                {posts?.length} Posts
              </Button>
            </HStack>
          </Flex>
        </Box>
      </VStack>
      {posts.length > 0 ? (
        <Feed posts={posts} />
      ) : (
        <Text mt={8} fontSize="2xl" textAlign="center">
          This user has no posts!
        </Text>
      )}
    </>
  );
};

export default Profile;
