export default function Toggle() {
  return (
    <label
      htmlFor="AcceptConditions"
      className="relative h-6 w-12 cursor-pointer">
      <input type="checkbox" id="AcceptConditions" className="peer sr-only" />

      <span className="absolute inset-0 rounded-full bg-white transition peer-checked:bg-[#cbd3f3]"></span>

      <span className="absolute inset-0 mx-1 mt-[2px] h-5 w-5 rounded-full bg-[#cbd3f3] transition peer-checked:translate-x-5 peer-checked:bg-white"></span>
    </label>
  )
}



