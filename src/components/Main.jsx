import React from "react";
import { Button } from "./UI/Button";
import { Link } from "react-router-dom";

export const Main = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="bg-slate-800 p-10 rounded-3xl flex flex-col sm:flex-row items-center justify-center gap-20">
        <img className="h-48 sm:h-96" src="./bg_hero.svg" />
        <div className="flex flex-col w-64 sm:w-96 gap-3">
          <h1 className="text-white text-3xl font-bold">
            Не забывайте о важном!
          </h1>
          <p className="text-white text-lg">
            Создайте аккаунт в нашем бесплатном приложении и отслеживайте
            выполнений ваших задач!
          </p>
          <Link to="/register">
            <Button>Зарегистрироваться</Button>
          </Link>
          <Link to="/login">
            <p className="text-slate-500 underline decoration-dotted">Уже есть аккаунт? Войдите!</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
