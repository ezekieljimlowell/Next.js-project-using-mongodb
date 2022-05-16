import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

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