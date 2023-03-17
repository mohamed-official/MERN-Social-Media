import {
  Avatar,
  Box,
  Flex,
  HStack,
  IconButton,
  Link,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  IoClose,
  IoHome,
  IoMenu,
  IoNotifications,
  IoPeople,
} from "react-icons/io5";
import { Link as RouterLink } from "react-router-dom";
import Container from "../Container";

const Links = [
  { icon: <IoHome />, link: "/", text: "Home" },
  { icon: <IoNotifications />, link: "/", text: "Notifications" },
  { icon: <IoPeople />, link: "/", text: "Groups" },
];

const NavLink = ({ link, icon, text, type }) =>
  type == "mobile" ? (
    <Link as={RouterLink} to={link} fontSize="md">
      {text}
    </Link>
  ) : (
    <IconButton bg="transparent" _hover={{ bg: "gray.200" }}>
      <Link as={RouterLink} to={link} color="purple.600" fontSize="2xl">
        {icon}
      </Link>
    </IconButton>
  );

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      w="full"
      h={16}
      bg="white"
      zIndex={999}
      px={4}
      position="fixed"
      shadow="md"
    >
      <Container>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <IconButton
            size="md"
            icon={
              isOpen ? <IoClose size={20} color="red" /> : <IoMenu size={20} />
            }
            aria-label="Open Menu"
            display={{ base: "flex", md: "none" }}
            justifyContent="center"
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack
            spacing={8}
            alignItems="center"
            display={{ base: "none", md: "flex" }}
          >
            <Link
              as={RouterLink}
              to="/"
              fontWeight="bold"
              fontSize="xl"
              style={{ textDecoration: "none" }}
            >
              FakeBook
            </Link>
          </HStack>
          <HStack as="nav" spacing={12} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavLink
                key={link.text}
                link={link.link}
                icon={link.icon}
                type="not mobile"
              />
            ))}
          </HStack>
          <HStack
            as={RouterLink}
            to={"/u/mohamed"}
            spacing={4}
            alignItems="center"
          >
            <Avatar name="Mohamed Essam" size="md" />
            <Text>Mohamed Essam</Text>
          </HStack>
        </Flex>

        {isOpen ? (
          <Box bg="white" shadow="sm" w="100%" pb={4} display={{ md: "none" }}>
            <Stack as="nav" spacing={4}>
              {Links.map((link) => (
                <NavLink
                  key={link.link}
                  link={link.link}
                  text={link.text}
                  type="mobile"
                />
              ))}
            </Stack>
          </Box>
        ) : null}
      </Container>
    </Box>
  );
};

export default Navbar;
