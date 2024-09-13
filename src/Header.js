import React, { useEffect } from "react";
import { Box, Heading } from '@chakra-ui/react';

function Header() {
  return (
    <Box zIndex="1" position="fixed" w="100vw" h="10vh" p={6} color="white" bg="black" borderColor='white' borderBottom="1px">
        <Heading className="oswald-regular" fontSize="xl" lineHeight="1.5">
            SUGARED FLOWERS
        </Heading>
    </Box>
  );
}

export default Header;
