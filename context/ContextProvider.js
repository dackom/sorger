import React, {useState, useEffect} from 'react';
import AppContext from '.';
import {TodoistApi} from '@doist/todoist-api-typescript';
const api = new TodoistApi('ab9855583345f7886c83ac8d4afffe0832c7e975');

const ContextProvider = ({children}) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleCompleted = id => {
    let idx;
    list.some((v, kk) => {
      if (v.id === id) {
        idx = kk;
        return true;
      }
    });

    if (list[idx].completed) {
      list[idx].completed = false;
      api.reopenTask(id);
    } else {
      list[idx].completed = true;
      api.closeTask(id);
    }
    setList([...list]);
  };

  const findKey = id => {
    let idx;
    list.some((v, kk) => {
      if (v.id === id) {
        idx = kk;
        return true;
      }
    });

    return idx;
  };

  const updateTask = (id, content, priority) => {
    return new Promise((resolve, reject) => {
      api
        .updateTask(id, {content, priority})
        .then(isSuccess => {
          list[findKey(id)].content = content;
          list[findKey(id)].priority = priority;
          setList([...list]);
          resolve();
        })
        .catch(error => console.log(error));
    });
  };
  const addTask = data => {
    return new Promise((resolve, reject) => {
      api
        .addTask(data)
        .then(task => {
          list.push(task);
          setList([...list]);
          resolve();
        })
        .catch(error => console.log(error));
    });
  };

  const context = {
    list,
    setList,
    toggleCompleted,
    findKey,
    updateTask,
    loading,
    addTask,
  };

  useEffect(() => {
    api
      .getTasks()
      .then(tasks => {
        setList(tasks);
        setLoading(false);
      })
      .catch(error => console.log(error));
  }, []);

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export default ContextProvider;
