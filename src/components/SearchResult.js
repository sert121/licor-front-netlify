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
    CardBody
  } from '@chakra-ui/react';
  

import { Link as ExtLink} from "@chakra-ui/react";
import { motion } from "framer-motion";

  export default function SearchResultCard({title_text,summary_text, body_text, badge_text,url, badge_color }) {
    return (
        <>
        <Card  backdropFilter="blur(5px)" size={'md'} as={motion.div}  variant={'outline'} whileHover={{ scale: 1.05 }}  transition='0.1s linear' animate={{y:-20}}>
            <CardHeader paddingBottom={0}>
                <HStack> <Heading size='md'> Result </Heading> <Badge  fontSize={'0.8em'} variant={'subtle'} colorScheme='pink'>{badge_text}</Badge></HStack>
     
            </CardHeader>
        <CardBody margin={0}>
            <Stack margin={0}>
                <Text align={'left'}> 
                    {body_text}
                </Text>
            </Stack>
        </CardBody>

        <CardFooter paddingTop={0}>
            <HStack>
                <HStack>
                <Button colorScheme='purple' size={'sm'} variant='outline'> Chat with Doc </Button>
                {/* <Button size={'sm'}  colorScheme='purple' variant='ghost'> Preview Document </Button> */}
                <ExtLink href={url} isExternal> <Button colorScheme='blue' size={'sm'} variant='outline'> Preview </Button></ExtLink>
                </HStack>
            </HStack>
        </CardFooter>
        </Card>
    </>
    );
}