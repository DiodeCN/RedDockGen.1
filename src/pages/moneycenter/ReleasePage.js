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
    const { value } = event.target;
    const prevValue = markdownText;
  
    // 当用户添加一个换行符时，自动在其后添加一个换行符
    if (value.length > prevValue.length && value.charAt(value.length - 1) === '\n') {
      const secondLastChar = value.charAt(value.length - 2);
      if (secondLastChar !== '\n') {
        event.target.value = value.slice(0, -1) + '\n\n';
      }
    }
    // 当用户删除一个换行符时，自动删除前面的换行符（如果存在）
    else if (value.length < prevValue.length && prevValue.charAt(prevValue.length - 1) === '\n') {
      const secondLastChar = prevValue.charAt(prevValue.length - 2);
      if (secondLastChar === '\n') {
        event.target.value = value.slice(0, -1);
      }
    }
  
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
          <Button onClick={() => handleInsertClick('# 芝士H1 标题\n')}>H1</Button>
          <Button onClick={() => handleInsertClick('## 芝士H2 标题\n')}>H2</Button>
          <Button onClick={() => handleInsertClick('### 芝士H3 标题\n')}>H3</Button>
          <Button onClick={() => handleInsertClick('**芝士粗体**')}>粗体</Button>
          <Button onClick={() => handleInsertClick('_芝士斜体_')}>斜体</Button>
          <Button onClick={() => handleInsertClick('~~芝士删除线~~')}>删除线</Button>
          <Button onClick={() => handleInsertClick('\n\n- 芝士列表项')}>列表项</Button>
          <Button onClick={() => handleInsertClick('\n\n1. 芝士有序列表项')}>有序列表项</Button>
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
