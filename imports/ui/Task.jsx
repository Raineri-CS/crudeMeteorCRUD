import React from 'react';

export const Task = ({ task, onCheckboxClick, onDeleteClick, onEditClick }) => {
  return (
    <tr className='tabelaDeDentro'>
      <td>
        <input
          type="checkbox"
          checked={!!task.isChecked}
          onClick={() => onCheckboxClick(task)}
          readOnly
        />
        <span>
          {task.ID}
        </span>
      </td>   
      <td>{task.nome}</td>
      <td>{task.qty}</td>
      <td>{task.price}</td>
      <td>
        <button title="Remover" className="remove" onClick={() => onDeleteClick(task)}>&times;</button>
        <button title="Editar" className="edita" onClick={() => onEditClick(task)}>&times;</button>
      </td>

    </tr>
  );
};
