import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import dayjs from "dayjs";
import ProductEstimation from "./ProductEstimation";
import RentForm from "./RentForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const STEPS = {
  PRODUCT_SELECTION: 1,
  PRODUCT_ESTIMATION: 2,
};

const TODAY_DATE = dayjs();

const INITIAL_VALUE = {
  selectedProduct: "",
  fromDate: TODAY_DATE,
  toDate: TODAY_DATE,
};

export default function ReturnModal(props) {
  const { open, onClose, data } = props;
  const [step, setStep] = useState(1);

  const [formValue, setFormValue] = useState(INITIAL_VALUE);

  const handleChange = (newValue, key) => {};

  const [selectedProduct, setSelectedProduct] = useState({
    name: "default",
    info: {},
  });

  const handleClose = () => {
    setStep(1);
    onClose();
    setFormValue(INITIAL_VALUE);
    setSelectedProduct({
      name: "default",
      info: {},
    });
  };

  const handleSelect = (event) => {
    var index = event.target.value;
    setSelectedProduct({ name: event.target.value, info: data[index] });
  };

  const handleProceed = () => {
    if (!formValue.fromDate || !formValue.toDate || !selectedProduct.info) {
      return alert("please fill all the fields");
    }

    if (step === 1) {
      setStep(step + 1);
    } else {
      handleClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" mb={2}>
          Return Product
        </Typography>
        <Box>
          {step === STEPS.PRODUCT_SELECTION && (
            <RentForm
              selectedProduct={selectedProduct}
              handleSelect={handleSelect}
              data={data}
              formValue={formValue}
              handleChange={handleChange}
            />
          )}

          {step === STEPS.PRODUCT_ESTIMATION && (
            <ProductEstimation
              fromDate={TODAY_DATE}
              toDate={TODAY_DATE}
              price={0}
            />
          )}

          <Box textAlign="right">
            <Button onClick={handleClose} variant="text">
              No
            </Button>
            <Button onClick={handleProceed} variant="text">
              Yes
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
