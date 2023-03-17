import { Box, Flex, Image, Link, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const communities = [
  {
    name: "React",
    link: "/c/react",
    image:
      "https://i0.wp.com/www.primefaces.org/wp-content/uploads/2017/09/feature-react.png?ssl=1",
  },
  {
    name: "Javascript",
    link: "c/javascript",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTab05l3ndGtZqyqxgTeOkmB7g2eDGyYrQp60gRu108tIEXOLQTl8tf9Jpx90UiNJEIv1Q&usqp=CAU",
  },
  {
    name: "Linux",
    link: "/c/linux",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/800px-Tux.svg.png",
  },
  {
    name: "Pop!_OS",
    link: "/c/pop_os",
    image: "https://pop.system76.com/icon-512.png",
  },
  {
    name: "Arch Linux",
    link: "/c/arch",
    image:
      "https://cdn0.iconfinder.com/data/icons/flat-round-system/512/archlinux-512.png",
  },
];

const Rightbar = () => {
  return (
    <Box w={60} mt={16} pos="absolute" zIndex={9999} right={0}>
      <RightbarContent display={{ base: "none", lg: "block" }} />
    </Box>
  );
};

const RightbarContent = ({ ...rest }) => {
  return (
    <Box
      bg="white"
      borderTop="1px"
      borderLeft="1px"
      borderColor="gray.200"
      w={60}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl">Communities</Text>
      </Flex>
      <VStack spacing={4}>
        {communities.map((link) => (
          <NavItem
            key={link.name}
            name={link.name}
            link={link.link}
            image={link.image}
          />
        ))}
      </VStack>
    </Box>
  );
};

const NavItem = ({ name, link, image }) => {
  return (
    <Link
      as={RouterLink}
      to={link}
      w="full"
      href={link}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "purple.500",
          color: "white",
        }}
      >
        {image && (
          <Image src={image} alt={name} rounded="full" w={8} h={8} mr="4" />
        )}
        {name}
      </Flex>
    </Link>
  );
};

export default Rightbar;
