import { Box, IconButton, Image } from "@chakra-ui/react";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";

const FullScreenImage = ({ src, setShowPreview }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.keyCode === 27) {
        setShowPreview(false);
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <Box
      width="100vw"
      height="100vh"
      zIndex={999}
      pos="fixed"
      top="0"
      left="0"
      bg="#80808091"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box pos="absolute" top={10} right={10}>
        <IconButton
          bg="white"
          cursor="pointer"
          color="red.600"
          onClick={() => setShowPreview(false)}
        >
          <IoClose size={30} />
        </IconButton>
      </Box>
      <Image
        src={src}
        w="60%"
        h="60%"
        objectFit="cover"
        rounded="lg"
        width={{
          base: "20rem",
          sm: "28rem",
          md: "36rem",
          xl: "40rem",
        }}
        height={{
          base: "20rem",
          sm: "28rem",
          md: "36rem",
          xl: "40rem",
        }}
      />
    </Box>
  );
};

export default FullScreenImage;
