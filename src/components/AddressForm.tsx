import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { commerce } from "../lib/commerce";
import FormInput from "./FormInput";

const AddressForm: React.FC<any> = ({ checkoutToken, next }) => {
  const methods = useForm();
  const [shippingOption, setShippingOption] = useState("");
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);

  useEffect(() => {
    checkoutToken?.id && fetchShippingCountries(checkoutToken.id);
  }, [checkoutToken.id]);

  useEffect(() => {
    shippingCountry && fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    shippingSubdivision &&
      fetchShippingOption(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [checkoutToken.id, shippingCountry, shippingSubdivision]);

  const fetchShippingCountries = async (checkoutTokenId: string) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (countryCode: string) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOption = async (
    checkoutTokenId: string,
    country: string,
    region: string | null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region }
    );
    setShippingOption(options[0].id);
    setShippingOptions(options);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            next({
              ...data,
              shippingCountry,
              shippingSubdivision,
              shippingOption,
            })
          )}
        >
          <Grid container spacing={3}>
            <FormInput name="firstName" label="First name" />
            <FormInput name="lastName" label="Last name" />
            <FormInput name="address1" label="Address" />
            <FormInput name="email" label="Email" />
            <FormInput name="city" label="City" />
            <FormInput name="zip" label="ZIP / Postal code" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value as string)}
              >
                {Object.entries(shippingCountries).map((item) => (
                  <MenuItem key={item[0]} value={item[0]}>
                    {item[1]}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select
                value={shippingSubdivision}
                fullWidth
                onChange={(e) =>
                  setShippingSubdivision(e.target.value as string)
                }
              >
                {Object.entries(shippingSubdivisions).map((item) => (
                  <MenuItem key={item[0]} value={item[0]}>
                    {item[1]}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={(e) => setShippingOption(e.target.value as string)}
              >
                {shippingOptions.map((item: any) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.description +
                      " - " +
                      item.price.formatted_with_symbol}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} to="/cart" variant="outlined">
              Back to Cart
            </Button>
            <Button variant="contained" type="submit" color="primary">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
