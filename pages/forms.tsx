// react-hook-form 연습하기

import { ErrorMessage } from "@hookform/error-message";
import React, { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";

// 코드 줄이기
// 더 나은 validation
// 더 나은 에러 코드(set, cliear, display)
// input에 대한 컨트롤
// 이벤트 처리 안하기

interface LoginForm {
  username: string;
  email: string;
  password: string;
  errors: string;
  multipleErrorInput: string;
}

export default function Formas() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<LoginForm>({
    mode: "onChange",
  });
  const onValid = (data: LoginForm) => {
    console.log("hi");
    // 백엔드를 POST로 fetch 한다.
    // 만약 거기서 에러가 난다면(데이터베이스 에러)
    setError("errors", { message: "백엔드가 잠자고 있습니다." });
    setError("username", { message: "이 username이 존재합니다." });
    reset();
  };
  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };
  console.log(errors);
  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <input
        {...register("username", {
          required: "Username is required",
          minLength: {
            message: "유저이름은 5글자 이상해주세요",
            value: 5,
          },
          pattern: {
            message: "문자와 숫자를 섞어 주세요.",
            value: /^[A-Za-z0-9]{6,12}$/,
          },
        })}
        type="text"
        placeholder="Username"
      />
      {/* <ErrorMessage
        errors={errors}
        name="multipleErrorInput"
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <p key={type}>{message}</p>
          ))
        }
      /> */}
      {errors.username && errors.username.type === "required" && (
        <span>this is required</span>
      )}
      {errors.username && errors.username.type === "minLength" && (
        <span>Min Length</span>
      )}
      {/* {errors.username?.message} */}
      <input
        {...register("email", {
          required: "Email is required",
          validate: {
            notGmail: (value) =>
              !value.includes("@gmail.com") || "Gmail은 안 됩니다.",
          },
        })}
        type="email"
        placeholder="Email"
        className={`${Boolean(errors.email?.message) ? "border-red-500" : ""}`}
      />
      {errors.email?.message}
      <input
        {...register("password", { required: "Password is required" })}
        type="password"
        placeholder="Password"
      />
      <input type="submit" value="create account" />
      {errors.errors?.message}
    </form>
  );
}

// 훅을 사용하지 않고 로그인 구현하기

// export default function Forms() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [formErrors, setFormErrors] = useState("");
//   const onUsernameChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setUsername(value);
//   };
//   const onEmailChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setEmail(value);
//   };
//   const onPasswordChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setPassword(value);
//   };
//   const onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
//     // 페이지 새로고침을 막아준다.
//     event.preventDefault();
//     if (username === "" || email === "" || password === "") {
//       setFormErrors("All field ar required");
//     }
//   };
//   return (
//     <form onSubmit={onSubmit}>
//       <input
//         type={username}
//         onChange={onUsernameChange}
//         placeholder="Username"
//         required
//         minLength={5}
//       />
//       <input
//         type={email}
//         onChange={onEmailChange}
//         placeholder="Email"
//         required
//       />
//       <input
//         type={password}
//         onChange={onPasswordChange}
//         placeholder="Password"
//         required
//       />
//       <input type="submit" value="create account" />
//     </form>
//   );
// }
