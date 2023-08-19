import React from 'react';

// antd
import { Select } from 'antd';

// const
import { colorGroupList } from '@constants';

// styling
import './index.less';

const { Option } = Select;

const ColourGroupDropdown = ({ colorGroupValue, onChange = null, ...rest }) => {
  return (
    <Select
      defaultValue={colorGroupValue}
      style={{ width: '100%' }}
      placeholder="Select Colour Group"
      onChange={onChange}
      {...rest}
    >
      {colorGroupList.map((color) => (
        <Option value={color.name} key={color.name}>
          <div className="colour-group-option">
            {color.name === 'Multicolor' ? (
              <img src={color.icon} alt="" className="colour-group-option-color" />
            ) : (
              <div
                className="colour-group-option-color"
                style={{
                  background: color.code,
                  border: `0.5px solid ${
                    color.name === 'White' ? 'rgb(216, 216, 208)' : 'transparent'
                  }`,
                }}
              />
            )}

            <p>{color.name}</p>
          </div>
        </Option>
      ))}
    </Select>
  );
};

export default ColourGroupDropdown;
