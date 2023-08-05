import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Box, Flex, Select } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { updateCode } from '../redux_/Convertor/action';

const CodeEditor = () => {
  const dispatch = useDispatch();
  const [code, setCode] = useState('// Start typing your code here...');
  const [selectedTheme, setSelectedTheme] = useState('vs-dark'); // Default theme
  const [selectedLanguage, setSelectedLanguage] = useState('javascript'); // Default language

  const editorDidMount = (editor, monaco) => {
    // You can customize the editor here if needed
    console.log('Editor is ready!', editor);
    editor.updateOptions({ theme: selectedTheme }); // Set the initial theme
    editor.updateOptions({ language: selectedLanguage }); // Set the initial language
  };

  const onChange = (newValue, e) => {
    setCode(newValue);
    // Do something with the updated code...
  };

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setSelectedTheme(newTheme);
  };

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
  };

  const options = {
    selectOnLineNumbers: true,
  };

  useEffect(() => {
    dispatch(updateCode(code));
  }, [code]);

  const themes = [
    { value: 'vs-dark', label: 'Dark Theme' },
    { value: 'vs-light', label: 'Light Theme' },
    { value: 'hc-black', label: 'High Contrast Theme' },
    // Add more themes here
    { value: 'github', label: 'GitHub Theme' },
    { value: 'solarized-light', label: 'Solarized Light Theme' },
    { value: 'monokai', label: 'Monokai Theme' },
  ];

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'typescript', label: 'TypeScript' },
    // Add more languages here
    { value: 'ruby', label: 'Ruby' },
    { value: 'c', label: 'C' },
    { value: 'go', label: 'Go' },
  ];

  return (
    <Box height="90vh" width="100%" margin="10px">
      {/* Theme Selector */}
      <Flex>
      <Select value={selectedTheme} onChange={handleThemeChange} maxWidth="200px" mb={4}>
        {themes.map((theme) => (
          <option key={theme.value} value={theme.value}>
            {theme.label}
          </option>
        ))}
      </Select>

      {/* Language Selector */}
      <Select value={selectedLanguage} onChange={handleLanguageChange} maxWidth="200px" mb={4}>
        {languages.map((language) => (
          <option key={language.value} value={language.value}>
            {language.label}
          </option>
        ))}
      </Select>
</Flex>
      <Editor
        height="100%"
        width="100%" // Use 100% width to prevent overlap with Navbar
        minWidth="200px" // Set a minimum width for the editor
        language={selectedLanguage}
        theme={selectedTheme}
        value={code}
        options={options}
        onChange={onChange}
        editorDidMount={editorDidMount}
      />
    </Box>
  );
};

export default CodeEditor;
