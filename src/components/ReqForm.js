import React, {Component} from 'react'
import { Form, Input, Button, Icon } from 'antd';
import '../App.css';
import 'antd/dist/antd.css';
import axios from 'axios';
import * as Auth from '../Modules/Auth'
const FormItem = Form.Item;


class ReqForm extends Component {
    state = {
        loading: false,
    };

    Logout() {
        Auth.DEAUTHENTICATE()
        window.location.reload()
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {

            if (!err) {

                if(!values.Url.includes('https://facebook.com')) return alert('Wrong Url')

                this.setState({ loading: true });

                try{

                    await axios.post('https://spiderpremeclient.herokuapp.com/addRequest', {
                        id: localStorage.getItem('id'),
                        url: values.Url,
                        keyword: values.Keyword
                    });

                    this.setState({ loading: false });

                    window.location.reload()

                } catch(err) {

                    alert('Something went wrong')

                    this.setState({ loading: false });

                    console.error(err)
                }


            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='widget-page'>
                <p className='LogoutButton' onClick={this.Logout}><Icon type="logout" /> Logout</p>
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