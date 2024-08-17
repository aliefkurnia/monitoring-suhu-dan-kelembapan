import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";

const Controller = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [modal, setModal] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setValidationMessage(""); // Clear validation message when an option is selected
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleSubmit = async () => {
    if (!selectedOption) {
      setValidationMessage("Silakan Pilih Mode!");
      return;
    }

    try {
      // Kirim permintaan GET ke endpoint /set-mode
      const response = await fetch(
        `http://localhost:8801/set-mode?mode=${selectedOption}`,
        {
          method: "GET",
        }
      );

      const result = await response.json();

      if (result.success) {
        toggleModal(); // Show the modal if the request is successful
      } else {
        setValidationMessage(
          result.message || "Terjadi kesalahan saat mengubah mode."
        );
      }
    } catch (error) {
      console.error("Error setting mode:", error);
      setValidationMessage("Terjadi kesalahan saat mengubah mode.");
    }
  };

  return (
    <div className="p-3 bg-dark text-white">
      <Form>
        <FormGroup tag="fieldset">
          <legend>Control Mode</legend>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="controlMode"
                value="ON"
                checked={selectedOption === "ON"}
                onChange={handleOptionChange}
              />
              ON
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="controlMode"
                value="OFF"
                checked={selectedOption === "OFF"}
                onChange={handleOptionChange}
              />
              OFF
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="controlMode"
                value="AUTOMATIC"
                checked={selectedOption === "AUTOMATIC"}
                onChange={handleOptionChange}
              />
              Automatic
            </Label>
          </FormGroup>
        </FormGroup>
        {validationMessage && <Alert color="danger">{validationMessage}</Alert>}
        <Button color="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Form>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Control Mode Updated</ModalHeader>
        <ModalBody>
          Control Mode telah diubah ke{" "}
          {selectedOption === "ON"
            ? "ON"
            : selectedOption === "OFF"
            ? "OFF"
            : "Automatic"}
          .
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>
            OK
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Controller;
