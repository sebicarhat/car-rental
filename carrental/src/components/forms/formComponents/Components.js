import React from 'react'
import Text from './Text';
import Select from './Select';

const Components = {
    select: Select,
    text: Text
  };
  
  export default (block,onChange,onSelect,elems) => {
    if (typeof Components[block.component] !== "undefined") {
        if(block.component==='text' )
      return React.createElement(Components[block.component], {
        key: block.id,
        block: block,
        onChange: onChange,
        value:elems[block.label]
      });
      else if(block.component==='select' )
      return React.createElement(Components[block.component], {
        key: block.id,
        block: block,
        onSelect: onSelect,
        value:elems[block.label]
      });
    }
    
  }