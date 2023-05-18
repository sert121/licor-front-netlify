import {
    Box,
    Heading,
    Container,
    Text,
    Button,
    Badge,
    HStack,
    Stack,
    Icon,
    useColorModeValue,
    createIcon,
    Card,
    Input,
    CardFooter,
    CardHeader,
    Divider,
    Collapse,
    CardBody
  } from '@chakra-ui/react';
  
// import react

import { Link as ExtLink} from "@chakra-ui/react";

import React from 'react';
//   import motion from framer
import { motion } from "framer-motion";
import ModalCard from './Modal';


  export default function SearchMainCard({heading_text,number,summary_text, body_text,url, badge_text  }) {

    const [isExpanded, setIsExpanded] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false)
    const [preview, setPreview] = React.useState(false)

    let defaultState = {
        y:-20,
        scale:1,
    }
    let transformedState = {
        scale: [1, 2],
        borderRadius: ["0%", "10%"]
    }

    const handleToggle = () => setIsExpanded(!isExpanded)
    const handlePreview = () => setPreview(!preview)

    const handleClick = (e) => {
        e.preventDefault();
        setIsExpanded(!isExpanded);
        setModalVisible(!modalVisible)
    }
    return (
        <>
            <Card size={'lg'} as={motion.div} transition='0.1s linear' animate={{y:-20}}>
                <CardHeader paddingBottom={0}>
                    <HStack> 
                        <Heading size='md'>Result</Heading> <Badge  fontSize={'0.8em'} variant={'subtle'} colorScheme='pink'>{badge_text}</Badge></HStack>
         
                </CardHeader>
            <CardBody margin={0}>
                <Stack margin={0}>
                <Text paddingBottom={2} align={'left'}>
                    <Collapse startingHeight={20} in={isExpanded}>
                    {summary_text}
                </Collapse>

                </Text>
                {preview &&
                            <>
                        <Divider></Divider>
                            {/* <Badge> Source</Badge> */}
                            <Heading paddingTop={2} size='xs' color={'blue.300'} align={'left'}> Preview</Heading>
                            <Text  align={'left'}>
                            {body_text}
                           </Text>
                        </>
                    }

                </Stack>
            </CardBody>
            <CardFooter paddingTop={0}>
                <HStack>
                    <HStack>

                    <Button size={'sm'} onClick={handleToggle} colorScheme='blue' variant='ghost'> Show {isExpanded ? 'Less' : 'More'} </Button>
                    {/* <Button onClick={handlePreview} colorScheme='blue' size={'sm'} variant='outline'> { preview ?  'Hide Source' : 'Preview Source'} </Button> */}
                    <ExtLink href={url} isExternal> <Button colorScheme='blue' size={'sm'} variant='outline'> Preview </Button></ExtLink>
                    </HStack>
                    {/* <HStack>
                        <Button size={'sm'}  colorScheme='purple' variant='ghost' onClick={handleClick}> Expand </Button>
                    </HStack> */}
                </HStack>
            </CardFooter>
            </Card>
   
        </>
    );
  }