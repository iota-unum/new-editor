import create from 'zustand';

const useStore = create((set) => ({

containerWidth: '100%',
height: 0,
preview: false,
overflow: false,
fontSize: 1,
selectedColor:  'rgb(29, 155, 240)',
fontColor: 'white',
commandState: {bold: false, italic: false, heading: false, text: true, left: true, center: false},
setWidth: width => set({containerWidth: width}),
setPreview:()=> set(state => ({preview: !state.preview})),
setCommandState: (commandState) => set(state => ({...state.commandState, commandState})),
setOverflow: (overflow)=>set({overflow}),
setFontSize: (fontSize) => set(fontSize),
setSelectedColor: color => set({selectedColor: color}),
setFontColor: color => set({fontColor: color}),
increaseFontsize: ()=> set(state => ({fontSize: state.fontSize + 0.1})),
decreaseFontsize: ()=> set(state => ({fontSize: state.fontSize > 0.76?  state.fontSize - 0.1 : 0.75}))

}));

export default useStore