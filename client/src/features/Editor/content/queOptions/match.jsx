import { RearrangeableItem } from "../../../../shared/components/rearrangeable";

export default function Match({ i, match, remove, handleChanges }) {
  return (
    <div className="mt-3 mb-3">
      <RearrangeableItem
        i={i}
        value={match}
        remove={remove}
        handleChanges={handleChanges}
      >
        <input
          type="text"
          value={match.field}
          className="font-Satoshi-Medium text-md outline-none w-[100%] pl-4 pr-4 p-[2.5px] rounded-sm bg-[#F3F3F3]"
          onChange={(e) => handleChanges(e, "field")}
        />
        <input
          type="text"
          value={match.match}
          className="font-Satoshi-Medium text-md outline-none w-[100%] pl-4 pr-4 p-[2.5px] rounded-sm bg-[#F3F3F3]"
          onChange={(e) => handleChanges(e, "match")}
        />
      </RearrangeableItem>
    </div>
  );
}
