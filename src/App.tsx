import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import {
  IPossibleValues,
  IExpressions,
} from './types';
import { calculateOutputs } from './utils';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  input: {
    marginTop: theme.spacing(1),
  },
  error: {
    color: 'red',
  },
}));

function App() {
  const classes = useStyles();

  const [values, setValues] = useState<IPossibleValues>({
    A: false,
    B: false,
    C: false,
    D: 0,
    E: 0,
    F: 0,
  });
  const [expressions, setExpressions] = useState(IExpressions.base)
  const [H, K] = calculateOutputs(values, expressions);

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.checked });
  };

  const handleChangeInput = (isInt: boolean = false) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: isInt ? parseInt(event.target.value) : parseFloat(event.target.value.replace(',', '.')) });
  };

  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExpressions(event.target.value as IExpressions);
  };

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Possible inputs:</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={values.A} onChange={handleChangeCheckbox} name="A" />}
            label="A"
          />
          <FormControlLabel
            control={<Checkbox checked={values.B} onChange={handleChangeCheckbox} name="B" />}
            label="B"
          />
          <FormControlLabel
            control={<Checkbox checked={values.C} onChange={handleChangeCheckbox} name="C" />}
            label="C"
          />
        </FormGroup>
        <FormGroup>
          <TextField
            className={classes.input}
            id="standard-number"
            label="D"
            type="number"
            name="D"
            value={values.D}
            onChange={handleChangeInput(false)}
            variant="outlined"
          />
          <TextField
            className={classes.input}
            id="standard-number"
            label="E"
            type="number"
            name="E"
            value={values.E}
            onChange={handleChangeInput(true)}
            variant="outlined"
          />
          <TextField
            className={classes.input}
            id="standard-number"
            label="F"
            type="number"
            name="F"
            value={values.F}
            onChange={handleChangeInput(true)}
            variant="outlined"
          />
        </FormGroup>
      </FormControl>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Expressions:</FormLabel>
        <RadioGroup aria-label="Expressions" name="Expressions" value={expressions} onChange={handleChangeRadio}>
          <FormControlLabel value={IExpressions.base} control={<Radio />} label={IExpressions.base} />
          <FormControlLabel value={IExpressions.custom1} control={<Radio />} label={IExpressions.custom1} />
          <FormControlLabel value={IExpressions.custom2} control={<Radio />} label={IExpressions.custom2} />
        </RadioGroup>
      </FormControl>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Outputs:</FormLabel>
        {H ? <FormGroup>
          <TextField
            className={classes.input}
            disabled
            id="outlined-text-1"
            label="H"
            value={H}
            variant="outlined"
          />
          <TextField
            className={classes.input}
            disabled
            id="outlined-text-2"
            label="K"
            value={K}
            variant="outlined"
          />
        </FormGroup> :
          <h1 className={classes.error}>Error: incorrect inputs</h1>}
      </FormControl>
    </div>
  );
}

export default App;
