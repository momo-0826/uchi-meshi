import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// ブラウザ用の偽サーバーを組み立てる
export const worker = setupWorker(...handlers);
