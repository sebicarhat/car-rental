import React from "react";
import {Form} from 'semantic-ui-react';

export default props => (
    <Form>
        <Form.Field style={{maxWidth:'30%',margin:'0 auto'}}>
            <label htmlFor="model">What {props.block.label} do you preffer?</label>
            <Form.Input 
                type="text"
                id={props.block.id}
                name={props.block.label}
                value={props.value}
                onChange={props.onChange}
            />
        </Form.Field>
    </Form>
);