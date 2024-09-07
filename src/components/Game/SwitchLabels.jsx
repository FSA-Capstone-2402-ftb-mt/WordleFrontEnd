import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function SwitchLabels({timerEnabled, setTimerEnabled}) {
  return (
    <FormGroup>
      <FormControlLabel control={
        <Switch
            onChange={()=>{setTimerEnabled(!timerEnabled)}}
        />} label="Timed Game Toggle" />
    </FormGroup>
  );
}