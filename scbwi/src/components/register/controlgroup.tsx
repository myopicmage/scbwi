import * as React from 'react';

interface ControlGroupProps {
  name: string;
  value: string;
  type: 'text' | 'radio' | 'select';
  label: string;
  required: boolean;
  options?: [{ label: string; value: string; key: string; }];
  handleChange: (event: React.FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export class ControlGroup extends React.Component<ControlGroupProps, any> {
  constructor(props) {
    super(props);
  }

  renderInput = () => {
    switch (this.props.type) {
      case 'text':
        return <input 
          type="text" 
          name={this.props.name} 
          value={this.props.value} 
          onChange={this.props.handleChange} 
          placeholder={`Enter ${this.props.label.toLowerCase()}...`} />;
      case 'radio':
        return this.props.options ? this.props.options.map((item, index) => 
          <label htmlFor={item.key} className="pure-radio" key={index}>
            <input type="radio" id={item.key} name={this.props.name} onChange={this.props.handleChange} value={item.value} /> {item.label}
          </label>
        ) : <div>unable to load question</div>;
      case 'select':
        if (this.props.options) {
          return (
            <select name={this.props.name} onChange={this.props.handleChange} value={this.props.value}>
              {this.props.options.map((item, index) => <option value={item.value} key={index}>{item.label}</option>)}
            </select>
          );
        } else {
          return <div>unable to load question</div>;
        }
      default:
        return <input 
          type="text" 
          name={this.props.name} 
          value={this.props.value} 
          onChange={this.props.handleChange} 
          placeholder={`Enter ${this.props.label.toLowerCase()}...`} />;
    }
  }

  render() {
    return (
      <div className="pure-control-group">
        <label htmlFor={this.props.name}>{this.props.label}</label>
        {this.renderInput()}
        <span className="pure-form-message-inline">{this.props.required ? 'This field is required' : ''}</span>
      </div>
    )
  }
}