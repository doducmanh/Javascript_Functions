import {useState, useReducer, useRef} from 'react'
// useReducer
  //1. Init state: 0
  //2. Actions: Up (state + 1) / Down (state - 1)
  //3. Reducer (hàm nhận 2 đối số là state hiện tại và action, dựa vào action để quyết định trả ra state mới)
  //4. Dispatch

// 1. Init state: 
const initState = {
  job: '',
  jobs: []
}
// 2. Actions:
const SET_JOB = 'set_job'
const ADD_JOB = 'add_job'
const DELETE_JOB = 'delete_job'

const setJob = payload => {
  return {
    type: SET_JOB,
    payload
  }
}

const addJob = payload => {
  return {
    type: ADD_JOB,
    payload
  }
}

const deleteJob = payload => {
  return {
    type: DELETE_JOB,
    payload
  }
}
// 3. Reducer:
const reducer = (state, action) => {
  switch(action.type) {
    case SET_JOB:
      return {
        ...state,
        job: action.payload
      }
    case ADD_JOB:
      return {
        ...state,
        jobs: [...state.jobs, action.payload]
      }
    case DELETE_JOB:
      const newJobs = [...state.jobs]
      newJobs.splice(action.payload, 1)
      return {
        ...state,
        jobs: newJobs
      }
    default:
      throw new Error('Invalid action.')
  }
}
//4. Dispatch:
//file App.js
function App() {
  const [state, dispatch] = useReducer(reducer, initState);
  const {job, jobs} = state
  const inputRef = useRef()
  const handleSubmit = () => {
    dispatch(addJob(job));
    dispatch(setJob('')); //clear nội dung bên trong ô input sau khi add
    inputRef.current.focus()
  }
  return (
    <div style={{ padding: '10px' }}>
      <h3>Todo</h3>
      <input
        ref={inputRef}
        value={job}
        placeholder="Enter todo..."
        onChange={e => dispatch(setJob(e.target.value))}
      />
      <button onClick={handleSubmit}>Add</button>
      <ul>
        {jobs.map((job, index) => (
          <li key={index}>{job} 
            <span onClick={() => dispatch(deleteJob(index))}>&times;</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default App;
