import Link from "next/link";
import Button from "@mui/material/Button";
// 試しにコメントを追加
export default function Home() {
  return (
    <div>
      <h1>トップページ</h1>
      <Button component={Link} href="/signup" variant="contained">
        新規登録
      </Button>
    </div>
  );
}
