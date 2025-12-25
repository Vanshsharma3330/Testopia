import { RearrangeableItem } from "../../../../shared/components/rearrangeable";

export default function Blank({ i, blank, handleChanges, remove }) {
  return (
    <div className="mt-3 mb-3">
      <RearrangeableItem i={i} value={blank} remove={remove}>
        <input
          type="text"
          onChange={(e) => handleChanges(e)}
          value={blank.text}
          className="font-Satoshi-Medium text-md outline-none w-full ml-4 pl-4 pr-6 p-[2.5px] rounded-sm bg-[#F3F3F3]"
        />
      </RearrangeableItem>
    </div>
  );
}
