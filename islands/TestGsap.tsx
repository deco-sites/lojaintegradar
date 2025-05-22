import { gsap } from "gsap";

const move = () => {
  console.log("moved");
  gsap.to(".box", {
    x: 200,
  });
};


export default function TestGsap() {
  return (
    <div>
      <button onClick={move}>
        Move
      </button>

      <div className="min-h-screen bg-purple-400 flex justify-center items-center">
        <div className="h-10 w-10 bg-green-400 box"></div>
      </div>
    </div>
  );
}