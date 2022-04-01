import { Container, Image } from "react-bootstrap";

function Hero() {
  return (
    <Container>
      <div className="hero-grid-container mb-4">
        <div className="hero-grid-item p-4 d-flex flex-column justify-content-center align-items-center my-4">
          <Image src="./images/edit.png" rounded className="hero-image" />
          <p>Register</p>
        </div>
        <div className="hero-grid-item p-4 d-flex flex-column justify-content-center align-items-center my-4">
          <Image src="./images/share.png" rounded className="hero-image" />
          <p>Login</p>
        </div>

        <div className="hero-grid-item p-4 d-flex flex-column justify-content-center align-items-center my-4">
          <Image src="./images/verify.png" rounded className="hero-image" />
          <p>Manage your TODOs</p>
        </div>
      </div>
      <p className="m-4 p-4 text-center">
        This very simple app is for everyone to manage a TODO list. Don't
        drop sheets on the way or struggle to remember tasks anymore. With your phone in
        hand, todo list manager enable you to always have your todo list with you.
      </p>
    </Container>
  );
}

export default Hero;
