import React, { Component } from "react";

export default function createForm(Cmp) {
  // 返回一个类组件
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.options = {};
    }
    handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({
        [name]: value,
      });
    };
    getFieldDecorator = (field, options) => (InputCmp) => {
      this.options[field] = options;
      return React.cloneElement(InputCmp, {
        name: field,
        value: this.state[field] || "",
        onChange: this.handleChange,
      });
    };
    setFieldsValue = (newVal) => {
      this.setState(newVal);
    };
    getFieldsValue = () => {
      return this.state;
    };
    validateFields = (callback) => {
      let err = [];
      for (let field in this.options) {
        // username || password
        const ruleArr = this.options[field]["rules"];
        ruleArr.forEach((item) => {
          if (!this.state[field]) {
            err.push({
              [field]: {
                message: item.message,
              },
            });
          }
        });
      }
      if (err.length) {
        callback(err, this.state);
      } else {
        callback(null, this.state);
      }
    };
    getForm = () => {
      return {
        form: {
          getFieldDecorator: this.getFieldDecorator,
          setFieldsValue: this.setFieldsValue,
          getFieldsValue: this.getFieldsValue,
          validateFields: this.validateFields,
        },
      };
    };
    render() {
      return <Cmp {...this.props} {...this.getForm()} />;
    }
  };
}
