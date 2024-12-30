import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";
import { useStorage } from "@vueuse/core";
import boardData from "~/data/board.json";

export const useBoardStore = defineStore("boardStore", () => {
  const board = useStorage("board", boardData);

  const getTask = computed(() => {
    return (taskId: string) => {
      for (const column of board.value.columns) {
        const task = column.tasks.find((task) => task.id === taskId);
        if (task) {
          return task;
        }
      }
    };
  });

  const addColumn = (columnName: string) => {
    board.value.columns.push({
      id: uuid(),
      name: columnName,
      tasks: [],
    });
  };

  const deleteColumn = (columnIndex: number) => {
    board.value.columns.splice(columnIndex, 1);
  };

  const addTask = ({
    taskName,
    columnIndex,
  }: {
    taskName: string;
    columnIndex: number;
  }) => {
    board.value.columns[columnIndex].tasks.push({
      id: uuid(),
      name: taskName,
      description: "",
    });
  };

  const deleteTask = (taskId: string) => {
    for (const column of board.value.columns) {
      const taskIndex = column.tasks.findIndex((task) => task.id === taskId);

      if (taskIndex !== -1) {
        column.tasks.splice(taskIndex, 1);
        return;
      }
    }
  };

  const moveTask = ({ taskIndex, fromColumnIndex, toColumnIndex }) => {
    const task = board.value.columns[fromColumnIndex].tasks.splice(taskIndex, 1)[0];

    board.value.columns[toColumnIndex].tasks.push(task);
  };
  return {
    /* State*/
    board,
    /* Getters */
    getTask,
    /* Actions */
    addTask,
    deleteTask,
    addColumn,
    deleteColumn,
    moveTask,
  };
});
