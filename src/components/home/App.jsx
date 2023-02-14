import React, {useState} from "react"
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core"

import {Field, Form, Formik} from "formik"
import * as Yup from "yup"
import {TextField} from "formik-material-ui"
import ConversionService from "../../service/ConversionService"
import {Alert, AlertTitle} from "@mui/material";

const useStyle = makeStyles((theme) => ({
  padding: {
    padding: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
}))

const initialValues = {
  fromValue: 0,
  fromMetric: "",
  toValue: 0,
  toMetric: ""
}

const options = [
  {label: "Kelvin", value: "KELVIN"},
  {label: "Celsius", value: "CELSIUS"},
  {label: "Fahrenheit", value: "FAHRENHEIT"},
  {label: "Rankine", value: "RANKINE"},
  {label: "Litres", value: "LITERS"},
  {label: "Table Spoons", value: "TABLE_SPOONS"},
  {label: "Cubic Inches", value: "CUBIC_INCHES"},
  {label: "Cups", value: "CUPS"},
  {label: "Cubic Feet", value: "CUBIC_FEET"},
  {label: "Gallons", value: "GALLONS"},
]

const numericRegEx = /^[a-zA-Z]+$/;

let validationSchema = Yup.object().shape({
  // fromValue: Yup.string().matches(numericRegEx,
  //     "Must contain only numeric characters!").required("Required!"),
  fromMetric: Yup.string().required("Required"),
  // toValue: Yup.string().matches(numericRegEx,
  //     "Must contain only numeric characters!").required("Required!"),
  toMetric: Yup.string().required("Required"),
})

export const App = () => {
  const classes = useStyle()
  const [result, setResult] = useState({});
  const [answer, setAnswer] = useState({});

  const onSubmit = async (values) => {
    console.log(values);
    setResult(null);
    let request = {
      value: values.fromValue,
      expression: values.fromMetric + '_' + values.toMetric
    }
    const response = await ConversionService.convert(request);
    if (response.data.response) {
      setAnswer(response.data.response);
      if (response.data.response === +(+values.toValue).toFixed(2)) {
        setResult('SUCCESS');
      } else {
        setResult('ERROR');
      }
    } else {
      setResult('INVALID');
    }
  }

  return (
      <Grid container justify="center" spacing={1}>
        <Grid item md={6}>
          <Card className={classes.padding}>
            <CardHeader title="Unit Conversion"></CardHeader>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
              {({dirty, isValid, values, handleChange, handleBlur}) => {
                return (
                    <Form>
                      <CardContent>
                        <Grid item container spacing={1} justify="center">
                          <Grid item xs={12} sm={6} md={6}>
                            <Field
                                label="From Value"
                                variant="outlined"
                                fullWidth
                                name="fromValue"
                                value={values.fromValue}
                                component={TextField}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={6}>
                            <FormControl fullWidth variant="outlined">
                              <InputLabel
                                  id="demo-simple-select-outlined-label">
                                From Metric
                              </InputLabel>
                              <Select
                                  labelId="demo-simple-select-outlined-label"
                                  id="demo-simple-select-outlined"
                                  label="Occupation"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.fromMetric}
                                  name="fromMetric">
                                <MenuItem>None</MenuItem>
                                {options.map((item) => (
                                    <MenuItem key={item.value}
                                              value={item.value}>
                                      {item.label}
                                    </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} sm={6} md={6}>
                            <Field
                                label="To Value"
                                variant="outlined"
                                fullWidth
                                name="toValue"
                                value={values.toValue}
                                component={TextField}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={6}>
                            <FormControl fullWidth variant="outlined">
                              <InputLabel
                                  id="demo-simple-select-outlined-label">
                                From Metric
                              </InputLabel>
                              <Select
                                  labelId="demo-simple-select-outlined-label"
                                  id="demo-simple-select-outlined"
                                  label="To Metric"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.toMetric}
                                  name="toMetric">
                                <MenuItem>None</MenuItem>
                                {options.map((item) => (
                                    <MenuItem key={item.value}
                                              value={item.value}>
                                      {item.label}
                                    </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </CardContent>
                      <CardActions>
                        <Grid item container spacing={1} justify="center">
                          <Grid item xs={12} sm={6} md={6}>
                            <Button
                                disabled={!dirty || !isValid}
                                variant="contained"
                                color="primary"
                                type="Submit"
                                className={classes.button}>
                              Check
                            </Button>
                          </Grid>
                          <Grid item xs={12} sm={6} md={6}>
                            {result === 'ERROR' && <Alert severity="error">
                              <AlertTitle>Wrong Answer</AlertTitle><strong>Expected Answer: {answer}</strong>
                            </Alert>}
                            {result === 'INVALID' && <Alert severity="info">
                              <AlertTitle>Invalid</AlertTitle><strong>check it
                              out!</strong>
                            </Alert>}
                            {result === 'SUCCESS' && <Alert severity="success">
                              <AlertTitle>Correct Answer</AlertTitle><strong>check
                              it out!</strong>
                            </Alert>}
                          </Grid>
                        </Grid>
                      </CardActions>
                    </Form>
                )
              }}
            </Formik>
          </Card>
        </Grid>
      </Grid>
  )
}

