// function과 state를 return 할 것이다.
// react hook
// client에서 넘어온 data를 백엔드로 POST, GET fetch를 해줄 수 잇게 만든다.

import { prepareServerlessUrl } from "next/dist/server/base-server";
import { useState } from "react";

// useMutation은 첫번째 인자로 함수를 받고 그 안에 client의 데이터를 받아올 것이다.
// 그 후 loading, data, error를 반환해 준다.

// 그러기 위해 useMutation을 사용한 곳에서 url을 받는다. (mutate하는 페이지 위치)

interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}

type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>];

export default function useMutation<T = any>(
  url: string
): UseMutationResult<T> {
  const [state, setState] = useState({
    loading: false,
    data: undefined,
    error: undefined,
  });

  function mutation(data: any) {
    setState((prev) => ({ ...prev, loading: true }));

    // 백엔드로 데이터를 fetch하여  POST 요청 보낸다.
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => {}))
      .then((data) => setState((prev) => ({ ...prev, data })))
      .catch((error) => setState((prev) => ({ ...prev, error })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }
  return [mutation, { ...state }];
}
