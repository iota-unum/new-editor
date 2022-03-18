
import react from 'react'
import useStore from '../store';


function Layout(props) {

  const selectedColor = useStore(state => state.selectedColor)
  return (
    <div className='page-layout'>
      {props.children}
      <style jsx global>{`
        :root {
          --selectedColor: ${selectedColor};
          --mainColor: #15202b;
        }
        .page-layout {
          height: 100%;
        outline:none;
        }
      `}</style>
    </div>
  );
}

export default Layout;
