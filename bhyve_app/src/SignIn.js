import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import SkillTable from './SkillTable';
import './Common.css';

function SignIn() {
    const [accessToken, setAccessToken] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [tableData, setTableData] = useState([]);
    var data = [];

    useEffect(() => {
        const reqBody = {
            "username": "testuser1@bhyve.io",
            "password": "WelcomeToTheApp#1"
        }
        axios.post('https://fechallenge.dev.bhyve.io/user/signin', reqBody)
            .then(response => setAccessToken(response.data.accessToken));
    }, [])

    const getSkillsData = () => {
        console.log('inside')
        axios.get('https://fechallenge.dev.bhyve.io/skills', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then((allSkills) => {
                for (let i = 0; i < allSkills.data.length; i++) {
                    var obj = {}
                    obj.id = allSkills.data[i].id;
                    obj.skillName = allSkills.data[i].skillName;
                    data.push(obj)
                }
                setTableData(arr => [...arr, ...data])
            })
    }

    const validate = values => {
        const errors = {};
        if (!values.firstName) {
            errors.firstName = 'firstname is Required';
        }
        if (!values.lastName) {
            errors.lastName = 'lastname is Required';
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: ''
        },
        validate,
        onSubmit: values => {
            let basicInfoRequestBody = {
                firstName: values.firstName,
                lastName: values.lastName
            }

            axios.post('https://fechallenge.dev.bhyve.io/user/basic/profile', basicInfoRequestBody, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
                .then((info) => {
                    getSkillsData();
                    setSubmitSuccess(true);
                })

        },
    });
    return (
        submitSuccess ? (<SkillTable data={tableData} accessToken={accessToken} />) :
            (<div className='container'>
                <form className='form' onSubmit={formik.handleSubmit} >

                    <TextField style={{ margin: '17px' }} id="firstName" label="FirstName" variant="outlined" type="firstName"
                        onChange={formik.handleChange}
                        value={formik.values.firstName} />

                    {formik.touched.firstName && formik.errors.firstName ? (
                        <div style={{ color: 'red' }}>{formik.errors.firstName}</div>
                    ) : null}

                    <TextField style={{ margin: '17px' }} id="lastName"
                        label="LastName"
                        name="lastName"
                        type="lastName"
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                        variant="outlined"
                        onChange={formik.handleChange} />
                    {formik.touched.lastName && formik.errors.lastName ? (
                        <div style={{ color: 'red' }}>{formik.errors.lastName}</div>
                    ) : null}
                    <Button className='submit' type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </form>
                <div>
                </div>
            </div>)
    )
}
export default SignIn