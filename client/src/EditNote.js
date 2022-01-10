import {useState, useEffect} from 'react'
import { Editor } from "react-draft-wysiwyg";
import {EditorState} from 'draft-js'
import { convertToRaw } from "draft-js";
import { convertFromRaw } from "draft-js";
import {MyButton} from './Components/Button.style.js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


const EditNote = ({selectedNote, setSelectedNote}) => {
    
    const [editorState, setEditorState] = useState(() => EditorState.createWithContent(convertFromRaw(JSON.parse(selectedNote.content))));

    const cmdPress = useKeyPress("Meta");
    const sPress = useKeyPress("s");
    cmdPress && sPress && newNoteFunc()

    const wrapperStyle = {
      borderRadius: '4px'
    }
  
    const editorStyle = {
      height:'30rem',
      padding:'1rem'
    }

  function newNoteFunc() {
    fetch(`/api/notes/${selectedNote.id}`, {
      method: "PATCH",
      headers: {
          "Content-Type" : "application/json"
      },
     
      body:  JSON.stringify({content: JSON.stringify(convertToRaw(editorState.getCurrentContent()))})
    })
    .then((r) => {
      if (r.ok) {
        r.json().then((r) => console.log(r));
      } else {
        r.json().then((err) => console.log(err));
      }
    });
  }

    return (
    <Stack spacing={2}>
        <Box
        sx={{boxShadow: 3, borderRadius: 2, marginTop: 3,}}
        >
          <Editor
          toolbar={{
            options: ['inline', 'blockType', 'fontSize', 'fontFamily'],
            inline: {
              options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
              bold: { className: 'bordered-option-classname' },
              italic: { className: 'bordered-option-classname' },
              underline: { className: 'bordered-option-classname' },
              strikethrough: { className: 'bordered-option-classname' },
              code: { className: 'bordered-option-classname' },
            },
            blockType: {
              className: 'bordered-option-classname',
            },
            fontSize: {
              className: 'bordered-option-classname',
            },
            fontFamily: {
              className: 'bordered-option-classname',
            },
          }}
            editorState={editorState}
            onEditorStateChange={setEditorState}
            wrapperStyle={wrapperStyle}
            editorStyle={editorStyle}   
          />
          </Box>
      <MyButton
        onClick={newNoteFunc}
        variant="contained"
        >Update
      </MyButton>
      <MyButton
        onClick={(e) => setSelectedNote('')}
        variant="contained"
        >Go Back
      </MyButton>
    </Stack>
    )
}

function useKeyPress(targetKey) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);
  // If pressed key is our target key then set to true
  function downHandler({ key }) {
    if (key === targetKey) {
      console.log(key)
      setKeyPressed(true);
    }
  }
  // If released key is our target key then set to false
  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };
  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return keyPressed;
}

document.addEventListener("keydown", function(e) {
  if (e.key === 's' && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
    e.preventDefault();
  }
}, false);

export default EditNote
