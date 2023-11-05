import Link from "next/link";
import React from "react";
import RootLayout from "../RootLayout";

const videoPage = () => {
  return (
    <RootLayout>
      <Link href="/camera">
        <div>이전 페이지</div>
      </Link>
      <div>오늘의 집중 상태</div>
    </RootLayout>
  );
};

export default videoPage;
