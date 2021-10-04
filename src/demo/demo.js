import React, { Component } from "react";
import createForm from "../laoce-react-form/index";

const usernameRules = { required: true, message: "请输入username" };
const passwordRules = { required: true, message: "请输入password" };

@createForm
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onSubmit = () => {
    this.props.form.validateFields((err, state) => {
      if (err) {
        console.log(err);
      } else {
        console.log("校验成功");
      }
    });
  };
  componentDidMount() {
    this.props.form.setFieldsValue({ username: "chen" });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <h3>MyRcForm</h3>
        {getFieldDecorator("username", { rules: [usernameRules] })(
          <MyInput name="姓名" />
        )}
        {getFieldDecorator("password", { rules: [passwordRules] })(
          <MyInput name="密码" />
        )}
        <button onClick={this.onSubmit}>提交</button>
      </div>
    );
  }
}

class MyInput extends Component {
  render() {
    const { name } = this.props;
    return (
      <input
        {...this.props}
        placeholder={`请输入${name}`}
        style={{
          width: "200px",
          height: "40px",
          display: "block",
          margin: "10px 0px",
        }}
      ></input>
    );
  }
}

export default Demo;
