import { FormControl as ChakraFormControl, FormLabel, Input  } from "@chakra-ui/react";

const FormControl = ({ type, label, placeholder = "" }) => {
  return (
    <ChakraFormControl>
      <FormLabel>{label}</FormLabel>
      <Input type={type} placeholder={placeholder} />
    </ChakraFormControl>
  );
};

export default FormControl;
