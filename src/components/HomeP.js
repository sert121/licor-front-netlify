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
  Input,
  HStack,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { IconButton } from '@chakra-ui/react'
import { AiOutlineFileSearch } from "react-icons/ai";
import axiosInstance from '../axios';
import SearchMainCard from './SearchMainCard';
import SearchResultCard from './SearchResult';
import ModalCard from './Modal';

import Card from './ChatCard'
import { SearchIcon } from '@chakra-ui/icons'
import { motion } from "framer-motion";
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

export default function HomeSearch() {

  const [searchValue, setSearchValue] = React.useState('')
  const [headerVisible, setHeaderVisible] = React.useState(true)
  const [skeletonProgress, setSkeletonProgress] = React.useState(false)

  const [cards, setCards] = React.useState([])

  const [showCards, setCardsVisible] = React.useState(false)
  const [modalVisible, setModalVisible] = React.useState(false)

  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  
 

  const show = {
    opacity: 1,
    display: "block"
  };

  const hide = {
    opacity: 0,
    transitionEnd: {
      display: "none"
    }
  };

  const static_pos = {
    y:0,
  }
  const next_pos = {
    y:-70
  }

  // .onclick handler function
//   useEffect(() => {
        
//     async function f1(){
//         const request = await axiosInstance.get(url);
//         return request;
//     }
//     f1();

//     return () => {
  
//     }
// }, [])

  function handleSubmit(e) {
    e.preventDefault();
    setSkeletonProgress(true);
    setCards([])
    console.log('The link was clicked.');
    
     
      axiosInstance
          .post(`/api/query_vec_store/`,{
            'query': searchValue,
            'collection_name': 'default_collection'
          })
          .then((res) => {
              setCards(res.data.result);
              setSkeletonProgress(false);

            })    
          .catch(err => {
              console.log(err)   
              setSkeletonProgress(false);
          });

    setHeaderVisible(false);
    setCardsVisible(true);

  }
  //  onchange handler function
  function handleChange(e) {
    e.preventDefault();
    setSearchValue(e.target.value)
  }

  function handleMainCard(e) {
    e.preventDefault();
    setModalVisible(!modalVisible)
  }

 
  return (
    <>

      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 10, md: 32 }}>
          <Heading
            fontWeight={800}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'90%'}>
            <Text as={'span'}>Search across </Text>
            <Text as={'span'} color={'purple.400'}>
              internal databases
            </Text>
          </Heading>
          {/* <Text as = {motion.div} 
                animate={headerVisible ? show : hide} color={'gray.500'}> */}
                <Text>
               Simply upload your documents and get started! We'll take care of the rest.
              </Text>

          <HStack>
          
          <Input 
                focusBorderColor='purple.400'
                placeholder="Input query"
                value={searchValue}
                onChange={handleChange}
              errorBorderColor='green' border={1} borderColor={'green.500'} variant='outline'>
            </Input>
            <IconButton aria-label='Search across databases' onClick={handleSubmit} icon={<SearchIcon />} />

          </HStack>

          <Stack
            direction={'column'}
            spacing={3}
            align={'stretch'}
            alignSelf={'stretch'}
            position={'relative'}>

              {
                skeletonProgress ?
                <>
                  <Skeleton height="40px" />
                  <Skeleton height="40px" />
                  <Skeleton height="40px" />
                </> :
                <></>

              }
  
           { (cards!==[] && cards.length > 0) ?

                <>
                  {/* <SearchMainCard
                    summary_text={"RLHF stands for Reinforcement Learning from Human Feedback. It is a type of artificial intelligence (AI) training technique that involves using feedback from human users to improve the performance of the AI system . RLHF is commonly used to train large language models, such as those used in natural language processing and machine translation. By incorporating feedback from humans, RLHF can help improve the accuracy, relevance, and overall quality of AI-generated outputs."}
                    body_text={"RLHF stands for Reinforcement Learning from Human Feedback. It is a type of artificial intelligence (AI) training technique that involves using feedback from human users to improve the performance of the AI system . RLHF is commonly used to train large language models, such as those used in natural language processing and machine translation. By incorporating feedback from humans, RLHF can help improve the accuracy, relevance, and overall quality of AI-generated outputs."}
                    url = {"https://yashmore.notion.site/RLHF-5b3788bfb4ea4e4faa037aff4f2488af"}
                    badge_text={"Notion"}
                    // badge_text={ cards[0].type=='' ? 'Local' :cards[0].type }
                    onClick={handleMainCard}
                    />
                    <SearchMainCard
                      summary_text={"DeepSpeed-HE is also aware of the full RLHF pipeline, allowing it to make optimal decisions in terms of memory management and data movement across different phases of RLHF."}
                      body_text={"DeepSpeed-HE is also aware of the full RLHF pipeline, allowing it to make optimal decisions in terms of memory management and data movement across different phases of RLHF."}
                      badge_text={"Notion"}
                      url={"https://yashmore.notion.site/DeepSpeed-RLHF-30a14ffb89f9436383f6f4a0bc77e347"}
                      onClick={handleMainCard} 
                      /> */}
                      <SearchMainCard
                      summary_text={cards[0].summary}
                      url = {cards[0].url=='' ? 'notion.com' : cards[0].url}
                      body_text={cards[0].page_content}
                      badge_text={ cards[0].type=='' ? 'Local' :cards[0].type }
                      onClick={handleMainCard}
                      />

                    { (cards.length) > 1 ?
                        <>
                          { cards.slice(1).map((card) => (
                            <SearchResultCard
                            summary_text={card.summary}
                            url = {card.url=='' ? 'notion.com' : card.url}
                            body_text={card.page_content}
                            badge_text={ card.type=='' ? 'Local' :card.type }/>     
                            ))
                          }
                        </>
                      :
                      <> </>



                    }

               </>
                :
                <></>
                
              }
                
            
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

const Arrow = createIcon({
  displayName: 'Arrow',
  viewBox: '0 0 72 24',
  path: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z"
      fill="currentColor"
    />
  ),
});