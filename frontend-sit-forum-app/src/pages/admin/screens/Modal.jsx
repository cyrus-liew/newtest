import React from 'react'; 
 
const Modal = ({ isOpen, onClose, children }) => { 
  if (!isOpen) return null; 
 
  return ( 
    <div className="fixed inset-0 flex items-center justify-center z-50"> 
      <div className="modal-overlay fixed inset-0 bg-black opacity-25"></div> 
      <div className="modal-container bg-white w-2/3 md:w-1/2 rounded-lg transform transition duration-300 ease-in-out"> 
        <button 
          className="absolute top-0 right-0 p-2 m-2 text-2xl font-bold text-gray-700" 
          onClick={onClose} 
        > 
          &times; 
        </button> 
        <div className="p-8 border rounded-lg"> 
          {children} 
        </div> 
      </div> 
    </div> 
  ); 
}; 
 
export default Modal;