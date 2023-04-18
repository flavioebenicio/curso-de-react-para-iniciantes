import React from "react";
import PropTypes from "prop-types";
import TaskItem from "../TaskItem/TaskItem";

import "./tasklist.css";
import "../../bootstrap.css";

import plusIcon from "../../img/plus-icon.svg";

/*
  usamos props nos parametros e para mais implicito quebramos(desustruturamos)
  as props, passando direto a variavel desejada.
  A props onTaskUpdate que vem do takitem também será passada para o renderizado
  do tasklist, o app.js
*/
export default function TaskList({
  title,
  taskState,
  onAddTask,
  tasks,
  onTaskUpdate,
  onDeleteTask
}) {
  /**Para usar o state precisa fazer a importação  useState. Também
   * usaremos funções para trabalhar, as chamadas hulks, eles sempre começam
   * com use.... useState, useCallback, etc.
   *
   * O useState retorna um array com dois elementos, nesse caso vamos desestruturar e passar
   * para duas variaveis. O primeiro elemento (count) é o estato que vc quer controlar e o segundo
   * elemento (setCount) é a função que consegui atualizar o state
   */
  //const [count, setCount] = useState(0);

  /**
   * Criaremos uma forma de acionar o botão. Primeiro criamos uma função de incremento usando lambida
   */
  // const increment = () => {
  /** chamamos a função increment que chama a função setCount do nosso state
   *  a função setCount() recebe como parametro outra função que passa para setCount o valor atual
   *  e retorno o novo valor. Para chamar a função incremet usamos o onclick do botão passando a referncia
   *  em javascript. Os componente tem o state independentes onde quer que ele seja chamado.
   */
  //  setCount((currentCount) => {
  //    return currentCount + 1;
  //  });
  //};

  /**Criando a função para chamar a tarefa */
  const addTask = () => {
    onAddTask("Nova Tarefa", taskState);
  };
  /** Renderizando a task no componente usando map, que transforma um
   * elemento em outro elemento.
   *
   * Sempre que renderizar o react precisa de um id unica para tarefa, unsando
   * a props key no componente
   */
  return (
    <div className="tasklist">
      <div className="title">{title}</div>
      <div className="content">
        {tasks.map((task) => {
          return (
            <TaskItem
              key={task.id}
              id={task.id}
              title={task.title}
              taskState={task.state}
              onTaskUpdate={onTaskUpdate}
              onDeleteTask={onDeleteTask}
            />
          );
        })}
        {tasks.length === 0 && <div className="empty-list">Lista Vazia</div>}

        <button onClick={addTask} className="btn">
          <img src={plusIcon} alt="Plus" />
          Adicionar Tarefas
        </button>
      </div>
    </div>
  );
}
/*
usando a biblioteca PropType para definir o tipo das props a serem 
passadas. Ela deve ser importada no projeto/arquivo

Defina uma varivel no componente que recebe um objeto que tipo
os tipos. Erro na utilização não impedira de usar o componente mas será
lançado um warning no console. 
*/
TaskList.propTypes = {
  title: PropTypes.string.isRequired,
  onAddTask: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
  onTaskUpdate: PropTypes.func.isRequired
};
