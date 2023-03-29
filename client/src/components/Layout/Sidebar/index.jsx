import { Box, Flex, Icon, Link, VStack } from "@chakra-ui/react";
import React from "react";
import {
  FiCompass,
  FiHome,
  FiSettings,
  FiStar,
  FiTrendingUp,
} from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";

const LinkItems = [
  { name: "Home", link: "/", icon: FiHome },
  { name: "Trending", link: "trending", icon: FiTrendingUp },
  { name: "Explore", link: "explore", icon: FiCompass },
  { name: "Favorites", link: "favorites", icon: FiStar },
  { name: "Settings", link: "settings", icon: FiSettings },
];

const Sidebar = () => {
  return (
    <Box w={60} pos="fixed" top={24} ml={4}>
      <SidebarContent display={{ base: "none", lg: "block" }} rounded="lg" />
    </Box>
  );
};

const SidebarContent = ({ ...rest }) => {
  return (
    <Box bg="white" w={60} h="full" {...rest}>
      <VStack spacing={4} py={8}>
        {LinkItems.map((link) => (
          <NavItem
            key={link.name}
            name={link.name}
            link={link.link}
            icon={link.icon}
          />
        ))}
      </VStack>
    </Box>
  );
};

const NavItem = ({ name, link, icon, ...rest }) => {
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
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {name}
      </Flex>
    </Link>
  );
};

export default Sidebar;
