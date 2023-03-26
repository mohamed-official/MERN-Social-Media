import {
  FormControl as ChakraFormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";

const FormControl = ({
  type,
  label,
  placeholder = "",
  error,
  errorMsg,
  ...rest
}) => {
  return (
    <ChakraFormControl isInvalid={error}>
      <FormLabel>{label}</FormLabel>
      <Input type={type} placeholder={placeholder} {...rest} bg="white" />
      {error && <FormErrorMessage>{errorMsg}</FormErrorMessage>}
    </ChakraFormControl>
  );
};

export default FormControl;
