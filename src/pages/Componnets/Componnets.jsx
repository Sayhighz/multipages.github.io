import { Counter } from "../../components/Counter";
import { Timer } from "../../components/Timer";
import { Variable } from "../../components/Variable";
import { Temperature } from "../../components/Temperature";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";

function Componnets() {
  return (
    <>
      <div className="container-xxl h-100">
        <div className="bg-dark">
        <h1 className="text-white">REACT COMPONNETS</h1>
        </div>
        <div className="d-flex">
          <div className="d-flex flex-column">
          <Counter></Counter>
          <Timer name={"T"} value={120}></Timer>
          </div>
          <div className="w-100 h-30 align-items-center">
        <Variable a={5} b={6}></Variable>
          </div>
        </div>
        <div>
          <Temperature celsius={20}></Temperature>
        </div>
        <div className="bg-dark">
        <h5 className="text-white">66031043 ประธาน นิลสนธิ์</h5>
        </div>
      </div>
    </>
  );
}

export default Componnets;
