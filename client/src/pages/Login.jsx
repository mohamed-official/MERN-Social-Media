import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import LoginImage from "../assets/Login.svg";
import FormControl from "../components/Auth/FormControl";
import { setLogin } from "../state";

const loginSchema = yup.object().shape({
  email: yup.string().required("Email's required.").email("Invalid email."),
  password: yup.string().required("Password's required."),
});

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  const handleLogin = async (values, { resetForm }) => {
    await axios
      .post("http://localhost:7096/auth/login", {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        if (res.status == 200) {
          resetForm();
          dispatch(
            setLogin({
              user: res?.data?.user,
              token: res?.data?.token,
            })
          );
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        if (error?.response?.data?.error) {
          toast({
            title: error?.response?.data?.error,
            status: "error",
            duration: 3000,
            position: "top",
            isClosable: true,
          });
        }
      });
  };

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
          src={LoginImage}
          w={{ base: "sm", xl: "lg" }}
        />
      </Flex>
      <Flex p={8} flex={1} align="center" justify="center">
        <Formik
          onSubmit={handleLogin}
          initialValues={initialValues}
          validationSchema={loginSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Stack spacing={4} w="full" maxW="md">
                <Heading fontSize="2xl" mb="4" textAlign="center">
                  Welcome Back!
                </Heading>
                <FormControl
                  type="email"
                  label="Email Address"
                  placeholder="user@email.com"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={
                    Boolean(touched.email) && Boolean(errors.email) && true
                  }
                  errorMsg={Boolean(touched.email) && errors.email}
                />
                <Box position="relative">
                  <FormControl
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    placeholder="password1234"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={
                      Boolean(touched.password) &&
                      Boolean(errors.password) &&
                      true
                    }
                    errorMsg={Boolean(touched.password) && errors.password}
                  />
                  <Box
                    position="absolute"
                    zIndex={999}
                    cursor="pointer"
                    right={4}
                    top={10}
                    onClick={() => setShowPassword((prevState) => !prevState)}
                  >
                    {showPassword ? (
                      <IoEyeOff size={20} />
                    ) : (
                      <IoEye size={20} />
                    )}
                  </Box>
                </Box>
                <Stack spacing={6}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align="start"
                    justify="space-between"
                  >
                    <Checkbox>Remember me</Checkbox>
                    <Link color="blue.500">Forgot password?</Link>
                  </Stack>
                  <Text>
                    Don't have an account?
                    <Link as={RouterLink} color="blue.500" to="/register">
                      {" "}
                      Register
                    </Link>
                  </Text>
                  <Button
                    type="submit"
                    bg="purple.600"
                    colorScheme="purple"
                    variant="solid"
                  >
                    Login
                  </Button>
                </Stack>
              </Stack>
            </form>
          )}
        </Formik>
      </Flex>
    </Stack>
  );
};

export default Login;
