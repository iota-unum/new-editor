import create from 'zustand';
import {persist, devtools} from 'zustand/middleware'
const store = (set) => ({
    html: '<div></div>',
    setHtml: newHtml => set({html: newHtml}),
    containerWidth: '100%',
    height: 0,
    preview: false,
    overflow: false,
    fontSize: 1,
    selectedColor:  'rgb(0, 186, 124)',
    fontColor: 'white',
    commandState: {bold: false, italic: false, heading: false, text: true, left: true, center: false},
    setWidth: width => set({containerWidth: width}),
    togglePreview:()=> set(state => ({preview: !state.preview})),
    setPreviewToFalse: ()=> set({preview:false}),
    setCommandState: (commandState) => set(state => ({...state.commandState, commandState})),
    setOverflow: (overflow)=>set({overflow}),
    setFontSize: (fontSize) => set(fontSize),
    setSelectedColor: color => set({selectedColor: color}),
    setFontColor: color => set({fontColor: color}),
    increaseFontsize: ()=> set(state => ({fontSize: state.fontSize + 0.1})),
    decreaseFontsize: ()=> set(state => ({fontSize: state.fontSize > 0.75 ?  state.fontSize - 0.1 : 0.75}))
    
    })
const useStore = create(devtools(store));

export default useStore