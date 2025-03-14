import { useState } from "react";
import { FormControlProps, OverlayTrigger, Tooltip } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as yup from "yup";

interface FormData {
  performer: string;
  startTime: string;
  length: number;
}

interface Errors {
  performer?: string;
  startTime?: string;
  length?: string;
}

export default function AddTicketForm() {
  const [formData, setFormData] = useState({
    performer: "",
    startTime: "",
    length: 0,
  });

  const [errors, setErrors] = useState<Errors>({});

  const validate = (formData: FormData) => {
    let newErrors: Errors = {};
    if (formData.performer == "" || null) {
      newErrors.performer = "Ki kell tölteni!";
    }
    const date = new Date(formData.startTime);
    if (isNaN(date.getTime())) {
      newErrors.startTime = "Helytelen formátum!";
    }
    if (date < new Date()) {
      newErrors.startTime = "Nem lehet múltbéli dátum!";
    }
    if (formData.length <= 0) {
      newErrors.length = "0-nál nagyobb számnak kell lennie!";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    if (name == "startTime") {
      value += ":00.990z";
    }
    setFormData((prev) => ({
      ...prev,
      [name]: name === "length" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    if (!validate(formData)) {
      return;
    }
    console.log(errors);
    console.log(formData);

    try {
      const response = await fetch("http://localhost:3000/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <Form className="addTicketForm p-4 shadow-lg rounded bg-light" onSubmit={handleSubmit}>
      {/* Performer Field */}
      <Form.Group className="mb-3" controlId="performer">
        <Form.Label className="fw-bold">Előadó</Form.Label>
        <OverlayTrigger
          placement="right"
          overlay={errors.performer ? <Tooltip>{errors.performer}</Tooltip> : <></>}
        >
          <Form.Control
            type="text"
            name="performer"
            value={formData.performer}
            onChange={handleChange}
            placeholder="Add meg az előadó nevét"
            className={errors.performer ? "is-invalid" : ""}
          />
        </OverlayTrigger>
      </Form.Group>

      {/* Start Time Field */}
      <Form.Group className="mb-3" controlId="startTime">
        <Form.Label className="fw-bold">Időpont</Form.Label>
        <OverlayTrigger
          placement="right"
          overlay={errors.startTime ? <Tooltip>{errors.startTime}</Tooltip> : <></>}
        >
          <Form.Control
            type="datetime-local"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            min={new Date().toISOString().slice(0, 16)}
            className={errors.startTime ? "is-invalid" : ""}
          />
        </OverlayTrigger>
      </Form.Group>

      {/* Length Field */}
      <Form.Group className="mb-3" controlId="length">
        <Form.Label className="fw-bold">Időtartam (perc)</Form.Label>
        <OverlayTrigger
          placement="right"
          overlay={errors.length ? <Tooltip>{errors.length}</Tooltip> : <></>}
        >
          <Form.Control
            type="number"
            name="length"
            value={formData.length}
            onChange={handleChange}
            placeholder="Add meg az időtartamot (percekben)"
            className={errors.length ? "is-invalid" : ""}
          />
        </OverlayTrigger>
      </Form.Group>

      {/* Server Error */}
      {/* {serverError && <p className="text-danger text-center fw-bold">{serverError}</p>} */}

      {/* Submit Button */}
      <Button className="submitBtn w-100 mt-3 fw-bold" type="submit" variant="primary">
        Beküldés
      </Button>
    </Form>
    // <Form className="addTicketForm" onSubmit={(e) => handleSubmit(e)}>
    //   <Form.Group className="mb-3 w-100" controlId="performer">
    //     <Form.Label>Előadó</Form.Label>
    //     <Form.Control
    //       type="text"
    //       name="performer"
    //       value={formData.performer}
    //       onChange={handleChange}
    //       placeholder="Add meg az előadó nevét"
    //     />
    //     <div className="invalid-feedback text-center">{errors.performer}</div>{" "}
    //   </Form.Group>

    //   <Form.Group className="mb-3 w-100" controlId="date">
    //     <Form.Label>Időpont</Form.Label>
    //     <Form.Control
    //       type="datetime-local"
    //       name="startTime"
    //       onChange={handleChange}
    //       min={new Date().toDateString()}
    //       placeholder="Add meg az időpontot"
    //     />
    //     <p style={{ color: "red", textAlign: "center" }}>{errors.startTime}</p>
    //   </Form.Group>
    //   <Form.Group className="mb-3 w-100" controlId="length">
    //     <Form.Label>Időtartam</Form.Label>
    //     <Form.Control
    //       type="number"
    //       name="length"
    //       onChange={handleChange}
    //       min={new Date().toISOString()}
    //       placeholder="Add meg az időtartamot"
    //     />
    //     <p style={{ color: "red", textAlign: "center" }}>{errors.length}</p>
    //   </Form.Group>
    //   <Button className="submitBtn mt-3" type="submit">
    //     Submit
    //   </Button>
    // </Form>
  );
}
