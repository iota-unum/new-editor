const Modal = ({ children, color, bgColor, setShowModal }) => (
  <div className='modal'>
    <div className='modal-container'>
      <div
        className='close-button'
        onClick={() => {
          setShowModal(false);
        }}
      >
        X
      </div>
      {children}
    </div>

    <style jsx global>
      {`
        .modal {
          background-color: rgba(0, 0, 0, 0.761);
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
          padding: 3em 3em 3em;
          position: relative;
          color: var(--text-color);
          max-height: 60vh;
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
        }
        .modal-content {
          padding: 3em 0;
          text-align: center;
          

          overflow: auto;
        }
        .modal-footer {
          display: flex;
          justify-content: space-around;
          width: 50%;
          margin: 0 auto;
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

        @media (min-width: 760px) {
          .modal-container {
            max-width: 50%;
            border-radius: 0.5em;

          }
        }
        @media (min-width: 1200px) {
          .modal-container {
            max-width: 30%;
          }
        }
      `}
    </style>
  </div>
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
