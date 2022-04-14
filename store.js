import create from 'zustand';
import {persist, devtools} from 'zustand/middleware'

const initialState = {

    html: '',
    containerWidth: '',
    height: 0,
    preview: false,
    overflow: false,
    fontSize: 1,
    selectedColor:  '#7856ff',
    fontColor: 'white',
    commandState: {bold: false, italic: false, heading: false, text: true, left: true, center: false},
    imgUrl: '',
    tweetResponse: {},
    minFontSize: 0.77,
    imgWidth: null,
    imgHeight: null,
    
}
const store = (set) => ({
    ...initialState,
    setContainerWidth: width => set({containerWidth: width}),
    setHtml: newHtml => set({html: newHtml}),
    setImgUrl: url => set({imgUrl: url}),
    setWidth: width => set({containerWidth: width}),
    togglePreview:()=> set(state => ({preview: !state.preview})),
    setPreviewToFalse: ()=> set({preview:false}),
    setCommandState: (commandState) => set(state => ({...state.commandState, commandState})),
    setOverflow: (overflow)=>set({overflow}),
    setFontSize: (fontSize) => set(fontSize),
    setSelectedColor: color => set({selectedColor: color}),
    setFontColor: color => set({fontColor: color}),
    increaseFontsize: ()=> set(state => ({fontSize: state.fontSize + 0.02})),
    decreaseFontsize: ()=> set(state => ({fontSize: state.fontSize - 0.02 > state.minFontSize ?  state.fontSize - 0.02 : state.minFontSize})),
    setToInitialState: (state) => set({...state, ...initialState}),
    setTweetResponse : data => set({tweetResponse: data}),
    // setTwitterName: name => set({twitterName: name}), 
    setImgWidth: width => set({imgWidth: width}),
    setImgHeight: height => set({imgHeight: height})
    })
const useStore = create(persist(devtools(store)));

export default useStore