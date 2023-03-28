import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  VStack,
} from "@chakra-ui/react";
import { IoIosPaperPlane } from "react-icons/io";
import { RiImage2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NewPost = () => {
  const user = useSelector((state) => state.user);

  return (
    <VStack
      spacing={16}
      w={{ base: "xs", sm: "md", md: "xl", lg: "2xl", xl: "3xl" }}
    >
      <Box
        w="full"
        rounded="lg"
        bg="white"
        border="1px solid"
        borderColor="gray.200"
        p={4}
      >
        <HStack
          justifyContent="space-between"
          spacing={16}
          borderBottom="1px solid"
          borderColor="gray.100"
          pb={4}
          mb={4}
        >
          <Avatar
            src={user?.avatarPath}
            name={`${user?.firstName} ${user?.lastName}`}
            size="md"
            as={Link}
            to={`/u/${user?.username}`}
          />
          <Input w="90%" placeholder="What're you thinking about?" />
        </HStack>
        <Flex justifyContent="space-between" alignItems="center">
          <IconButton bg="transparent">
            <Icon
              as={RiImage2Fill}
              color="purple.600"
              fontSize={36}
              cursor="pointer"
            />
          </IconButton>
          <Button
            gap={4}
            bg="purple.600"
            colorScheme="purple"
            variant="solid"
            w={36}
          >
            Share
            <Icon as={IoIosPaperPlane} fontSize={20} />
          </Button>
        </Flex>
      </Box>
    </VStack>
  );
};

export default NewPost;
