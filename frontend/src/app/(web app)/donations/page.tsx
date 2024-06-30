import DonateApp from "../../../components/payment/DonateApp";

export default function App() {
  return (
    <div
      className="w-full h-[100vh] flex justify-center items-center"
      style={{
        backgroundImage:
          "url(https://firebasestorage.googleapis.com/v0/b/flot-dev.appspot.com/o/static-uploads%2Fimage.png?alt=media&token=44407612-8c8e-492a-988a-2c211d2926bb)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <DonateApp />
    </div>
  );
}
