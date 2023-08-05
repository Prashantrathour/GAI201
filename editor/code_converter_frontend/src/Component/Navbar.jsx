import { Box, Flex, Spacer, Link, Button, chakra, Image, IconButton, Menu, MenuButton, MenuList, MenuItem, useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon } from '@chakra-ui/icons';
import { motion } from "framer-motion"; // Import the motion component for animations

const MotionFlex = motion(Flex); // Wrap Flex with motion to enable animations

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="blue.500" px={4}>
      <MotionFlex
        alignItems="center"
        maxW="1200px"
        mx="auto"
        py={4}
        initial={{ opacity: 0, y: -20 }} // Initial animation state
        animate={{ opacity: 1, y: 0 }} // Final animation state
        transition={{ duration: 0.6 }} // Animation duration
      >
        <chakra.a href="#" display="flex" alignItems="center">
          <Image src="https://th.bing.com/th/id/OIP.cy-wntq4jbDPeD4wt9lf1AHaHa?w=175&h=180&c=7&r=0&o=5&pid=1.7" alt="Code Editor Logo" w={8} h={8} mr={2} />
          <chakra.h2 fontWeight="bold" fontSize="xl">
            Code Editor
          </chakra.h2>
        </chakra.a>
        <Spacer />
      
        {/* Only display the hamburger menu on smaller screens */}
        <Box display={{ base: "block", md: "none" }}>
          <Menu>
            <MenuButton as={IconButton} icon={<HamburgerIcon />} variant="outline" />
            <MenuList>
              <MenuItem>
                <Link color="blue.600" href="#">
                  Home
                </Link>
              </MenuItem>
              <MenuItem>
                <Link color="blue.600" href="#">
                  About
                </Link>
              </MenuItem>
              <MenuItem>
                <Link color="blue.600" href="#">
                  Contact
                </Link>
              </MenuItem>
              {/* Add more menu items as needed */}
            </MenuList>
          </Menu>
        </Box>
      </MotionFlex>
    </Box>
  );
};

export default Navbar;
