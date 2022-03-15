import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Antalya Meetups</title>
        <meta
          name="description"
          content="Bu uygulama, antalya içinde arkadaş buluşmaları düzenlemek için kullanılan bir buluşma uygulamasıdır."
        />
      </Head>
      <MeetupList meetups={props.meetups} />
      {!props.meetups[0] && <p>Couldn't find any meetup :(</p>}
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   //fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     }
//   }
// }

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://akko:owL3JD3FB7u6rYgR@cluster0.diobb.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetup");

  const meetups = await meetupsCollection.find().toArray();

  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
