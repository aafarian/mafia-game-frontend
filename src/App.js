import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import JoinForm from './Rooms/JoinForm';
import NarratorRoom from './Rooms/NarratorRoom';
import PlayerRoom from './Rooms/PlayerRoom';

const BACKEND_URL = process.env.NODE_ENV === 'production'
  ? 'https://mafia-party-5640ab9ca94a.herokuapp.com' // Use your Heroku app's URL
  : 'http://localhost:4000';
const socket = io(BACKEND_URL);

function App() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [players, setPlayers] = useState('No players yet!');
  const [narrator, setNarrator] = useState(false);
  useEffect(() => {
    socket.on('roleAssigned', data => {
      setRole(data.role);
    });
    socket.on('roomJoined', data => {
      setRoom(data.room.toUpperCase());
    });
  },[])

  const createRoom = (roles) => {
    setNarrator(true);
    socket.emit('createRoom');
  };

  const resetError = () => {
    setError('');
  }

  const joinRoom = ({ name, room }) => {
    if (room) {
      setName(name);
      socket.emit('joinRoom', { name, room });
    }
  };

  const assignRoles = (roles) => {
    if (room) {
      socket.emit('assignRoles', { room, roles })
    }
  }

  useEffect(() => {
    socket.on('roomCreated', (roomCode) => {
      setRoom(roomCode.toUpperCase());
    });

    socket.on('playersInGame', data => {
      setPlayers(data.players);
    })

    socket.on('error', message => {
      setError(message);
    });
  }, []);

  useEffect(() => {
    if (room && narrator) {
      socket.emit('playersRequested', room);
    }
  }, [room, narrator])

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div>
        <div style={{ width: 'auto', height: 'auto', display: 'flex', flexDirection: 'column', padding: '24px', border: '1px solid black', backgroundColor: 'white' }}>

          {!room &&
            (
              <>
              <span style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '24px' }}>Welcome to Mafia Party!</span>
              <div style={{ display: 'flex', marginBottom: '16px' }}>
                <button onClick={createRoom}>Create Room as Narrator</button>
              </div>
              <div style={{ marginBottom: '16px' }}>Or join room as player</div>
              <JoinForm room={room} joinRoom={joinRoom} name={name} role={role} error={error} resetError={resetError} />
              </>
            )
          }

          {room && narrator &&
            <NarratorRoom room={room} players={players} assignRoles={assignRoles} error={error} resetError={resetError} />
          }

          {room && !narrator &&
            <PlayerRoom room={room} joinRoom={joinRoom} name={name} role={role} error={error} />
          }

        </div>
      </div>
    {/* <PlayerRoom room={room} joinRoom={joinRoom} name={name} role={role} /> */}
    </div>
  );
}

export default App
