
import {
    Box,
    Heading,
    Container,
    Text,
    Button,
    Stack,
    Icon,
    useColorModeValue,
    createIcon,
    Grid,
    Spacer,
    Input,
  } from '@chakra-ui/react';
import React from 'react';
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom';


import { useToast } from '@chakra-ui/react'
import axiosInstance from '../axios';

export default function UploadStuff() {
      const toast = useToast()

    let REACT_APP_NOTION_AUTH_URL = process.env.REACT_APP_NOTION_AUTH_URL;
    const [file, setFile] = React.useState();

    const handleFileChange = (e) => {
      if (e.target.files) {
        setFile(e.target.files[0]);
        console.log('bhai')
        console.log(e.target.files[0])
      }
    };
  

    const handleSubmitFile = (e) => {
      e.preventDefault();
      
      let postData = new FormData();
      postData.append('uploaded_file', file);
      postData.append('collection_name', 'default_collection');
      axiosInstance.post(`/api/add_docs`, postData)
      .then((res) => {		
        console.log(res.data);   
        toast({
          title: 'Uploaded Successfully',
          description: "We've added the document to our index.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        setFile('')
        // history.push('/')
      });
    }


    return (
        <Grid p={5} gap={0} templateColumns="repeat(auto-fit, minmax(350px, 1fr))">
        <Stack spacing={6} direction={'row'} justifyContent="center" alignItems="space-around">
          <Box
            backgroundColor="white"
            boxShadow="md"
            borderRadius="md"
            p={26}
            flexDirection="column"
            display="flex"
            justifyContent="center"
            width="100%"
            height="20vh"
            alignItems="space-between"
          >
            <Text fontSize="md" fontWeight="bold" color="blue.800" pb={2}>
                Add Local Notes
            </Text>
            <Input type={'file'} borderWidth={'0em'} p={2} pb={8} onChange={handleFileChange}></Input>
            <Button onClick={handleSubmitFile} p={2} mt={4} variant="solid" size="md">
              Embed
            </Button>
          </Box>

          <Box
            backgroundColor="white"
            boxShadow="md"
            borderRadius="md"
            p={26}
            flexDirection="column"
            display="flex"
            justifyContent="center"
            width="100%"
            height="20vh"
            alignItems="space-between"
          >
            <Text fontSize="md" fontWeight="bold" color="blue.700" pb={2}>
                Integrate Notion
            </Text>
            <Link href={REACT_APP_NOTION_AUTH_URL} isExternal>
                Opt-in <ExternalLinkIcon mx='2px' />
            </Link>
          </Box>


        </Stack>
        
      </Grid>
      )
    }
