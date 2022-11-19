
import { ReactNode, MouseEvent, KeyboardEvent } from 'react';
import ReactModal from 'react-modal';
import { customStyles } from '../../confs/modalStyles';


interface ModalProps {
  children: ReactNode
  isOpen: boolean;
  titulo?: String;
  onRequestClose: (event: MouseEvent<Element, globalThis.MouseEvent> | KeyboardEvent<Element>) => void;
}


ReactModal.setAppElement('#root');

export const Modal = ({ children, isOpen, titulo, onRequestClose, }: ModalProps) => {
  return (
    <ReactModal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={onRequestClose}

    >
      <div className="encabezado-modal">
        <h3>{titulo}</h3>
      </div>
      <button className="boton-cerrar" onClick={onRequestClose}>X</button>
      {children}
    </ReactModal>
  )
}
