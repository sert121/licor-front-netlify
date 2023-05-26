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
    Collapse,
    CardFooter,
    CardHeader,
    CardBody
  } from '@chakra-ui/react';
  

import { Link as ExtLink} from "@chakra-ui/react";
import { motion } from "framer-motion";

  export default function SearchResultCard({title_text,summary_text, body_text, badge_text,url, badge_color }) {
    
    const [isExpanded, setIsExpanded] = React.useState(false);
    const handleToggle = () => setIsExpanded(!isExpanded)
    return (
        <>
        <Card  backdropFilter="blur(5px)" size={'md'} as={motion.div}  variant={'outline'} whileHover={{ scale: 1.05 }}  transition='0.1s linear' animate={{y:-20}}>
            <CardHeader paddingBottom={0}>
                <HStack> <Heading size='md'> Result </Heading> <Badge  fontSize={'0.8em'} variant={'subtle'} colorScheme='pink'>{badge_text}</Badge></HStack>
     
            </CardHeader>
        <CardBody margin={0}>
            <Stack margin={0}>
                <Collapse startingHeight={30} in={isExpanded}>
                <Text align={'left'}> 
                    {summary_text}
                </Text>
                </Collapse>
            </Stack>
        </CardBody>

        <CardFooter paddingTop={0}>
            <HStack>
                <HStack>
                <Button onClick={handleToggle} colorScheme='purple' size={'sm'} variant='outline'> Show {isExpanded ? 'Less' : 'More'}</Button>
                {/* <Button size={'sm'}  colorScheme='purple' variant='ghost'> Preview Document </Button> */}
                <ExtLink href={url} isExternal> <Button colorScheme='blue' size={'sm'} variant='outline'> Preview </Button></ExtLink>
                </HStack>
            </HStack>
        </CardFooter>
        </Card>
    </>
    );
}