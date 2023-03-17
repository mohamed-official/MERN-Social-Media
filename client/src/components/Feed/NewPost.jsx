import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { IoIosPaperPlane } from "react-icons/io";
import { RiImage2Fill } from "react-icons/ri";

const NewPost = () => {
  return (
    <Box bg="white" py={4} px={8} rounded="lg" w="full">
      <HStack
        spacing={24}
        borderBottom="1px solid"
        borderColor="gray.100"
        pb={4}
        mb={4}
      >
        <Avatar name="Mohamed Essam" size="md" />
        <Input placeholder="What're you thinking about?" />
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
  );
};

export default NewPost;
