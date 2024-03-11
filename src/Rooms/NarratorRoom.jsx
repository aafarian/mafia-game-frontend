import React, { useState } from 'react';


function NarratorRoom({ room, players, assignRoles, error, resetError }) {
  const [roles, setRoles] = useState([]);
  const [mafia, setMafia] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [sheriffs, setSheriffs] = useState([]);
  const [civilians, setCivilians] = useState([]);

  function pushMafia(number) {
    resetError();
    let currMafia = [];
    for (let i=0; i<number; i++) {
      currMafia.push('Mafia');
    };
    setMafia(currMafia);
  }
  function pushDoctor(number) {
    resetError();
    let currDoctors = [];
    for (let i=0; i<number; i++) {
      currDoctors.push('Doctor');
    };
    setDoctors(currDoctors);
  }
  function pushSheriff(number) {
    resetError();
    let currSheriffs = [];
    for (let i=0; i<number; i++) {
      currSheriffs.push('Sheriff');
    };
    setSheriffs(currSheriffs);
  }
  function pushCivilian(number) {
    resetError();
    let currCivilians = [];
    for (let i=0; i<number; i++) {
      currCivilians.push('Civilian');
    };
    setCivilians(currCivilians);
  }
  function handleAssignClicked() {
    const concattedRoles = roles.concat.apply([], [mafia, doctors, sheriffs, civilians]);
    assignRoles(concattedRoles);
  }

  return (
    <>
      <span style={{ fontSize: '24px', marginBottom: '16px' }}>
        Room Code:&nbsp;
        <span style={{ color: 'purple', fontWeight: 'bold' }}>
          {room}
        </span>
      </span>
      <div style={{ color: 'red' }}>
        { error }
      </div>
      {Array.isArray(players) &&
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '250px', marginBottom: '12px', border: '1px solid black', padding: '12px' }}>
            <span style={{ fontWeight: 'bold', fontSize: '18px' }}>Amount of roles:</span>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginTop: '16px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    Mafia:&nbsp;
                  </div>
                  <div>
                    <input placeholder="Mafia" onChange={(e) => pushMafia(e.target.value)} />
                  </div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    Doctors:&nbsp;
                  </div>
                  <div>
                    <input placeholder="Doctors" onChange={(e) => pushDoctor(e.target.value)} />
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      Sheriffs:&nbsp;
                    </div>
                    <div>
                      <input placeholder="Sheriffs" onChange={(e) => pushSheriff(e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    Civilians:&nbsp;
                  </div>
                  <div>
                    <input placeholder="Civilians" onChange={(e) => pushCivilian(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ width: '250px', border: '1px solid black', padding: '12px', marginBottom: '12px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '12px' }}>Players:</div>
              {players.map((player) => {
                if (player.role !== 'Narrator') {
                  return (<div key={`${player.id}_${player.name}`} style={{ display: 'flex' }}>
                    <div>
                      {player.name}&nbsp;-&nbsp;
                    </div>
                    <div>
                      {player.role || 'No role yet'}
                    </div>
                  </div>)
                }
              })}
          </div>
        </div>
      }
      <button onClick={handleAssignClicked}>Assign roles and start game</button>
    </>
  )

  // Your JSX goes here, same as before but possibly without the <p>Your role: {role}</p>
}

export default NarratorRoom;