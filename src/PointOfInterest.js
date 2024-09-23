import React from "react";
import { Flex, Text } from '@chakra-ui/react';

function PointOfInterest({id, className, label, text}) {
  return (
    <Flex id={id} className={"point-of-interest " + className} zIndex="2">
        <Text 
            className="oswald-bold label" 
            backgroundColor="#313131AA" 
            position="absolute"
            width="40px"
            height="40px"
            color="#AAAAAA" 
            borderRadius="50%"
            textAlign="center"
            lineHeight="40px"
            fontSize="sm"
            transform="translate(-50%, -50%)"
            cursor="help"
        >{label}</Text>
        <Text
            className="quicksand-regular text" 
            position="absolute"
            backgroundColor="#313131"
            color="#AAAAAA" 
            borderRadius="10px"
            padding="5px"
            width="max-content"
            maxWidth="200px"
            top="30px"
            transform="translate(-50%, 0%)"
            fontSize="sm"
            opacity="0"
            pointerEvents="none"
        >{text}</Text>
    </Flex>
  );
}

export default PointOfInterest;
