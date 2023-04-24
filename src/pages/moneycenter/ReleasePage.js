import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm'; 

const insertTextAtEnd = (textArea, newText) => {
  const { value } = textArea;
  textArea.value = value + newText;
};

const ReleasePage = () => {
  const [markdownText, setMarkdownText] = useState('');
  const [articleType, setArticleType] = useState('分享');

  const textAreaRef = React.createRef();

  const handleTextChange = (event) => {
    setMarkdownText(event.target.value);
  };

  const handleInsertClick = (insertion) => {
    const textArea = textAreaRef.current;
    if (textArea) {
      insertTextAtEnd(textArea, insertion);
      setMarkdownText(textArea.value);
    }
  };

  const handleArticleTypeChange = (event) => {
    setArticleType(event.target.value);
  };

  const handleSubmit = () => {
    // 在这里处理提交逻辑
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
          <Button onClick={() => handleInsertClick('# 芝士H1 标题\n\n')}>H1</Button>
          <Button onClick={() => handleInsertClick('## 芝士H2 标题\n\n')}>H2</Button>
          <Button onClick={() => handleInsertClick('### 芝士H3 标题\n\n')}>H3</Button>
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
          <ReactMarkdown remarkPlugins={[gfm]} children={markdownText} />
        </CardContent>
      </Card>

      <FormControl fullWidth sx={{marginTop: '1rem'}}>
        <Select
          labelId="article-type"
          id="article-type-select"
          value={articleType}
          onChange={handleArticleTypeChange}
          label="文章类型"
          >
          <MenuItem value="分享">分享</MenuItem>
          <MenuItem value="请求">请求</MenuItem>
          <MenuItem value="闲聊">闲聊</MenuItem>
          <MenuItem value="日志">日志</MenuItem>
          </Select>
          </FormControl>
          <Button fullWidth variant="contained" color="primary" onClick={handleSubmit} sx={{marginTop: '1rem'}}>
    发送
  </Button>
</Box>
);
};

export default ReleasePage;
