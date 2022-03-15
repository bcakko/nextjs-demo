import { useRouter } from "next/router";
import NewMeetUpForm from "../../components/meetups/NewMeetupForm";

function NewMeetupPage() {
  const router = useRouter();

  async function addMeetUpHandler(enteredMeetUpData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetUpData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);

    router.replace('/');
  }

  return <NewMeetUpForm onAddMeetup={addMeetUpHandler} />;
}

export default NewMeetupPage;
