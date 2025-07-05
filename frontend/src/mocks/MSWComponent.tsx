"use client";

import { useEffect } from "react";

// このコンポーネントは開発モード時のみMSWを起動させる
// 画面に何も表示はしない
export const MSWComponent = () => {
  // useEffectでコンポーネントのマウント時に1回だけ実行する
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      // ブラウザ用の偽サーバーをインポート
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { worker } = require("./browser");
      worker.start();
    }
  }, []);
  return null;
};
