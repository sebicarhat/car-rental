import React from "react";
import {Form,Dropdown} from 'semantic-ui-react';
import {BODY_TYPE,GEAR_TYPE,FUEL_TYPE, NO_OF_DOORS, PRODUCTION_YEAR} from '../../../types'

export default props => (
    <Form>
        <Form.Field style={{maxWidth:'30%',margin:'0 auto'}}>
            {props.block.label==="body_type" || props.block.label==="gear_type" || props.block.label==="fuel_type" || props.block.label==="color"?
            <label>What {props.block.label} do you preffer?</label>
            :
            props.block.label==="production_year"?
            <label>Starting with what year it will be manufactured?</label>
            :
            <label>How many {props.block.label} to have?</label>
            }
            <Dropdown
              fluid
              name={props.block.label}
              onChange={props.onSelect}
              selection
              options={props.block.label==='body_type' ? BODY_TYPE : props.block.label==='gear_type' ? GEAR_TYPE : props.block.label==='fuel_type' ? FUEL_TYPE :  props.block.label==='no_of_doors' ? NO_OF_DOORS : props.block.label==='production_year' ? PRODUCTION_YEAR() :  PRODUCTION_YEAR()}
              value={props.value}
              />
        </Form.Field>
    </Form>
);