import {motion, AnimatePresence} from 'framer-motion'

const Modal = ({ children, color, bgColor, setShowModal }) => (
  <motion.div className='modal' initial={{opacity:0,}}
  animate={{opacity: 1, }}
  transition={{
    // duration: 1,
  }}
  exit={{
    opacity: 0, 
  }}>
    <motion.div className='modal-container'  initial={{scale:0}}
      animate={{scale:1}}
      exit={{scale:0}}>
      <div
        className='close-button'
        onClick={() => {
          setShowModal(false);
        }}
      >
        X
      </div>
      {children}
    </motion.div>

    <style jsx global>
      {`
        .modal {
          background-color: rgba(0, 0, 0, 0.8);
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          --color: ${color};
          --background-color: ${bgColor};
          --text-color: ${color === '#ffd400' ? '#000000df' : 'white'};
        }
        .modal-container {
          background-color: var(--color);
          padding:1em;
          position: relative;
          color: var(--text-color);
          max-height: 60vh;
          max-width: calc(var(--containerWidth)*0.85);
            border-radius: 0.5em;
        }

        .close-button {
          position: absolute;
          top: 0.5em;
          right: 1em;
          cursor: pointer;
        }
        .title {
          text-align: center;
          font-size: 1.8rem;
          color: var(--text-color);
          padding: 1em;
        }
        .modal-content {
          padding:  ;
          text-align: center;
          

          overflow: auto;
        }
        .modal-footer {
          display: flex;
          justify-content: space-around;
          width: 50%;
          margin: 0 auto;
          padding-top: 1em;;
        }

        button {
          padding: 0.4em 1.5em;
          border-radius: 2em;
          margin: 0.5em;
          font-weight: bolder;
          
        }

        .accept {
          background-color: var(--text-color);
          color: var(--color);
          border: none;
        }

        .dismiss {
          border: 2px solid var(--text-color);
          background-color: var(--color);
          color: var(--text-color);
        }

    
      `}
    </style>
  </motion.div>
);

const Title = ({ children }) => <h2 className='title'>{children}</h2>;

const Content = ({ children }) => <p className='modal-content'>{children}</p>;

const Footer = ({ children }) => (
  <footer className='modal-footer'> {children} </footer>
);

const Button = ({ children, onClick, type }) => (
  <button className={type} onClick={onClick}>
    {children}
  </button>
);
Modal.Title = Title;
Modal.Content = Content;
Modal.Footer = Footer;
Modal.Button = Button;
export default Modal;
