import { useRouter } from "next/router";
import NewMeetupForm from "../components/meetups/NewMeetupForm";
import Head from "next/head";
import { Fragment } from "react";

function NewMeetup() {

    const router = useRouter();

    async function addMeetupHandler(meetupData) {
        const response = await fetch("/api/new-meetup", {
            method: "POST",
            body: JSON.stringify(meetupData),
            headers: {
                "Content-Type": "application/json"
            }
        });

        console.log(response);

        const data = await response.json();
        console.log(data);

        router.push("/");

    }

    return (
        <Fragment>
            <Head>
                <title>Add new meetup</title>
                <meta name="description" content="Add a new meetup"></meta>
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </Fragment>
    )
}

export default NewMeetup;