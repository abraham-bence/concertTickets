import React, { useEffect, useState } from "react";
import NavigationBar from "../components/navbar";
import { Card, Spinner } from "react-bootstrap";
import Carditem from "../components/card";
import "./style/home.css";

interface Ticket {
  id: number;
  performer: string;
  startTime: Date;
  length: number;
  isMissed: boolean;
}

function Home() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [serverError, setServerError] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/tickets")
      .then((res) => {
        if (res.status == 404) {
          setServerError("Resource not found 404!");
        }
        if (!res.ok) {
          setServerError("Server responded with status: " + res.status);
        }
        return res.json();
      })
      .then((data) => {
        setTickets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setLoading(false);
      });
  });

  if (loading) {
    return (
      <div className="center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
  if (error) {
    return <div>{error + " "}</div>;
  }

  return (
    <div className="home body">
      <NavigationBar />
      <div className="container pb-4 mt-5">
        <div className="row">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="col-md-4 d-flex">
              <Carditem ticket={ticket} className="cards" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
