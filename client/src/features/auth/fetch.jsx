import axios from "axios";

export default function fetch() {
  const result = async () =>
    await axios.post("http://localhost:5000/fetch", {
      fetchthis: "ok",
    });

  return <div></div>;
}
