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
import Dropzone from "react-dropzone";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import RegisterImage from "../assets/Register.svg";
import FormControl from "../components/auth/FormControl.jsx";

const passwordValidation = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[a-zA-Z]).{8,}$/;

const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name's required.")
    .min(2, "First name must be at least 2 characters.")
    .max(20, "First name must be at most 20 characters."),
  lastName: yup
    .string()
    .required("Last name's required.")
    .min(2, "Last name must be at least 2 characters.")
    .max(20, "Last name must be at most 20 characters."),
  username: yup
    .string()
    .required("Username's required.")
    .min(3, "Username must be at least 3 characters.")
    .max(20, "Username must be at most 20 characters."),
  email: yup.string().required("Email's required.").email("Invalid email."),
  password: yup
    .string()
    .required("Password's required.")
    .min(8, "Password must be at least 8 characters.")
    .max(50, "Password must be at most 50 characters.")
    .matches(
      passwordValidation,
      "Password must contains at least 1 letter and 1 password."
    ),
  avatar: yup.string(),
});

const initialValues = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  avatar: "",
};

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  const handleRegister = async (values, { resetForm }) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.avatar.name);

    await axios
      .post("http://localhost:7096/auth/register", formData)
      .then((res) => {
        if (res.status == 201) resetForm();
        navigate("/login");
      })
      .catch((error) => {
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
          src={RegisterImage}
          w={{ base: "sm", xl: "lg" }}
        />
      </Flex>
      <Flex p={8} flex={1} align="center" justify="center">
        <Formik
          onSubmit={handleRegister}
          initialValues={initialValues}
          validationSchema={registerSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <Stack spacing={4} w="full" maxW="md">
                <Heading fontSize="2xl" mb="4" textAlign="center">
                  Welcome Back!
                </Heading>
                <Flex gap={4}>
                  <FormControl
                    type="text"
                    label="First Name"
                    placeholder="First"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="firstName"
                    error={
                      Boolean(touched.firstName) &&
                      Boolean(errors.firstName) &&
                      true
                    }
                    errorMsg={Boolean(touched.firstName) && errors.firstName}
                  />
                  <FormControl
                    type="text"
                    label="Last Name"
                    placeholder="Last"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName"
                    error={
                      Boolean(touched.lastName) &&
                      Boolean(errors.lastName) &&
                      true
                    }
                    errorMsg={Boolean(touched.lastName) && errors.lastName}
                  />
                </Flex>
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
                <FormControl
                  type="text"
                  label="Username"
                  placeholder="user"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  name="username"
                  error={
                    Boolean(touched.username) &&
                    Boolean(errors.username) &&
                    true
                  }
                  errorMsg={Boolean(touched.username) && errors.username}
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
                <Box
                  border="1px solid"
                  borderColor="chakra-border-color"
                  _hover={{ borderColor: "gray.300" }}
                  bg="white"
                  rounded="md"
                  p="1rem"
                  cursor="pointer"
                >
                  <Dropzone
                    accept={{
                      "image/png": [".png"],
                      "image/jpg": [".jpg"],
                      "image/jpeg": [".jpeg"],
                    }}
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("avatar", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box {...getRootProps()}>
                        <input {...getInputProps()} />
                        {!values.avatar ? (
                          <Text textAlign="center">Upload Avatar.</Text>
                        ) : (
                          <Text textAlign="center">{values.avatar.name}</Text>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
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
                  <Button
                    type="submit"
                    bg="purple.600"
                    colorScheme="purple"
                    variant="solid"
                  >
                    Register
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

export default Register;
