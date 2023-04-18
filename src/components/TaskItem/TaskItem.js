import React, { useState } from "react";
import PropTypes from "prop-types";
import { BsListTask } from "react-icons/bs";
import "./task-item.css";
import "../../bootstrap.css";

/**Construindo a estrutura do componente, teremos como parametro
 * um identificador, um titulo e o estado da tarefa
 *
 * Para atualizar a tarefa e passar para o componente que receberá, utilizaremos
 * a props onTaskUpdate que passaremos para o TaskList
 */
export default function TaskItem({
  id,
  title,
  taskState,
  onTaskUpdate,
  onDeleteTask
}) {
  /**Para saber quando o componente ira apenas mostrar a tarefa e o mesmo irá
   * editar a mesma, usaremos state para monitorar
   *
   * isEditing será a chave que controla a visualização ou edição
   * setIsEditing é a função responsavel por mudar/alterar a flag
   * e o state inicial
   */
  const [isEditing, setIsEditing] = useState(false);

  /**Conseguindo editar a tarefa */
  const [editableTitle, setEditableTitle] = useState(title);

  /**Declarando a função do onchange */
  const onTitleChange = (event) => {
    /**Pegando o conteudo do texto */
    const newTitle = event.target.value;

    /**Mudando o texto */
    setEditableTitle(newTitle);

    /**Sempre que mudar o titulo chamamos o  onTaskUpdate*/
    onTaskUpdate(id, title, taskState);
  };

  /**Declarndo a função para parar a edição usando o enter */
  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      setIsEditing(false);
      if (editableTitle.length === 0) {
        onDeleteTask(id);
      }
    }
  };

  /**Trabalhando com select */
  const onTaskStateChange = (event) => {
    onTaskUpdate(id, title, event.target.value);
  };

  /**Uma condicional para verificar qual opção será restornada/renderizada
   * No onclic da div podemos usar uma eromfuncion para mudar o state
   */
  if (isEditing) {
    return (
      <div className="task-item">
        <input
          className="form-control"
          placeholder="Tarefa"
          aria-label="Tarefa"
          aria-describedby="basic-addon2"
          type="text"
          value={editableTitle}
          onChange={onTitleChange}
          onKeyPress={onKeyPress}
        />
      </div>
    );
  } else {
    return (
      <div className="task-item">
        <div onClick={(e) => setIsEditing(true)}>{editableTitle}</div>
        <select
          className="form-select form-select-sm"
          aria-label="Tarefas"
          onChange={onTaskStateChange}
          value={taskState}
        >
          <option defaultValue> Escolha</option>
          <option value="Pendente"> Pendente</option>
          <option value="Fazendo"> Fazendo</option>
          <option value="Completa"> Completa</option>
        </select>
      </div>
    );
  }
}

TaskItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  taskState: PropTypes.string.isRequired,
  onTaskUpdate: PropTypes.func.isRequired
};
