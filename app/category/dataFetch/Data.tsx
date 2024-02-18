async function getData() {
  const res = await fetch("https://random-word-api.herokuapp.com/word");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Data() {
  const data = await getData();

  return <main>{data}</main>;
}
