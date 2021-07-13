import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import UserProfile from './UserProfile';

function SkillTable(props) {
  const [selectionModel, setSelectionModel] = React.useState([]);
  const [submitSkills, setSubmitSkills] = React.useState(false);
  const [userInformation, setUserinformation] = useState([]);
  const skillColumns = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'skillName', headerName: 'SkillName', width: 400, editable: true, },
  ];


  const submitSelectedRecords = () => {
    var selectedRows = []
    for (let i = 0; i < selectionModel.length; i++) {
      let row = props.data.find((item) => item.id === selectionModel[i]);
      selectedRows.push(row)
    }
    let dataTobeSent = selectedRows.map(item => item.skillName);
    let skillsTobeAdded = {
      skills: [...dataTobeSent]
    }

    axios.post('https://fechallenge.dev.bhyve.io/user/skills', skillsTobeAdded, {
      headers: {
        'Authorization': `Bearer ${props.accessToken}`
      }
    })
      .then((info) => {
        console.log('done', info);
        setUserinformation(info);
        setSubmitSkills(true);

      })

  }
  return (
    submitSkills ? <UserProfile userInformation={userInformation} /> :

      <div className='skillTableContainer'>
        <div style={{ height: 645, width: '40%' }}>
          <DataGrid
            style={{ overflowX: 'hidden' }}
            rows={props.data}
            columns={skillColumns}
            pageSize={10}
            checkboxSelection
            disableSelectionOnClick
            onSelectionModelChange={(newSelection) => {
              setSelectionModel(newSelection.selectionModel);
            }}
            selectionModel={selectionModel}
            getSelectedRows={(data) => { console.log('data:', data) }}
            isRowSelectable={() => selectionModel.length < 8 ? true : false}

          />

          <div className='submitSkills'>
            <Button disabled={selectionModel.length < 3} onClick={() => submitSelectedRecords()} variant="contained" color="primary" style={{ marginTop: '20px' }}>
              Submit selected records
            </Button>
          </div>
        </div>
      </div>
  )
}


export default SkillTable;
