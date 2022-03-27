import {useState, useEffect} from 'react'
import useStore from '../store';
export default function useDimensions() {

    const {fontSize, setFontSize, overflow, setOverflow, minFontSize, preview, html} = useStore();
    const [scrollHeight, setScrollHeight] = useState(0);
    const [progress, setProgress] = useState(0);
    const [editorWidth, setEditorWidth] = useState(0)
    const [editorHeight, setEditorHeight] = useState(0)

useEffect(() => {
    const editor = document.querySelector('.preview');
    const lastChild = editor.lastChild
    const editorWidth = editor.offsetWidth;
    const editorHeight = editor.offsetHeight;
    const editorTop = editor.offsetTop
    const lastChildTop = lastChild && lastChild.offsetTop + lastChild.offsetHeight
    const contentHeight = ( lastChildTop - editorTop) || 0
    const maxHeight = editorWidth * 1.333333333;
    const scrollHeight = editor.scrollHeight;
    console.log('lastCHildTop', lastChildTop)
    // console.log('contentHEIGHT', content);

    if(overflow ) {
        setFontSize(state => ({fontSize: state.fontSize - 0.02 >= minFontSize ? state.fontSize - 0.01 : state.minFontSize }))
    }
    setProgress(scrollHeight / maxHeight);
    setOverflow(progress >= 1);
    setScrollHeight(scrollHeight)
    setEditorHeight(editorHeight)
    setEditorWidth(editorWidth)
  }, [  progress, overflow, scrollHeight, fontSize, preview, html]);










    return {
        overflow, progress,
        editorWidth, editorHeight

    }
}