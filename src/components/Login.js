import React, {Component} from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import axios from 'axios';
import * as Auth from '../Modules/Auth';
import '../App.css';
import 'antd/dist/antd.css';
const FormItem = Form.Item;


class Login extends Component {
    state = {
        loading: false
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields( async (err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.setState({loading: true})

                try {
                    const RES = await axios.post('https://spiderpremeclient.herokuapp.com/auth/login', {
                        username: values.userName,
                        password: values.password
                    });

                    this.setState({loading: false})
                    Auth.AUTHENTICATE(RES.data.data.token, RES.data.data.username);

                    this.props.history.push('/');

                } catch(err) {
                    console.log(err)
                    alert('Incorrect username or password')
                    this.setState({loading: false})
                }

            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='widget-page'>
                <h3>Welcome to Spiderpreme 🕷</h3>
                <Form onSubmit={this.handleSubmit} className="login-form">

                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input size="small" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input size="small" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </FormItem>

                    <FormItem>
                        <Button loading={this.state.loading} size="small" type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </FormItem>

                </Form>
            </div>
        );
    }
}

export default Form.create()(Login)