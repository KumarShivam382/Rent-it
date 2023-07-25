import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";

export default function Contact({ userRef, listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function getLandlord() {
      try {
        const docRef = doc(db, "users", userRef);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setLandlord(docSnap.data());
        } else {
          toast.error("Could not get landlord data");
        }
      } catch (error) {
        console.error("Error fetching landlord data:", error);
        console.log(error.message);
        toast.error("An error occurred while fetching landlord data");
      }
    }
    getLandlord();
  }, [userRef]);

  function onChange(e) {
    setMessage(e.target.value);
  }

  const handleSendMessage = () => {
    const emailSubject = encodeURIComponent(listing.name);
    const emailBody = encodeURIComponent(message);
    const mailtoUrl = `mailto:${landlord.email}?Subject=${emailSubject}&body=${emailBody}`;
    window.location.href = mailtoUrl;
  };

  return (
    <>
      {landlord && (
        <div className="flex flex-col w-full">
          <p>
            Contact {landlord.name} for the {listing.name.toLowerCase()}
          </p>
          <div className="mt-3 mb-6">
            <textarea
              name="message"
              id="message"
              rows="2"
              value={message}
              onChange={onChange}
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
            ></textarea>
          </div>
          <button
            onClick={handleSendMessage}
            className="px-7 py-3 bg-blue-600 text-white rounded text-sm uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full text-center mb-6"
            type="button"
          >
            Send Message
          </button>
        </div>
      )}
    </>
  );
}
