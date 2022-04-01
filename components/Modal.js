import React, { useState } from 'react';
import 'normalize.css/normalize.css';

function Modal({ setShowModal, confirmFunction }) {
  return (
    <>
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
          <h2 className='title'>Modal Title</h2>
          <p className='modal-content'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
            accusantium sit, voluptatum reiciendis nemo et magni rerum
            temporibus suscipit corporis nisi corrupti ratione voluptates vero
            tempore? Esse laboriosam reiciendis corrupti?
          </p>
          <footer className='modal-footer'>
            <button
              className='dismiss'
              onClick={() => {
                setShowModal(false);
              }}
            >
              dismiss
            </button>
            <button className='accept' onClick={confirmFunction}>
              {' '}
              accept
            </button>
          </footer>
        </div>

        <style jsx>
          {`
            .modal {
              --color: var(--selectedColor);
              background-color:rgba(128, 128, 128, 0.775);
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              display: flex;
              justify-content: center;
              align-items: center;
              --background-color: #15202b;
            }
            .modal-container {
              background-color: white;
              padding: 3em 3em 3em;
              position: relative;
              color: var(--color);
              background-color: var(--background-color);
            }

            .close-button {
              position: absolute;
              top: 0.5em;
              right: 1em;
              cursor: pointer;
            }
            .title {
              text-align: center;
              font-size: 2rem;
            }
            .modal-content {
              padding: 3em 0;

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
              background-color: var(--color);
              color: var(--background-color);
              border: none;
            }

            .dismiss {
              border: 2px solid var(--color);
              color: var(--color);
              background-color: var(--background-color);
            }

            @media (min-width: 760px) {
              .modal-container {
                max-width: 60%;
              }
            }
            @media (min-width: 1200px) {
              .modal-container {
                max-width: 40%;
              }
            }
          `}
        </style>
      </div>
    </>
  );
}

export default Modal;