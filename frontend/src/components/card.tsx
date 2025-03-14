import { Button, Card, Col, Container, Row } from "react-bootstrap";

interface Ticket {
  id: number;
  performer: string;
  startTime: Date;
  length: number;
  isMissed: boolean;
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  ticket?: Ticket;
}

export default function Carditem({
  ticket,
  onClick,
  onMouseEnter,
  onMouseLeave,
  style,
  className,
}: Props) {
  if (ticket)
    return (
      <Card
        style={style}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={className}
      >
        <Card.Img
          src="src\assets\—Pngtree—ticket template mega sale advertising_8718923.png"
          alt="Card image"
        />
        <Card.ImgOverlay className="overlay">
          <Card.Title className="title">{ticket.performer}</Card.Title>
          <Card.Text className=" text">{ticket.length}p</Card.Text>
          <Card.Text className=" text">{new Date(ticket.startTime).toLocaleDateString() + " " + new Date(ticket.startTime).toLocaleTimeString()}</Card.Text>
          <Button className= {ticket.isMissed? 'missedBtn disabled' : 'missedBtn'} onClick={(e) => missedBtnClick(e, ticket.id)}>
            Elmarad
          </Button>
        </Card.ImgOverlay>
      </Card>
    );
}

async function missedBtnClick(event: React.MouseEvent<HTMLButtonElement>, id : number) {
  const updateData = {
    isMissed: true,
  };
  try {
    console.log(id)
    const response = await fetch(`http://localhost:3000/tickets/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData)
    });

    if(!response.ok) {
        const error = await response.json()
        throw new Error (error.error || 'Something went wrong')
    }
    const btn = event.target as HTMLButtonElement;
    btn.classList.add('disabled')
    const data = await response.json()
    console.log(event.target)

  } catch (e : any) {
    console.log(e.message)
  }
}
