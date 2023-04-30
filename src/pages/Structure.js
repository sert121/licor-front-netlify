import React, { ReactNode } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import { signOut } from "supertokens-auth-react/recipe/passwordless";
import { useToast } from '@chakra-ui/react'
import axios from 'axios';


import {useSearchParams} from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

const LinkItems= [
  { name: 'Home', icon: FiHome , href: '/'},
  {name: 'Integrations', icon: FiTrendingUp, href: '/integrations'},
];

export default function SidebarWithHeader({children}) {


  let REACT_APP_NOTION_AUTH_URL = process.env.REACT_APP_NOTION_AUTH_URL;
  let [searchParams, setSearchParams] = useSearchParams()
  let navigate = useNavigate();

    React.useEffect(() => {

        const code = searchParams.get("code")
        if (code!=null && code!='' && code!=undefined)
      {
            console.log('code',code);
            let credentials = process.env.REACT_APP_NOTION_CLIENT_ID + ":" + process.env.REACT_APP_NOTION_CLIENT_SECRET;
            const encodedCredentials = Buffer.from(credentials).toString('base64');
            console.log('encodedCredentials',encodedCredentials);
            const baseURL = 'https://licorice-backend.onrender.com'
            const axiosInstance = axios.create({ 
                baseURL: baseURL,
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                }, 
            });

            axiosInstance.post(`/api/notion_code`, {
                'code': code}
                )
            .then((res) => {    
                console.log(res.data);
                toast({
                  title: 'Notion sync started successfully',
                  description: "We've added the document to our index.",
                  status: 'success',
                  duration: 4000,
                  isClosable: true,
                })
                navigate("/");

            })    
            .catch(err => {
                console.log(err)   
            });
        }

    }, [searchParams]);



  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        bg={'red.100'}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
        <SidebarContent onClose={onClose} />

        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <>
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          IndexAI
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} href={link.href}>
          {link.name}
        </NavItem>
      ))}
    </Box>
    </>
  );
};


const NavItem = ({ icon, href, children, ...rest }) => {
  return (
    <Link href={href} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'purple.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {

  async function onLogout() {
    await signOut();
    window.location.href = "/";
  }

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Logo
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://static.wikia.nocookie.net/logopedia/images/6/6f/Radioheadmodifiedbear.svg'
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">

                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              {/* <MenuItem>Profile</MenuItem> */}
              {/* <MenuItem>Settings</MenuItem> */}
              {/* <MenuDivider /> */}
              <MenuItem onClick={onLogout}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};