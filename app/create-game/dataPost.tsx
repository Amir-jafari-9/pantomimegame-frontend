"use server";
export default async function PostData(postData: any) {
  const res = await fetch("https://api.fnvr.ir/api/v1/games/new-game", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });
  if (!res.ok) {
    throw new Error("Failed to send data");
  }
  return res.json();
}

