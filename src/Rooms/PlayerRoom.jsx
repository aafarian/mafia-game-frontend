import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

function PlayerRoom({ room, name, role, error }) {
  let color;
  switch(role) {
    case 'Mafia':
      color = 'red';
      break;
    case 'Doctor':
      color = 'green';
      break;
    case 'Sheriff':
      color = 'blue';
      break;
    case 'Civilian':
      color = 'orange';
      break;
    default:
      color = 'black';
      break;
  }

  return (
    <>
    <div style={{ color: 'red' }}>{error}</div>
    <div style={{ fontSize: '24px', marginBottom: '12px' }}>
      Welcome&nbsp;
      <span style={{ color: 'blue', fontWeight: 'bold' }}>
        {name}
        </span>!
      </div>
    <div style={{ fontSize: '18px', marginBottom: '12px' }}>You are in room <b>{room}</b></div>
    {role ? (
      <div>You have been assigned to be&nbsp;
        <span style={{ color, fontWeight: 'bold' }}>
          {role}
        </span>.</div>
    ): (
      <div style={{ textWrap: 'pretty' }}>No role has been assigned to you yet, wait for narrator to start the game.</div>
    )}
    </>
  )
}

export default PlayerRoom;