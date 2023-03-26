import { Box, Flex, Image, Link, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const Friends = [
  {
    name: "Bill Gates",
    link: "/u/bill",
    image:
      "https://www.pricepony.com.ph/blog/wp-content/uploads/2017/09/xVAFH9ZH.jpg",
  },
  {
    name: "Elon Musk",
    link: "/u/elon",
    image:
      "https://s3-us-west-1.amazonaws.com/upload.comparably.com/7640/companies/7640/people/ceo_1667591757618.jpg",
  },
  {
    name: "Mark Zuckerberg",
    link: "/u/mark",
    image:
      "https://cdn.openart.ai/stable_diffusion/16a4bf65b4b4bde66fe83b8af44a0b03e7865a8a_2000x2000.webp",
  },
  {
    name: "Jeff Bezos",
    link: "/u/jeff",
    image:
      "https://alumnimagazine.insead.edu/files/2017/07/512px-Jeff_Bezos_iconic_laugh_crop-pft85q.jpg",
  },
];

const Rightbar = () => {
  return (
    <Box w={60} pos="absolute" top={24} mr={4} right={0}>
      <RightbarContent display={{ base: "none", xl: "block" }} rounded="lg" />
    </Box>
  );
};

const RightbarContent = ({ ...rest }) => {
  return (
    <Box bg="white" w={60} h="auto" {...rest} pos="fixed">
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl">Friends</Text>
      </Flex>
      <VStack spacing={4}>
        {Friends.map((link) => (
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
          <Image src={image} alt={name} rounded="full" w={10} h={10} mr="4" />
        )}
        {name}
      </Flex>
    </Link>
  );
};

export default Rightbar;
