import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function SwitchLabels({timerEnabled, setTimerEnabled, disabled}) {
  return (
    <FormGroup>
      <FormControlLabel control={
        <Switch
            onChange={()=>{setTimerEnabled(!timerEnabled)}}
            disabled={disabled}
        />} label="Timed Game Toggle" />
    </FormGroup>
  );
}