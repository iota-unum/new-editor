import {useState, useEffect} from 'react'
import useStore from '../store';
export default function useDimensions(content) {

    const {fontSize, decreaseFontsize, overflow, setOverflow, minFontSize, preview, html} = useStore();
    const [scrollHeight, setScrollHeight] = useState(0);
    const [progress, setProgress] = useState(0);
    const [editorWidth, setEditorWidth] = useState(0)
    const [editorHeight, setEditorHeight] = useState(0)

useEffect(() => {
    
        if(overflow ) {
            decreaseFontsize()
        }
    const editor = document.querySelector('.editor');
    const lastChild = editor.lastChild
    const editorWidth = editor.offsetWidth;
    const editorHeight = editor.offsetHeight;
    const editorTop = editor.offsetTop
    const lastChildTop = lastChild && lastChild.offsetTop + lastChild.offsetHeight
    const contentHeight = ( lastChildTop - editorTop) || 0
    const maxHeight = editorWidth * 1.333333333;
    const scrollHeight = editor.scrollHeight;
    // console.log('contentHEIGHT', content);
    setProgress(scrollHeight / maxHeight);
    setOverflow(progress > 1);
    setScrollHeight(scrollHeight)
    setEditorHeight(editorHeight)
    setEditorWidth(editorWidth)
  }, [ content, progress, overflow, scrollHeight, fontSize, preview, html]);










    return {
        overflow, progress,
        editorWidth, editorHeight

    }
}