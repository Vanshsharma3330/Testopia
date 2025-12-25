import handleTextboxSize from "../../../helpers/handleTextboxSize";

export default function QueTitle({ form }) {
  const handleSize = (e) => {
    handleTextboxSize(e, 90);

    form.onChange(e);
  };

  return (
    <textarea
      type="text"
      {...form}
      onChange={(e) => {
        handleSize(e);
      }}
      className="p-2 bg-[#F3F3F3] resize-none h-[90px] w-[100%] overflow-hidden font-Satoshi-Medium text-md !leading-6 outline-none rounded-sm"
      placeholder="Type your question here"
    />
  );
}
