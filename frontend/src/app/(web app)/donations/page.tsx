import DonateApp from "../../../components/payment/DonateApp";

export default function Donations() {
  return (
    <div
      className="w-full h-[220vh] flex justify-center items-start"
      style={{
        backgroundImage: "url(/donations/donationsbackground.png)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        paddingTop: "80px",
      }}
    >
      <DonateApp />
    </div>
  );
}
