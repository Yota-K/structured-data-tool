import React from 'react';
import Modal from '@mui/material/Modal';

type Props = {
  children: React.ReactElement;
  open: boolean;
  onClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
};

const AppModal: React.FC<Props> = ({ children, open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      {children}
    </Modal>
  );
};

export default AppModal;
