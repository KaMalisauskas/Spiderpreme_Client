import React, {Component} from 'react'
import { Form, Input, Button } from 'antd';
import '../App.css';
import 'antd/dist/antd.css';
import axios from 'axios';
const FormItem = Form.Item;

class ReqForm extends Component {
    state = {
        loading: false,
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.setState({ loading: true });

            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='widget-page'>
                <h3>You're logged on!!</h3>
                <p className='center'>Enter you Requested input to begin!</p>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('Url', {
                            rules: [{ required: true, message: 'Please input your requested URL!' }],
                        })(
                            <Input size="small" placeholder="Requested Url" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('Keyword', {
                            rules: [{ required: true, message: 'Please input your requested Keyword!' }],
                        })(
                            <Input size="small" placeholder="Keyword" />
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

export default Form.create()(ReqForm)