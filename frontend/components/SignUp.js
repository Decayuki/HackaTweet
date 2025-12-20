import styles from "../styles/Modale.module.css";
import { useSignUpMutation } from "../../Redux/Services/usersApi";
import { useState } from "react";

function SignUp() {
  // état du formulaire
  const [form, setForm] = useState({
    firstname: "",
    username: "",
    password: "",
  });
  // amorce de la mutation post + indicateur d'état
  const [signUp, { isLoading, isError }] = useSignUpMutation();
  const handleChange = (e) => {
    //mis à jour du form (e.target.name) via l'input (target.value)
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // fonction déclenchée au clic
  const handleSubmit = async () => {
    // Appelle l'API via les data de form
    // hook RTK
    const res = await signUp(form);
    
    if (!res.data?.result) {
      alert(res.data?.error || "Erreur"); // faudrait améliorer ça...
      return;
    }
    alert("Inscription réussie, bienvenue :)");
  };

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.logoContainer}>
          <img src="/logo.png" className={styles.logo} />
        </div>
        <span className={styles.texte}>
          <p>Create your Hackatweet account</p>
        </span>
        <div className={styles.informationContainer}>
          <input
            type="text"
            name="firstname"
            placeholder="Firstname"
            onChange={handleChange}
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <button
            className={styles.signUpButton}
            onClick={handleSubmit}
            // contre le spam
            disabled={isLoading}
          >
            Sign up
          </button>
        </div>
      </main>
    </div>
  );
}

export default SignUp;
