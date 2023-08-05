import React, { useState } from 'react';
import { Box, Button, Heading, Select, Text, useToast, IconButton, Stack } from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { convertCode, handleDebugCode_quality_check } from '../redux_/Convertor/action';
import { Editor } from '@monaco-editor/react';

const OutputComponent = () => {
  const data = useSelector((store) => store.codeReducer);
  const loading = data.isLoading;
  const error = data.isError;
  const toast = useToast();
  const [code, setCode] = useState('// Start typing your code here...');
  const dispatch = useDispatch();
  const [output, setOutput] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const editorDidMount = (editor, monaco) => {
    // You can customize the editor here if needed
    editor.updateOptions({ readOnly: true }); // Make the editor non-editable
    console.log('Editor is ready!', editor);
  };
  const handleConvertCode = () => {
    if (!selectedLanguage) {
      toast({ title: 'Select language' });
    } else if (data.code === '') {
      toast({ title: 'Please Enter some code' });
    } else {
      dispatch(convertCode(data.code, 'convert', selectedLanguage));
      
      setOutput(true)
    }
  };

  const handleDebugCode = () => {
    dispatch(handleDebugCode_quality_check(data.code, 'debug'));
    setOutput(true)
  };

  const handleQualityCheck = () => {
    dispatch(handleDebugCode_quality_check(data.code, 'quality_check'));
    setOutput(true)
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(data.output);
    toast({ title: 'Copied to clipboard!', status: 'success' });
  };

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'c++', label: 'C++' },
    { value: 'c', label: 'C' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'go', label: 'Go' },
    { value: 'swift', label: 'Swift' },
    { value: 'php', label: 'PHP' },
    // Add more languages here
  ];
  const onChange = (newValue, e) => {
    // Update the state only if the code has changed
    if (code !== newValue) {
      setCode(newValue);
      // Do something with the updated code...
    }
  };
  const options = {
    selectOnLineNumbers: true,
  };
  return (
    <Box>
    
      <Heading as="h2" size="lg">Output</Heading>
      <Box mt={4} display="flex" justifyContent="space-between" width="100%" gap="20px">
        <Button isDisabled={!selectedLanguage||!data.code?true:false} colorScheme="blue" onClick={handleConvertCode}>Code Converter</Button>
        <Select variant="outline" width="150px" value={selectedLanguage} onChange={handleLanguageChange}>
          <option value={''}>Select language</option>
          {languages.map((language) => (
            <option key={language.value} value={language.value}>
              {language.label}
            </option>
          ))}
        </Select>
        <Button colorScheme="purple" onClick={handleDebugCode}>Debug</Button>
        <Button colorScheme="green" onClick={handleQualityCheck}>Quality Check</Button>
      </Box>
    <Box p={4}  display="flex" flexDirection="column" float={'inline-start'} >
      <Box mt={4} flex="1">
      
       <Stack float={"right"}>{output?<IconButton
          icon={<CopyIcon />}
          onClick={handleCopyOutput}
          aria-label="Copy Output"
          colorScheme="teal"
          mt={2}
        />:""}</Stack> 
        {!loading?<Text mt={2} whiteSpace="pre-wrap" fontFamily="monospace">{data.output}</Text>:"Loading...."}
      
      </Box>
    </Box>
    </Box>
  );
};

export default OutputComponent;
