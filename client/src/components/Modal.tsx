type session = {
  _id: string;
  completed: boolean;
  length: number;
  user: string;
  createdAt: string;
  comment: string;
};

interface IModalSession {
  modalSession: session | undefined;
  modalActive: boolean;
  handleClick: (session: session | undefined) => void;
}

const Modal = ({ modalSession, modalActive, handleClick }: IModalSession) => {
  return (
    <div>
      <div className={modalActive ? 'modal-bg active' : 'modal-bg'}>
        <div className='modal-box'>
          <div className='modal-header'>Edit note</div>
          <div className='modal-text'>
            {modalSession ? modalSession.comment : 'loading...'}
          </div>
          <div className='modal-buttons'>
            <button onClick={() => handleClick(modalSession)}>Cancel</button>
            <button>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
