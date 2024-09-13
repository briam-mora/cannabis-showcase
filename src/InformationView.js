import React from "react";
import { Flex, Box, Grid, Heading, Tag, Text } from '@chakra-ui/react';

function InformationView() {
  return (
    <Flex position="fixed" w="100%" h="100%" p={6} marginTop="10vh" padding="5%" mx="auto" color="white" pointerEvents="none">
      {/* Layout using Grid */}
      <Grid templateColumns="1fr 1fr" gap={6}>
        {/* Image */}
        <div></div>
        {/* Text Section */}
        <Flex flexDir="column" alignItems="start" justifyContent="flex-start" paddingRight="30%">
          <Heading fontSize="sm" fontWeight="bold" color="#AAAAAA" className="quicksand-bold" pb="1em">
            710Labs
          </Heading>
          <Heading className="oswald-bold" fontSize="2xl" mb={4} textAlign="left" pb="1em">
            Lemon Tart Pucker #1 <br/> Half (14g)
          </Heading>

          {/* Tags for Flower and Hybrid */}
          <Box mb={4} pb="1em">
            <Tag mr={2} bg="#313131" className="quicksand-bold" color="#AAAAAA">
              Flower
            </Tag>
            <Tag bg="#313131" className="quicksand-bold" color="#AAAAAA">Hybrid</Tag>
          </Box>

          {/* THC and Description */}
          <Text fontWeight="bold" pb="1em">
            THC: 25.7%
          </Text>
          <Text className="quicksand-regular" fontSize="sm" textAlign="left" pb="1em">
            Lemon Tart is a Sativa-dominant hybrid weed strain made from a genetic cross
            between Wedding Cake and Super Lemon Haze.
          </Text>
          <Text className="quicksand-regular" fontSize="sm" mt={4} textAlign="left" pb="1em">
            A nice dense lemon bud that we all love to smoke with an uplifting, on-the-go high.
          </Text>
        </Flex>
      </Grid>
    </Flex>
  );
}

export default InformationView;
