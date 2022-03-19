import { useEffect, useRef } from 'react';
import ProgressBar from './ProgressBar';
import useStore from '../store';
import {positionCursorToEnd} from '../helpers/cursorfunction'
function Editor({ handleChange, content, overflow, progress, preview }) {
  const { selectedColor, fontColor, fontSize, commandState, setCommandState } =
    useStore();

  const refEditor = useRef();

  useEffect(()=> {

    const el = document.querySelector('.editor');
    el.scrollTop = el.scrollHeight
    el.focus()
    positionCursorToEnd(el)

  }, [ preview])

  function handleSelect() {
    const selectState = {
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      heading: document.queryCommandValue('formatBlock') === 'h1',
      text: document.queryCommandValue('formatBlock') === 'div',
      center: document.queryCommandState('justifyCenter'),
      left: document.queryCommandState('justifyLeft'),
    };
    console.log('bold', document.queryCommandState('bold'));
    console.log('qmvl', document.queryCommandValue('formatBlock'));
    setCommandState(selectState);
    console.log('CommandSTATE', commandState);
  }

  function handlePaste(e) {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertHTML', false, text);
    const editor = document.querySelector('.editor');
    positionCursorToEnd(editor);
    editor.scrollTop = editor.scrollHeight
  }

  return (
    <div
      ref={refEditor}
      className='editor'
      spellCheck={!preview}
      contentEditable={!preview}
      onInput={handleChange}
      suppressContentEditableWarning={true}
      // value={content}
      onSelect={handleSelect}
      onPaste={handlePaste}
    >
      {content === '' ? <div></div> : <div></div>}

      <style jsx global>
        {`
          .editor {
            font-weight: 400;
            outline: none;
            min-height: calc(var(--containerWidth) * 0.5625);
            max-height: ${preview
              ? `calc(var(--containerWidth) * 1.333333)`
              : `calc(var(--containerWidth) * 0.5625)`};
            background-color: var(--selectedColor);
            overflow: ${preview ? 'hidden' : 'auto'};
            padding: 0.5rem;
            font-size: ${fontSize}rem;
            color: ${fontColor};
          }
          @media (min-width: 768px) {
            .editor {
              overflow: hidden;
              max-height: calc(var(--containerWidth) * 1.33333);
            }
          }
        `}
      </style>
    </div>
  );
}

export default Editor;
