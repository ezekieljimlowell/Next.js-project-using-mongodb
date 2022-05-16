import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

const SAMPLE_MEETUPS = [
    {
        id: "id1",
        title: "first meetup",
        image: "https://www.industrialempathy.com/img/remote/ZiClJf-640w.avif",
        address: "No: 67, town street, tel aviv-10, israel",
        description: "This is a first meetup"
    },
    {
        id: "id2",
        title: "second meetup",
        image: "https://www.industrialempathy.com/img/remote/ZiClJf-640w.avif",
        address: "No: 87, town street, tel aviv-10, israel",
        description: "This is a second meetup"
    }
]

function InitialPage(props) {

    return (
        <Fragment>
            <Head>
                <title>Display meetups</title>
                <meta name="description" content="Display all meetups from mongodb"></meta>
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
    )
}

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//     return {
//         props: {
//             meetups: SAMPLE_MEETUPS
//         }
//     }
// }

export async function getStaticProps() {

    const client = await MongoClient.connect("mongodb+srv://ezekiellowell:Pejl10qw@cluster0.8jiqd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
    const db = client.db();
    const meetupCollection = db.collection("meetups");
    const meetups = await meetupCollection.find().toArray();

    client.close();
    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 1
    }
}

export default InitialPage;