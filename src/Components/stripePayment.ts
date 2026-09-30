import { collection, doc, addDoc, onSnapshot } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

const db = getFirestore();

const docRef = await addDoc(
  collection(
    db,
    "customers",
    currentUser.uid,
    "checkout_sessions"
  ),
  {
    price: "price_1GqIC8HYgolSBA35zoTTN2Zl",
    success_url: window.location.origin,
    cancel_url: window.location.origin,
  }
);

// Wait for the CheckoutSession to get attached by the extension
onSnapshot(docRef, (snap) => {
  const { error, url } = snap.data();
  if (error) {
    // Show an error to your customer and
    // inspect your Cloud Function logs in the Firebase console.
    alert(`An error occured: ${error.message}`);
  }
  if (url) {
    // We have a Stripe Checkout URL, let's redirect.
    window.location.assign(url);
  }
});