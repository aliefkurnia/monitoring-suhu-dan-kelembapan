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

  const handleSubmit = () => {
    if (!selectedOption) {
      setValidationMessage("Silakan Pilih Mode!");
    } else {
      toggleModal(); // Show the modal if an option is selected
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
                value="Automatic"
                checked={selectedOption === "Automatic"}
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
