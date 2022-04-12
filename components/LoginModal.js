import React from 'react';
import Modal from './Modal';
function LoginModal({ color, setShowModal, signIn }) {
  return (
    <Modal color={color} bgColor='#15202b' setShowModal={setShowModal}>
      <Modal.Title>You&apos;re not logged-in</Modal.Title>
      <Modal.Content>
       
        <p style={{textAlign:'center'}}>In order to tweet you must be logged-in with a twitter account.</p>
        <br></br>
        <p style={{textAlign: 'center', fontWeight:'bolder'}}>Do you want to log-in?</p>
      </Modal.Content>
      <Modal.Footer>
        <Modal.Button type='dismiss' onClick={() => setShowModal(false)}>
          Dismiss
        </Modal.Button>
        <Modal.Button type='accept' onClick={() => signIn('twitter')}>
          Login
        </Modal.Button>
      </Modal.Footer>

    </Modal>
  );
}

export default LoginModal;
