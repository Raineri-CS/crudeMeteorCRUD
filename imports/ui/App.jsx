import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { ProdCollection } from '/imports/db/ProdCollection';
import { Task } from './Task';
import { TaskForm } from './TaskForm';
import { LoginForm } from './LoginForm';

const toggleChecked = ({ _id, isChecked }) =>
  Meteor.call('tasks.setIsChecked', _id, !isChecked);

const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id);
const prodClear = () => Meteor.call('tasks.clear'); //FIXME
const editTask = ({ _id }) => {
  const newProd = ProdCollection.findOne({_id});
  document.getElementById("numID").value = newProd.ID;
  document.getElementById("nomeProd").value = newProd.nome;
  document.getElementById("qtdProd").value = newProd.qty;
  document.getElementById("prc").value = newProd.price;
  this.forceUpdate; //GAMBIARRA, DO NOT COPY
}

export const App = () => {
  const user = useTracker(() => Meteor.user());

  const hideCompletedFilter = { isChecked: { $ne: true } };

  const userFilter = user ? { userId: user._id } : {};

  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe('tasks');

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const tasks = ProdCollection.find(
      
    ).fetch();
    const pendingTasksCount = ProdCollection.find(pendingOnlyFilter).count();

    return { tasks, pendingTasksCount };
  });

  const produtosRegistrados = `${
    pendingTasksCount ? ` (${pendingTasksCount})` : ''
  }`;

  const logout = () => Meteor.logout();

  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>
              Dashboard de produtos 📝️
              {produtosRegistrados}
            </h1>
          </div>
        </div>
      </header>

      <div className="main">
        {user ? (
          <Fragment>
            <div className="user" onClick={logout}>
              {user.username} 🚪
            </div>

            <TaskForm />

          
            {isLoading && <div className="loading">loading...</div>}
          
          <div className="table-container">
            <div className="remove-all">
              <button onClick={() => prodClear}>
                Remover Todos
              </button>
            </div>
    
            
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Quantidade</th>
                  <th>Preço</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
              
                {tasks.map(task => (
                  <Task
                  key={task._id}
                  task={task}
                  onCheckboxClick={toggleChecked}
                  onDeleteClick={deleteTask}
                  onEditClick={editTask}
                  />
                  ))}
                
              </tbody>
            </table>
          </div>
          </Fragment>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
};
