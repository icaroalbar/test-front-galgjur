"use client";

import { useSession } from "next-auth/react";

export default function Dashboard() {
  const {data}: any = useSession();
  const user = data?.user;
  return (
    <>
      {!data ? (
        <p>Loading...</p>
      ) : (
        <div className="">
          <h3 className="scroll-m-20 text-2xl font-semibold capitalize tracking-tight">
            dashboard
          </h3>
          <div className="mt-8">
            <p className="mb-3"> IdToken: {data.id_token.split("W")[0]}...</p>
            <p className="mb-3"> AcessToken: {data.access_token.split("W")[0]}... </p>
          </div>
        </div>
      )}
    </>
  );
}
