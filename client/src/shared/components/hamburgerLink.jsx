export default function HamburgerLink({ icon, title, action }) {
  return (
    <button
      className="flex text-sm font-Satoshi-Bold items-center cursor-pointer gap-2 p-2 pt-1 pb-1"
      onClick={action}
    >
      {icon}
      {title}
    </button>
  );
}
