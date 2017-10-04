import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
require('../../scss/react-select.scss');

var MultiSelectField = createClass({
	displayName: 'MultiSelectField',
  propTypes: {
		label: PropTypes.string,
	},
	getInitialState () {
    var data = this.props.data;
		var values = this.props.initValue;
    return {
			disabled: false,
			crazy: false,
			options: data,
			value: values,
		};
	},
	handleSelectChange (value) {
		this.setState({ value });
    this.props.myfunc(value);
	},
	toggleDisabled (e) {
		this.setState({ disabled: e.target.checked });
	},
	render () {
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select multi simpleValue
            disabled={this.state.disabled}
            value={this.state.value}
            placeholder={this.props.placeholder}
            options={this.state.options}
            onChange={this.handleSelectChange}
        />
			</div>
		);
	}
});
module.exports = MultiSelectField;
