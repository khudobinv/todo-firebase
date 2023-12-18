import { useState } from "react";
import { Input } from "./UI/Input";
import { Button } from "./UI/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ type: "", messageText: "" });

  const loginUser = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        setMessage({ type: "error", messageText: "Ошибка при входе!" });
        console.log(error.message);
      });
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="bg-slate-800 px-7 py-6 rounded-3xl w-80 sm:w-96">
        {message && message.type === "error" && (
          <div className="bg-red-900 rounded-xl text-white p-3 mb-2">
            {message.messageText}
          </div>
        )}
        <h1 className="text-3xl font-bold text-white">Авторизация</h1>
        <Link to="/register">
          <p className="text-slate-300 text-sm underline decoration-dotted">
            Еще нет аккаунта? Зарегистрироваться!
          </p>
        </Link>
        <form className="flex flex-col mt-2 gap-3" onSubmit={loginUser}>
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
          <Button>Авторизоваться</Button>
        </form>
      </div>
    </div>
  );
};
