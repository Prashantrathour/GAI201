import React from 'react';
import './App.css';
import CodeEditor from './Component/Codeeditor';
import { Box, Flex } from '@chakra-ui/react';
import OutputComponent from './Component/OutPut';
import Navbar from './Component/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Flex
        height="calc(100vh - 60px)" // Subtract Navbar height from 100vh to avoid overlap
        justifyContent="center"
        alignItems="center"
        flexDirection={['column', 'column', 'row']}
      >
        <Box width={['100%', '100%', '50%']} p={4} mt={"100px"}>
          <CodeEditor />
        </Box>
        <Box width={['100%', '100%', '50%']} p={4}>
          <OutputComponent />
        </Box>
      </Flex>
    </div>
  );
}

export default App;
