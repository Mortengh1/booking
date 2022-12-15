import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import $ from "jquery";
import parse from "html-react-parser";
import regImg from "../images/restaurantbooking.jpg";

const Registration = () => {
  function RegistrationFunc() {
    const navigate = useNavigate();
    const initialValues = {
      firstname: "",
      lastname: "",
      mail: "",
      age: "",
      phonenr: "",
      pwd: "",
      resite: "",
    };
    const [signupValues, setSignupValues] = useState(initialValues);
    const [signupErrors, setSignupErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(true);

    //Sets the signup values on change
    const handleChange = (e) => {
      const { name, value } = e.target;
      setSignupValues({ ...signupValues, [name]: value });
    };

    const handleSumbit = (e) => {
      e.preventDefault();
      const form = $(e.target);
      $.ajax({
        type: "POST",
        url: form.attr("action"),
        data: form.serialize(),
        success(data) {
          setResult(data);
          setLoading(false);
        },
      });
      // loadData();
      setSignupErrors(validateSignup(signupValues));
      setIsSubmit(true);
    };

    useEffect(() => {
      if (Object.keys(signupErrors).length === 0 && isSubmit) {
        console.log(signupValues);
      }
    }, [signupErrors]);

    const validateSignup = (values) => {
      //Sets errors if fields is empty
      const errors = {};
      const regex = /^\S+@\S+\.\S+$/;
      if (!values.firstname) {
        errors.firstname = "Fornavn skal udfyldes";
      }
      if (!values.lastname) {
        errors.lastname = "Efternavn skal udfyldes";
      }
      if (!values.mail) {
        errors.mail = "E-mail skal udfyldes";
      } else if (!regex.test(values.mail)) {
        errors.mail = "E-mail er ikke gyldig";
      }
      if (!values.age) {
        errors.age = "Alder skal udfyldes";
      }
      if (!values.phonenr) {
        errors.phonenr = "Tlf. nr. skal udfyldes";
      }
      if (!values.pwd) {
        errors.pwd = "Kodeord skal udfyldes";
      }
      if (values.pwd && values.pwd != values.resite) {
        errors.resite = "Kodeordene er ikke ens";
      }

      return errors;
    };

    return (
      //If there is no errors, it navigates you to the login page
      <div className="App">
        {Object.keys(signupErrors).length === 0 &&
        loading === false &&
        Object.keys(result).length === 0 &&
        isSubmit
          ? navigate("/login")
          : []}

        <div className="RegistrationContainer">
          <div className="FormContainer">
            <div className="Image">
              <img src={regImg} alt="Registration image" />
            </div>
            <form
              className="RegistrationForm"
              //The php file that handels signups
              action="https://skole.mortengh.dk/PHP/signup.php"
              method="post"
              onSubmit={(event) => handleSumbit(event)}
            >
              <h1>Registrer</h1>
              {result && <div>{parse(result)}</div>}

              <div className="Inputs">
                <div>
                  <input
                    placeholder="Fornavn"
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={signupValues.firstname}
                    onChange={(event) => handleChange(event)}
                  />
                  <p className="FormError">{signupErrors.firstname}</p>
                </div>
                <div>
                  <input
                    placeholder="Efternavn"
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={signupValues.lastname}
                    onChange={(event) => handleChange(event)}
                  />
                  <p className="FormError">{signupErrors.lastname}</p>
                </div>
                <div>
                  <input
                    placeholder="E-mail"
                    type="text"
                    id="mail"
                    name="mail"
                    value={signupValues.mail}
                    onChange={(event) => handleChange(event)}
                  />
                  <p className="FormError">{signupErrors.mail}</p>
                </div>
                <div>
                  <input
                    placeholder="Alder"
                    type="text"
                    id="age"
                    name="age"
                    value={signupValues.age}
                    onChange={(event) => handleChange(event)}
                  />
                  <p className="FormError">{signupErrors.age}</p>
                </div>
                <div>
                  <input
                    placeholder="Tlf. nr."
                    type="tel"
                    id="phonenr"
                    name="phonenr"
                    value={signupValues.phonenr}
                    onChange={(event) => handleChange(event)}
                  />
                  <p className="FormError">{signupErrors.phonenr}</p>
                </div>
                <div>
                  <input
                    placeholder="Kodeord"
                    type="password"
                    id="pwd"
                    name="pwd"
                    value={signupValues.pwd}
                    onChange={(event) => handleChange(event)}
                  />
                  <p className="FormError">{signupErrors.pwd}</p>
                </div>
                <div>
                  <input
                    placeholder="Gentag Kodeord"
                    type="password"
                    id="resite"
                    name="resite"
                    value={signupValues.resite}
                    onChange={(event) => handleChange(event)}
                  />
                  <p className="FormError">{signupErrors.resite}</p>
                </div>
                <button className="btn" type="submit">
                  Registrer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return RegistrationFunc();
};

export default Registration;
