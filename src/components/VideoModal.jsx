import React from 'react';
import Modal from 'react-modal';
import './VideoModal.css';

Modal.setAppElement('#root');

export default function VideoModal({isOpen, onRequestClose, youtubeUrl, title}){
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="video-modal" overlayClassName="video-overlay">
      <div className="video-header">
        <h5>{title}</h5>
        <button onClick={onRequestClose} className="close-btn">Close</button>
      </div>
      <div className="video-body">
        {youtubeUrl ? <iframe width="100%" height="400" src={youtubeUrl} title={title} frameBorder="0" allowFullScreen></iframe> : <div className="placeholder">No video link provided</div>}
      </div>
    </Modal>
  );
}
