import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';

export const TaskForm = () => {
  const [numID, setNumID] = useState('');
  const [nameText, setNameText] = useState('');
  const [number, setNumber] = useState('');
  const [floatNumber, setFloatNumber] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (!(numID,nameText,number,floatNumber)) return;
    
    Meteor.call('tasks.insert', numID,nameText,number,floatNumber);

    setNumID('');
  };
  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        required
        id="numID"
        type="number"
        placeholder="ID"
        value={numID}
        onChange={e => setNumID(e.target.value)}
      />
      <input
        required
        id="nomeProd"
        type="text"
        placeholder="Nome"
        value={nameText}
        onChange={e => setNameText(e.target.value)}
      />
      <input
        required
        id="qtdProd"
        type="number"
        min='1'
        placeholder="Quantidade"
        value={number}
        onChange={e => setNumber(e.target.value)}
      />
      <input
        required
        id="prc"
        type="number"
        min='0'
        step="0.01"
        placeholder="Preco"
        value={floatNumber}
        onChange={e => setFloatNumber(e.target.value)}
      />
      <button type="submit">Salvar</button>
    </form>
  );
};
