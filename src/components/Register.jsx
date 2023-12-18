import { useState } from "react";
import { Input } from "./UI/Input";
import { Button } from "./UI/Button";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const avatars = [
    "./avatars/Hatching Chick.svg",
    "./avatars/Hedgehog.svg",
    "./avatars/Lion.svg",
    "./avatars/Monkey Face.svg",
    "./avatars/Orangutan.svg",
    "./avatars/Owl.svg",
    "./avatars/Panda.svg",
  ];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [message, setMessage] = useState({ type: "", messageText: "" });

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      if (password === checkPassword) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await updateProfile(userCredential.user, {
          displayName: name,
          photoURL: avatars[Math.floor(Math.random() * avatars.length)],
        });

        navigate("/home");
      } else {
        setMessage({ type: "error", messageText: "Пароли не совпадают!" });
      }
    } catch (error) {}
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="bg-slate-800 px-7 py-6 rounded-3xl w-80 sm:w-96">
        {message && message.type === "error" && (
          <div className="bg-red-900 rounded-xl text-white p-3 mb-2">
            {message.messageText}
          </div>
        )}
        <h1 className="text-3xl font-bold text-white">Регистрация</h1>
        <Link to="/login">
          <p className="text-slate-300 text-sm underline decoration-dotted">
            Уже есть аккаунт? Войти!
          </p>
        </Link>
        <form className="flex flex-col mt-2 gap-3" onSubmit={registerUser}>
          <Input
            type="text"
            label="Имя"
            placeholder="Введите ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            label="Адрес электронной почты"
            placeholder="Введите адрес электронной почты"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            label="Пароль"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            label="Повтор пароля"
            placeholder="Введите пароль еще раз"
            value={checkPassword}
            onChange={(e) => setCheckPassword(e.target.value)}
          />
          <Button>Зарегистрироваться</Button>
        </form>
      </div>
    </div>
  );
};
