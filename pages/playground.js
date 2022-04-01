import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';

function Playground() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className='playground'>
      Playground
      <Dialog open={isOpen} onClose={() => setIsOpen(true)} className='dialogo'>
        <Dialog.Overlay />
        <div className='title'>
          <Dialog.Title>Deactivate account</Dialog.Title>
        </div>
        <Dialog.Description>
          This will permanently deactivate your account
        </Dialog.Description>

        <p>
          Are you sure you want to deactivate your account? All of your data
          will be permanently removed. This action cannot be undone.
        </p>

        <button onClick={() => setIsOpen(false)}>Deactivate</button>
        <button onClick={() => setIsOpen(false)}>Cancel</button>
      </Dialog>
      <style jsx>
        {`
          .playground {
            background-color: bisque;
            height: 100vh;
          }
          .title {
            color: red;
          }
          .dialogo {
              width: 30vh;
          }
        `}
      </style>
    </div>
  );
}

export default Playground;
