import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import TaskList from "./components/TaskList/TaskList";

import "./styles.css";

/**
 * Definindo uma estrutura de uma tarefa(task)
 */
/*const task = {
  id: 0,
  title: "Nova tarefa",
  state: "Pendente"
};*/

/**Gerando id */
let idACC = 0;
const generateID = () => {
  idACC = idACC + 1;
  return idACC;
};

export default function App() {
  /** F1 - Criar a estrutura de segurar as tarefas como um container */
  const [tasks, setTasks] = useState([]);
  /** F1 */

  /** F2 - Criar uma funcão que adiciona a nova tarefa */
  const addTask = (title, state) => {
    const newTask = {
      id: generateID(),
      title,
      state
    };
    /** F2 */

    /**Adicionando a nova tarefa a nossa lista de tarefas Task */
    setTasks((exitingTasks) => {
      return [...exitingTasks, newTask];
    });
  };

  /**Função para controlar o onTaskUpdate */
  const updateTask = (id, title, state) => {
    setTasks((exitingTasks) => {
      return exitingTasks.map((task) => {
        if (task.id === id) {
          return { ...task, title, state };
        } else {
          return task;
        }
      });
    });
  };

  /**Função para apagar a tarefa */
  const deleteTask = (id) => {
    setTasks((exitingTasks) => {
      /**deixaremos na lista somente os id diferente do passado */
      return exitingTasks.filter((task) => task.id !== id);
    });
  };

  return (
    /**
     * A redericção será a partir da DIV principal, ou seja, se colocarmos
     * outra tab por fora da div APP o react acusará erro.
     *
     * Dentro do parametro title podemos usar o formato string "Pendente" e também no
     * formato de javascript {`Fazendo`}
     *
     * Passamos a lista de tarefa com uma props,
     *
     *  F3 - Nosso componente tasklist que fica encarregado de chamar a função
     *
     * Para filtrar cada grupo de tarefas, usamos o metodo filter baseado no
     * estado dela: tasks={tasks.filter((t) => t.state === "Pendente")}
     *
     */
    <div className="App">
      <Navbar />
      <div className="container">
        <TaskList
          title="Pendente"
          taskState="Pendente"
          onAddTask={addTask}
          tasks={tasks.filter((t) => t.state === "Pendente")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />
        <TaskList
          title="Fazendo"
          taskState="Fazendo"
          onAddTask={addTask}
          tasks={tasks.filter((t) => t.state === "Fazendo")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />
        <TaskList
          title="Completa"
          taskState="Completa"
          onAddTask={addTask}
          tasks={tasks.filter((t) => t.state === "Completa")}
          onTaskUpdate={updateTask}
          onDeleteTask={deleteTask}
        />
      </div>
    </div>
    /** F3 */
  );
}
