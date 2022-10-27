import logo from "./logo.svg";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./App.css";
import Checkout from "./Checkout";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51IUXXCDiqzRRJDZd8jG4CJ4sGXL855Z3eflt7KeNbPd4HegsIh1Ed8MfD0X2koKckxzwq3mFpXNYgZFhobe4FFQd00tyByUEso"
);

function App() {
  // const options = {
  //   // passing the client secret obtained from the server
  //   clientSecret:
  // };
  return (
    <div className="App">
      <Elements stripe={stripePromise}>
        <Checkout />
      </Elements>
    </div>
  );
}

export default App;
