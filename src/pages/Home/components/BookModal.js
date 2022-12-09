import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import dayjs from "dayjs";
import BookForm from "./BookForm";
import ProductEstimation from "./ProductEstimation";
import { getTotalDays } from "../utils";

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

export default function BookModal(props) {
  const { open, onClose, data, storeInBookedList } = props;
  const [step, setStep] = useState(1);

  const [formValue, setFormValue] = useState(INITIAL_VALUE);
  const selectedProduct = data[formValue.selectedProduct] || {};

  const handleChange = (newValue, key) => {
    setFormValue({ ...formValue, [key]: newValue });
  };

  const handleClose = () => {
    setStep(1);
    onClose();
    setFormValue(INITIAL_VALUE);
  };

  const handleSelect = (event) => {
    var index = event.target.value;
    handleChange(index, "selectedProduct");
  };

  const handleProceed = () => {
    if (!formValue.fromDate || !formValue.toDate || !selectedProduct.name) {
      return alert("please fill all the fields");
    }

    if (step === STEPS.PRODUCT_SELECTION) {
      const totalDays = getTotalDays(formValue.fromDate, formValue.toDate);
      const minRentDay = selectedProduct?.minimum_rent_period;
      if (totalDays && totalDays < selectedProduct?.minimum_rent_period) {
        return alert(`Minimun Rent Period is ${minRentDay}`);
      }
      setStep(step + 1);
    }

    if (step === STEPS.PRODUCT_ESTIMATION) {
      handleClose();
      storeInBookedList(
        selectedProduct,
        formValue.fromDate,
        getTotalDays(formValue.fromDate, formValue.toDate)
      );
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
          Book a Product
        </Typography>
        <Box>
          {step === STEPS.PRODUCT_SELECTION && (
            <BookForm
              selectedProduct={selectedProduct}
              handleSelect={handleSelect}
              data={data}
              formValue={formValue}
              handleChange={handleChange}
            />
          )}

          {step === STEPS.PRODUCT_ESTIMATION && (
            <ProductEstimation
              fromDate={formValue.fromDate}
              toDate={formValue.toDate}
              price={selectedProduct?.price}
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
