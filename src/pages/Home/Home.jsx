import profile from "../../assets/profile.jpeg";

const Home = () => {
  return (
    <>
      <div className="container border" style={{height: "640px",width: "1020px"}}>
        <div className="d-flex p-3 justify-content-center">
        <img
          src={profile}
          alt=""
          className="rounded-circle"
          style={{height: "300px", width: "300px", objectFit: "cover" }}
        />
        <div className="d-flex justify-content-center m-5 w-50">
          <p className="text-start fs-2">
          My name is Pratan Nilson, a second-year Computer Science and
          Software Innovation student at Sripatum University.
          </p>
        </div>
        </div>
      </div>
    </>
  );
};

export default Home;
