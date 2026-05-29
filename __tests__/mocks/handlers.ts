import { http, HttpResponse } from "msw";
import { makeApiResponse, makeTodo, makePagedResult } from "./factories";

const BASE = "http://localhost:8080";

export const handlers = [
  http.get(`${BASE}/api/todos`, () =>
    HttpResponse.json(makeApiResponse(makePagedResult([makeTodo()]))),
  ),

  http.get(`${BASE}/api/todos/:id`, ({ params }) =>
    HttpResponse.json(makeApiResponse(makeTodo({ id: String(params.id) }))),
  ),

  http.post(`${BASE}/api/todos`, () =>
    HttpResponse.json(makeApiResponse(makeTodo({ title: "Created Todo" }))),
  ),

  http.put(`${BASE}/api/todos/:id`, ({ params }) =>
    HttpResponse.json(makeApiResponse(makeTodo({ id: String(params.id) }))),
  ),

  http.delete(`${BASE}/api/todos/:id`, () => new HttpResponse(null, { status: 204 })),

  http.get(`${BASE}/health`, () => new HttpResponse(null, { status: 200 })),
];
