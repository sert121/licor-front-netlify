import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
} from '@chakra-ui/react';

import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import SidebarWithHeader from './pages/Structure';
import HomeSearch from './components/HomeP';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
  HashRouter,
  Router
} from "react-router-dom";
import UploadStuff from './components/UploadStuff';
import {BrowserRouter} from "react-router-dom" 
import SuperTokens, { SuperTokensWrapper, getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import Passwordless from "supertokens-auth-react/recipe/passwordless";
import Session from "supertokens-auth-react/recipe/session";
import * as reactRouterDom from "react-router-dom";
import {useColorMode} from '@chakra-ui/react'
import { SessionAuth } from "supertokens-auth-react/recipe/session";


// import { extendTheme , Button} from '@chakra-ui/react'
// import { theme as baseTheme } from '@saas-ui/theme-glass'


import {theme} from './theme';

SuperTokens.init({
  appInfo: {
      appName: "licoricepizza",
      apiDomain: "https://licorice-backend.onrender.com",
      websiteDomain: "https://iridescent-llama.netlify.app",
      apiBasePath: "/auth",
      websiteBasePath: "/auth"
  },
  recipeList: [
      Passwordless.init({
          contactMethod: "EMAIL_OR_PHONE"
      }),
      Session.init()
  ]
});


function App() {

return(

<SuperTokensWrapper>
  <HashRouter>
  <Routes>

    <Route exact path="integrations" element={
    <SessionAuth>
        <ChakraProvider><SidebarWithHeader>
        <UploadStuff></UploadStuff>
        </SidebarWithHeader></ChakraProvider>
      </SessionAuth>
    
    } />

  <Route exact path="/" element={<SessionAuth>
  <ChakraProvider>
    <SidebarWithHeader>
    <UploadStuff></UploadStuff>
      <HomeSearch></HomeSearch>
    </SidebarWithHeader>
    
    </ChakraProvider>
    </SessionAuth>
    } />

  {/* <Route path='/auth'> */}
        {getSuperTokensRoutesForReactRouterDom(reactRouterDom)}
  {/* </Route> */}

 
  </Routes>

  </HashRouter>
</SuperTokensWrapper>

);


}

export default App;
