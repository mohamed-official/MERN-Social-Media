import {
  Button,
  Checkbox,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import RegisterImage from "../assets/Register.svg";
import FormControl from "../components/auth/FormControl.jsx";

const Login = () => {
  return (
    <Stack minH="100vh" direction="row" maxW="1536px" mx="auto">
      <Flex
        maxW="1440px"
        flex={1}
        justifyContent="center"
        display={{ base: "none", lg: "flex" }}
      >
        <Image
          alt="Login Image"
          src={RegisterImage}
          w={{ base: "sm", xl: "lg" }}
        />
      </Flex>
      <Flex p={8} flex={1} align="center" justify="center">
        <Stack spacing={4} w="full" maxW="md">
          <Heading fontSize="2xl" mb="4" textAlign="center">
            Welcome Back!
          </Heading>
          <FormControl
            type="email"
            label="Email Address"
            placeholder="user@email.com"
          />
          <FormControl type="text" label="Username" placeholder="user" />
          <FormControl
            type="password"
            label="Password"
            placeholder="password1234"
          />
          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align="start"
              justify="space-between"
            >
              <Checkbox>Remember me</Checkbox>
            </Stack>
            <Text>
              Already have an account?
              <Link as={RouterLink} color="blue.500" to="/login">
                {" "}
                Login
              </Link>
            </Text>
            <Button bg="purple.600" colorScheme="purple" variant="solid">
              Register
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default Login;
