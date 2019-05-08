import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

class MySelect extends PureComponent {  
  handleChange = (option) => {
    const { name } = this.props;

    this.props.onChange(name, option);
  }

  handleBlur = () => {
    const { name } = this.props;

    this.props.onBlur(name, true);
  }

  render() {
    const { 
      name,
      value,
      options,
      multiple
    } = this.props;

    return (
      <Select 
        name={name}
        value={value}
        options={options}
        isMulti={multiple}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      />
    );
  }
}

MySelect.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
  ]),
  multiple: PropTypes.bool,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

export default MySelect;
