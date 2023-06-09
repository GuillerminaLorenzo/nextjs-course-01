import { Fragment } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { getAllEvents } from "../../helpers/api-utils";
import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/events-search";

export default function AllEventsPage(props) {
  const router = useRouter();
  const { events } = props;

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allows you to evolve..."
        />
      </Head>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}
