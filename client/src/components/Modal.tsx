import { SetStateAction, useState } from 'react';
import { SessionData } from '../pages/UserProfile';
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
  setStudySessions: React.Dispatch<SetStateAction<SessionData[]>>;
}

const Modal = ({
  modalSession,
  modalActive,
  handleClick,
  setStudySessions,
}: IModalSession) => {
  const [newNote, setNewNote] = useState('');
  const handleUpdate = async (id: string | undefined, note: string) => {
    const apiUrlProxy = '/api/study-sessions';
    const updatedData = {
      _id: id,
      note,
    };
    try {
      const updated = await fetch(apiUrlProxy, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      const res = await updated.json();
      if (res) {
        console.log('success');
        setNewNote('');
        handleClick(modalSession);
        try {
          const fetchSessions = await fetch(apiUrlProxy, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const sessionsFound = await fetchSessions.json();
          setStudySessions(sessionsFound);
        } catch (err) {
          console.error(err);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  const closeModal = (modalSession: session | undefined) => {
    setNewNote('');
    handleClick(modalSession);
  };
  return (
    <div className={modalActive ? 'modal active' : 'modal'}>
      <div className={modalActive ? 'modal-bg active' : 'modal-bg'}></div>
      <div className={modalActive ? 'modal-box active' : 'modal-box'}>
        <div className='modal-header'></div>
        <div className='modal-text'>
          <label htmlFor='update-comment'>Edit comment - </label>
          <textarea
            id='update-comment'
            name='update-comment'
            placeholder={'Current comment: ' + modalSession?.comment}
            rows={10}
            cols={50}
            value={newNote}
            onChange={e => setNewNote(e.target.value)}
          ></textarea>
          <span>
            Click cancel to keep your current comment or save to save a new
            comment.
          </span>
        </div>
        <div className='modal-buttons'>
          <button
            className='modal-button'
            onClick={() => closeModal(modalSession)}
          >
            Cancel
          </button>
          <button
            className='modal-button'
            onClick={() => handleUpdate(modalSession?._id, newNote)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
