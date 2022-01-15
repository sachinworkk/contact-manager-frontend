import "./Contact";
import Contact from "./Contact";
import Navbar from "../commons/Navbar";
import FloatingButton from "../commons/FloatingButton";

function ContactsMainPage() {
  return (
    <div>
      <Navbar />
      <Contact userName="Sachin Khadka" contactNumber="98135400" />

      <FloatingButton />
    </div>
  );
}

export default ContactsMainPage;
