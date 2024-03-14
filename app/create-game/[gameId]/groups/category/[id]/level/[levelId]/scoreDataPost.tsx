"use server";
export default async function PostScoreData(postScoreData: any) {
  const res = await fetch("https://api.fnvr.ir/api/v1/games/game", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postScoreData),
  });
  if (!res.ok) {
    throw new Error("Failed to send data");
  }
  return res.json();
}
