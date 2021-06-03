import { ListItemSecondaryAction, Radio, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import { Highlight, connectMenu } from 'react-instantsearch-dom';


const Menu = ({ items, currentRefinement, refine, customItems  }) => {
  const [selectedValue, setSelectedValue] = useState(customItems[0]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    if (event.target.value === "All") {
      refine("")
    } else {
      refine(event.target.value)
    }
  };

  return (
    <div>
      {customItems.map(item => {
        return (
          <div>
            <Radio
                color="primary"
                checked={selectedValue === item}
                onChange={handleChange}
                value={item}
              />
                {item}
          </div>
        )
      })}
    </div>
  )
};

export default connectMenu(Menu)
