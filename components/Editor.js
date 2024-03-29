import { useEffect, useRef } from 'react';
import ProgressBar from './ProgressBar';
import useStore from '../store';
import { positionCursorToEnd } from '../helpers/cursorfunction';
import ContentEditable from 'react-contenteditable';
import sanitizeHtml from 'sanitize-html';
function Editor({ handleChange, content, overflow, progress, preview }) {
  
  const { selectedColor, fontColor, fontSize, commandState, setCommandState } =
    useStore();
  const refEditor = useRef();

  useEffect(() => {
    const el = document.querySelector('.editor');
    positionCursorToEnd(el);
    el.scrollTop = 1000;
    el.focus();
  }, [preview]);


  function handleSelect() {
    const selectState = {
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      heading: document.queryCommandValue('formatBlock') === 'h1',
      text: document.queryCommandValue('formatBlock') === 'div',
      left: document.queryCommandState('justifyLeft'),
      right: document.queryCommandState('justifyRight'),
      center: document.queryCommandState('justifyCenter'),
      justified: document.queryCommandState('justifyFull'),
    };

    setCommandState(selectState);
  }

  function handlePaste(e) {
    e.preventDefault();
    const clipboard = e.clipboardData.getData('text/plain');
    const text = sanitizeHtml(clipboard)
    document.execCommand('insertHTML', false, text);
    const editor = document.querySelector('.editor');
    positionCursorToEnd(editor);
    editor.scrollTop = editor.scrollHeight;
  }

  return (
    <div className='prova'>
      <ContentEditable
        ref={refEditor}
        className='editor'
        spellCheck={!preview}
        contentEditable={!preview}
        suppressContentEditableWarning={true}
        // value={content}
        onSelect={handleSelect}
        onPaste={handlePaste}
        html={content}
        onChange={(e) => handleChange(e)}
        placeholder={'Type or paste your text here...'}
      ></ContentEditable>

      <style jsx global>
        {`
          [contenteditable='true']:empty:before {
            content: attr(placeholder);
            display: block;
            color: lightgrey;
            font-size: 1.2rem;
          }
        `}
      </style>
    </div>
  );
}

export default Editor;
