// Helper function to join conditional classnames
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type DonationSelectorProps = {
  monetary: boolean;
  setMonetary: (value: boolean) => void;
};

export default function DonationSelector({ monetary, setMonetary }: DonationSelectorProps) {
  // true => Monetary, false => Physical

  return (
    <div className="py-8">
      <div className="sm:hidden">
        <label htmlFor="donation-type" className="sr-only">
          Select donation type
        </label>
        <select
          id="donation-type"
          name="donation-type"
          className="block w-full focus:ring-[#694C97] focus:border-[#694C97] border-gray-300 rounded-md"
          defaultValue={monetary ? "Monetary" : "Physical"}
          onChange={(e) => {
            setMonetary(e.target.value === "Monetary");
          }}
        >
          <option>Monetary</option>
          <option>Physical</option>
        </select>
      </div>
      <div className="hidden sm:block">
        <div
          className="isolate flex divide-x divide-gray-200 rounded-lg border-gray-300 border-2"
          aria-label="Donation type"
          style={{ height: "75px" }}
        >
          <button
            key="monetary"
            className={classNames(
              monetary
                ? "text-white font-bold"
                : "text-black hover:text-gray-700 bg-white font-medium",
              "group relative min-w-0 flex-1 overflow-hidden rounded-l-lg p-4 text-center text-sm hover:bg-gray-50 focus:z-10 cursor-pointer",
            )}
            onClick={() => {
              setMonetary(true);
            }}
            style={{
              fontFamily: "Open Sans, sans-serif",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "150%", // 30px
              letterSpacing: "0.8px",
            }}
          >
            <span className="relative z-20 cursor-pointer">Monetary</span>
            <span
              aria-hidden="true"
              className={classNames(
                monetary ? "w-full" : "bg-transparent w-0",
                "bg-[#694C97] absolute bottom-0 right-0 h-full",
                "z-0 transition-all duration-300",
              )}
            />
          </button>
          <button
            key="physical"
            className={classNames(
              !monetary
                ? "text-white font-bold"
                : "text-black hover:text-gray-700 bg-white font-medium",
              "group relative min-w-0 flex-1 overflow-hidden rounded-r-lg p-4 text-center text-sm hover:bg-gray-50 focus:z-10 cursor-pointer",
            )}
            onClick={() => {
              setMonetary(false);
            }}
            style={{
              fontFamily: "Open Sans, sans-serif",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "150%", // 30px
              letterSpacing: "0.4px",
            }}
          >
            <span className="relative z-20 cursor-pointer">Physical</span>
            <span
              aria-hidden="true"
              className={classNames(
                !monetary ? "w-full" : "w-0",
                "bg-[#694C97] absolute inset-x-0 bottom-0 h-full",
                "z-0 transition-all duration-300",
              )}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
