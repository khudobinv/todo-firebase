import React, { useEffect, useState } from "react";
import { Button } from "./UI/Button";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Input } from "./UI/Input";
import { uid } from "uid";
import { set, ref, remove, onValue } from "firebase/database";
import { Textarea } from "./UI/Textarea";
import { IconButton } from "./UI/IconButton";
import { FaRegTrashAlt } from "react-icons/fa";

export const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [todo, setTodo] = useState({ name: "", description: "" });
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setTodos([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((todo) => {
              setTodos((oldData) => [...oldData, todo]);
            });
          }
        });
      } else {
        navigate("/login");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const deleteTodo = (uid) => {
    remove(ref(db, `${auth.currentUser.uid}/${uid}`));
  };

  const signOutUser = () => {
    signOut(auth).catch((error) => console.log(error));
  };

  const writeToDatabase = (e) => {
    e.preventDefault();
    const id = uid();
    set(ref(db, `/${auth.currentUser.uid}/${id}`), {
      todo,
      id,
    });
    setTodo({ name: "", description: "" });
  };
  return (
    <div className="px-8">
      <div className="flex justify-between py-8 flex-col gap-3 sm:flex-row">
        {user && (
          <div className="flex flex-row gap-5 items-center">
            <div className="h-16 w-16 rounded-full bg-slate-800 flex justify-center items-center">
              <img className="h-10 w-10" src={user.photoURL} alt="" />
            </div>
            <div className="flex flex-col">
              <p className="text-lg text-white font-semibold">{user.displayName}</p>
              <p className="text-white">{user.email}</p>
            </div>
          </div>
        )}
        <Button onClick={signOutUser}>Выйти из аккаунта</Button>
      </div>
      <div className="bg-slate-800 px-7 py-6 rounded-3xl">
        <h1 className="text-white text-2xl sm:text-3xl font-bold">Создать задачу</h1>
        <form className="flex flex-col gap-2 mt-2" onSubmit={writeToDatabase}>
          <Input
            required="required"
            label="Название задачи"
            placeholder="Введите название задачи"
            type="text"
            value={todo.name}
            onChange={(e) => setTodo({ ...todo, name: e.target.value })}
          />
          <Textarea
            label="Описание задачи"
            placeholder="Введите описание задачи"
            value={todo.description}
            onChange={(e) => setTodo({ ...todo, description: e.target.value })}
          />
          <Button>Создать задачу</Button>
        </form>
      </div>
      <div className="bg-slate-800 px-7 py-6 rounded-3xl mt-5 flex flex-col gap-3">
        <h1 className="text-white text-2xl sm:text-3xl font-bold">Мои задачи</h1>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div className="bg-slate-900 p-5 rounded-3xl" key={todo.id}>
              <div className="bg-slate-900 p-2 rounded-3xl flex flex-row justify-between items-center">
                <div className="">
                  <h2 className="text-white text-xl">{todo.todo.name}</h2>
                  <p className="text-white">{todo.todo.description}</p>
                </div>
                <div className="flex gap-2">
                  <IconButton
                    icon={<FaRegTrashAlt className="text-red-500" />}
                    onClick={() => deleteTodo(todo.id)}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-row items-center justify-center gap-5">
            <img className="h-10" src="./See No Evil Monkey.svg" />
            <p className="text-white font-semibold">Задач пока нет!</p>
          </div>
        )}
      </div>
    </div>
  );
};
