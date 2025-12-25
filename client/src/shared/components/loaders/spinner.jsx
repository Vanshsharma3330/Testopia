import "./loaders.css";

export default function Spinner({ text }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="spinner"></div>
      <p className="font-Satoshi-Bold">{text}</p>
    </div>
  );
}
