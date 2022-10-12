import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";
function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active react meetups"
        />
        <link rel="shortcut icon" href="/logo.png" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

export default HomePage;

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://kareem2002shimes:k132002h132002@cluster0.08bgoeo.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        image: meetup.image,
        title: meetup.title,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
  };
}
