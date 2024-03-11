import React, { useEffect, useState } from 'react';

function JoinForm({ joinRoom, error, resetError }) {
  const [roomCode, setRoomCode] = useState('');
  const [currName, setCurrName] = useState('');

  const changeName = (e) => {
    resetError();
    setCurrName(e.target.value);
  };
  const changeRoomCode = (e) => {
    resetError();
    setRoomCode(e.target.value);
  };

  return (
    <>
    <div style={{ display: 'block' }}>
      <div style={{ marginBottom: '16px' }}>
        <div style={{ color: 'red' }}>{error}</div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '250px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              Name:
            </div>
            <input placeholder="Name" onChange={changeName} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              Room code:
            </div>
            <div>
              <input placeholder="Room Code" value={roomCode} onChange={changeRoomCode} />
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => joinRoom({ room: roomCode, name: currName })}>Join Room</button>
    </div>
    </>
  )
}

export default JoinForm;