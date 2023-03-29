import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  IoChevronDown,
  IoClose,
  IoHome,
  IoLogOutOutline,
  IoMenu,
  IoNotifications,
  IoPeople,
  IoPersonCircleOutline,
  IoSettings,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { setLogout } from "../../../state";
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
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

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
          {user ? (
            <Flex alignItems="center">
              <Menu>
                <MenuButton
                  as={Button}
                  bg={"transparent"}
                  _hover={{ bg: "transparent" }}
                  _active={{ bg: "transparent" }}
                  cursor="pointer"
                  rightIcon={<IoChevronDown />}
                >
                  <HStack spacing={4} alignItems="center">
                    <Avatar
                      src={user?.avatarPath}
                      name={`${user?.firstName} ${user?.lastName}`}
                      size="md"
                    />
                    <Text>
                      {user?.firstName} {user?.lastName}
                    </Text>
                  </HStack>
                </MenuButton>
                <MenuList>
                  <MenuItem
                    as={RouterLink}
                    to={`/u/${user?._id}`}
                    icon={<IoPersonCircleOutline size={25} />}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem icon={<IoSettings size={25} />}>Settings</MenuItem>
                  <MenuDivider />
                  <MenuItem
                    onClick={() => dispatch(setLogout())}
                    icon={<IoLogOutOutline size={25} />}
                    color="red.500"
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          ) : (
            <HStack>
              <Button
                bg="purple.600"
                colorScheme="purple"
                variant="solid"
                as={RouterLink}
                to="/login"
              >
                Login
              </Button>
              <Button
                bg="purple.600"
                colorScheme="purple"
                variant="solid"
                as={RouterLink}
                to="/register"
              >
                Register
              </Button>
            </HStack>
          )}
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
