import { Container as ChakraContainer } from "@chakra-ui/react";

const Container = ({ children }) => {
  return (
    <ChakraContainer maxW="1536px" px={0} pos="relative">
      {children}
    </ChakraContainer>
  );
};

export default Container;
