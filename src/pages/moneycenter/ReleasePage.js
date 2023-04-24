import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import ReactMarkdown from 'react-markdown';

const insertTextAtCursor = (textArea, newText) => {
  const { selectionStart, selectionEnd, value } = textArea;
  const before = value.substring(0, selectionStart);
  const after = value.substring(selectionEnd, value.length);

  textArea.value = before + newText + after;
  textArea.setSelectionRange(selectionStart + newText.length, selectionStart + newText.length);
};

const ReleasePage = () => {
  const [markdownText, setMarkdownText] = useState('');
  const textAreaRef = React.createRef();

  const handleTextChange = (event) => {
    setMarkdownText(event.target.value);
  };

  const handleInsertClick = (insertion) => {
    const textArea = textAreaRef.current;
    if (textArea) {
      insertTextAtCursor(textArea, insertion);
      setMarkdownText(textArea.value);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            文本编辑
          </Typography>
          <Button onClick={() => handleInsertClick('**粗体**')}>粗体</Button>
          <Button onClick={() => handleInsertClick('_斜体_')}>斜体</Button>
          <Button onClick={() => handleInsertClick('~~删除线~~')}>删除线</Button>
          <Button onClick={() => handleInsertClick('\n\n- 列表项')}>列表项</Button>
          <Button onClick={() => handleInsertClick('\n\n1. 有序列表项')}>有序列表项</Button>
        </Toolbar>
      </AppBar>
      <TextField
        multiline
        rows={10}
        variant="outlined"
        value={markdownText}
        onChange={handleTextChange}
        fullWidth
        sx={{ borderRadius: '12px' }}
        inputRef={textAreaRef}
      />
      <Card
        sx={{
          borderRadius: '12px',
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
          width: '100%',
        }}
      >
        <CardContent>
          <ReactMarkdown children={markdownText} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default ReleasePage;
