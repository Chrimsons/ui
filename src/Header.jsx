import ProfilePicture from "./img/snswhomepage.JPG";

export default function Header() {
  return (
    <div>
      <img
        className="mx-auto object-contain w-32"
        src={ProfilePicture}
        alt="MyServiceNSW Account"
      />
      <p className="text-center font-semibold pb-10">
        MyServiceNSW Account
      </p>
    </div>
  );
}