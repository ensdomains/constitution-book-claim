import {
  Button,
  Input,
  Select,
  tokens,
  Typography,
  VisuallyHidden,
} from "@ensdomains/thorin";
import type { AddressAutofill as AddressAutofillType } from "@mapbox/search-js-react";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import styled from "styled-components";
import countries from "../assets/countries.json";
import { Box } from "../components/Box";
import { ButtonBox } from "../components/ButtonBox";
import { SelectWrapper } from "../components/SelectWrapper";
import { Form } from "../pages/claim";
import mq from "../utils/mediaQuery";

const AddressAutofill: typeof AddressAutofillType = dynamic(
  () =>
    import("@mapbox/search-js-react").then((mod) => mod.AddressAutofill) as any,
  {
    ssr: false,
  }
) as any;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${tokens.space["4"]};
  flex-gap: ${tokens.space["4"]};

  & input:-webkit-autofill,
  & input:-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.space["4"]};
  flex-gap: ${tokens.space["4"]};
  ${mq.medium.min`
    flex-direction: row;
  `}
`;

export const StepTwo = ({
  setOrderID,
  formData,
  setFormData,
  setStep,
}: {
  setOrderID: (orderID: string) => void;
  formData: Form;
  setFormData: Dispatch<SetStateAction<Form>>;
  setStep: (step: number) => void;
}) => {
  const [error, setError] = useState<Partial<Form>>({
    email: undefined,
    name: undefined,
    addressLine1: undefined,
    city: undefined,
    state: undefined,
    country: undefined,
    postalCode: undefined,
  });

  const handleChange =
    (name: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((form) => ({ ...form, [name]: e.target.value }));
      if (e.target.value !== "") onBlur(name);
    };

  const onBlur = (name: keyof typeof formData) => () =>
    setError({ ...error, [name]: formData[name] ? undefined : "Required" });

  const handleSubmit = async () => {
    const hasError = Object.keys(error).some((key) => {
      const isEmpty = formData[key as keyof Form] === "";
      isEmpty && setError({ ...error, [key]: "Required" });
      return isEmpty;
    });

    if (hasError) return;

    const res = await fetch(
      "https://hook.us1.make.com/t6nj8ocoup1mcivetel452rfgg8lgg0m",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const orderID = await res.text();

    setOrderID(orderID);
    setStep(2);
  };

  return (
    <>
      <Box>
        <div
          style={{
            marginBottom: tokens.space["4"],
          }}
        >
          <Typography variant="extraLarge" weight="bold">
            Your details
          </Typography>
          <Typography>
            These will be used to send you the book, and to contact you if any
            issues arrise.
          </Typography>
        </div>
        <Form>
          <FormGroup>
            <Input
              label="Name"
              value={formData.name}
              onChange={handleChange("name")}
              type="text"
              placeholder="Cool Person"
              error={error.name}
              onBlur={onBlur("name")}
              required
            />
            <Input
              label="Email"
              onChange={handleChange("email")}
              value={formData.email}
              error={error.email}
              placeholder="cool@example.com"
              onBlur={onBlur("email")}
              type="email"
              required
            />
          </FormGroup>
          <FormGroup>
            <div style={{ width: "100%" }}>
              <AddressAutofill
                theme={{
                  variables: {
                    fontFamily: tokens.fonts["sans"],
                    unit: "16px",
                    borderRadius: "6px",
                    boxShadow: tokens.boxShadows["light"]["0.25"],
                  },
                }}
                accessToken="pk.eyJ1IjoidGF5dGVtcyIsImEiOiJjbDJwZWw2YnYyajNoM2lwOTF2b2U4OXhwIn0.ZKOCHRYd0hn2SKpiu1nTHg"
              >
                <Input
                  label="Address"
                  onChange={handleChange("addressLine1")}
                  value={formData.addressLine1}
                  type="text"
                  error={error.addressLine1}
                  onBlur={onBlur("addressLine1")}
                  placeholder="123 Main St"
                  required
                  autoComplete="address-line1"
                />
              </AddressAutofill>
            </div>
            <Input
              label="Unit"
              onChange={handleChange("addressLine2")}
              value={formData.addressLine2}
              placeholder="Apt. 1"
              type="text"
              autoComplete="address-line2"
            />
          </FormGroup>
          <FormGroup>
            <Input
              label="City"
              onChange={handleChange("city")}
              value={formData.city}
              placeholder="New City"
              error={error.city}
              onBlur={onBlur("city")}
              type="text"
              autoComplete="address-level2"
            />
            <Input
              label="State"
              onChange={handleChange("state")}
              value={formData.state}
              placeholder="Oklahoma"
              error={error.state}
              onBlur={onBlur("state")}
              type="text"
              autoComplete="address-level1"
            />
          </FormGroup>
          <VisuallyHidden>
            <Input
              label="country"
              type="text"
              onChange={handleChange("country")}
              value={formData.country}
              autoComplete="country"
            />
            <Input
              label="countryName"
              type="text"
              onChange={handleChange("countryName")}
              value={formData.countryName}
              autoComplete="country-name"
            />
          </VisuallyHidden>
          <FormGroup>
            <SelectWrapper style={{ width: "100%" }}>
              <Select
                label="Country"
                selected={useMemo(
                  () => ({
                    value: formData.country,
                    label: formData.countryName,
                  }),
                  [formData.country, formData.countryName]
                )}
                onChange={(e) =>
                  e &&
                  setFormData((form) => ({
                    ...form,
                    country: e.value,
                    countryName: e.label!,
                  }))
                }
                options={countries.map((country) => ({
                  value: country.code,
                  label: country.name,
                }))}
              />
            </SelectWrapper>
            <Input
              label="Postcode/Zip"
              onChange={handleChange("postalCode")}
              value={formData.postalCode}
              placeholder="90210"
              type="text"
              error={error.postalCode}
              onBlur={onBlur("postalCode")}
              autoComplete="postal-code"
            />
          </FormGroup>
        </Form>
      </Box>
      <ButtonBox>
        <Button variant="secondary" onClick={() => setStep(0)}>
          Back
        </Button>
        <Button variant="primary" onClick={() => handleSubmit()}>
          Next
        </Button>
      </ButtonBox>
    </>
  );
};
