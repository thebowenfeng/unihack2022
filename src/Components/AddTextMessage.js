import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import NormalButton from './NormalButton';
import { typography } from '@mui/system';
import {styled} from "@mui/material";
import {arrayUnion, doc, getDoc, getFirestore, updateDoc} from "firebase/firestore";

export default function AddTextMessage(props){
    const db = getFirestore();

    const nameTextRef = React.useRef('');
    const descriptionTextRef = React.useRef('');
    const keywordTextRef = React.useRef('');
    const taskTextRef = React.useRef('');
    const [nameerror, setNameerror] = React.useState(false);
    const [descriptionerror, setDescriptionerror] = React.useState(false);
    const [keyworderror, setKeyWorderror] = React.useState(false);
    const [taskerror, setTaskerror] = React.useState(false);

    const currentPatient = props.currPatient;

    const InputField = styled(TextField)({
        '& label.Mui-focused': {
        color: '#6A874B',
        },
        '& .MuiInput-underline:after': {
        borderBottomColor: '#6A874B',
        },
        '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#8AA861',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#6A874B',
        },
        '&:hover fieldset': {
            borderColor: '#6A874B',
          },
        },

        '& .MuiInputBase-input': {
            fontFamily: ['Comic Sans', '"Nunito"','"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',].join(','),
        }
    });


    return(
        <Modal
            open={props.openpop}
            onClose={props.handleClosepop}
            aria-labelledby="modal-addpatient"
            aria-describedby="modal-addpatient-content"
            sx = {{
                width: '88%',
                height: 535,
                position: 'absolute',
                ml: '6%',
                mt: '9%'
            }}
        >
            <Box sx={{bgcolor: '#BAD39F', height: '100%', borderRadius: '12px'}} >

                <Box>
                    <Box sx={{border : '1px solid #BAD39F', borderRadius: '12px'}}>
                    <Typography sx={{
                        fontFamily: 'Nunito',
                        fontSize: 35,
                        textAlign: "left",
                        marginTop: '5vh',
                        marginLeft: '3vw'
                        }}>

                        Add a text message
                    </Typography>
                    </Box>
                    <div style= {{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-start",
                        width: "100%",
                        height: '52vh',
                        //border: '1px solid #000000'
                    }}>

                        <div style= {{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            width: "50%",
                            height: '52vh',
                            //border: '1px solid #000000'
                        }}>
                        <Box >
                        <InputField
                            error={nameerror}
                            id="Name-field"
                            label="Name"
                            variant="outlined"
                            inputRef={nameTextRef}
                            helperText="Enter the name of activity"
                            sx={{
                                bgcolor: '#FDFAE2',
                                borderRadius: '4px',
                                width: '200%',
                                position: 'relative',
                                ml: '3vw',
                                mt: '1vw',
                                colour: '8AA861',
                        }}/>
                        </Box>
                        <Box>
                        <InputField
                            error={descriptionerror}
                            id="Description-field"
                            label="Description"
                            multiline
                            rows={2}
                            variant="outlined"
                            inputRef={descriptionTextRef}
                            helperText="Enter a description of the task"
                            sx={{
                                bgcolor: '#FDFAE2',
                                borderRadius: '4px',
                                width: '200%',
                                position: 'relative',
                                ml: '3vw',
                                mt: '2vw'
                        }}/>
                        </Box>

                        <Box>
                        <InputField
                            error={keyworderror}
                            id="Keyword-field"
                            label="Keywords"
                            multiline
                            rows={2}
                            variant="outlined"
                            inputRef={keywordTextRef}
                            helperText="Enter keywords, phrases or questions that will prompt the chosen response. Separated by comma"
                            sx={{
                                bgcolor: '#FDFAE2',
                                borderRadius: '4px',
                                width: '109%',
                                position: 'relative',
                                ml: '3vw',
                                mt: '2vw'
                        }}/>
                        </Box>
                        </div>
                        <div style= {{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            width: "50%",
                            height: '52vh',
                            //border: '1px solid #000010'
                        }}>
                            <Box>
                                <InputField
                                    error={taskerror}
                                    id="Task-field"
                                    label="Response"
                                    multiline
                                    rows={12.4}
                                    variant="outlined"
                                    inputRef={taskTextRef}
                                    helperText="Enter response that will be sent after the prompt message is recieved"
                                    sx={{
                                        bgcolor: '#FDFAE2',
                                        borderRadius: '4px',
                                        width: '109%',
                                        position: 'relative',
                                        ml: '3vw',
                                        mt: '1vw'
                                }}/>
                            </Box>
                        </div>
                    </div>
                </Box>
                <Box sx={{position: 'relative', ml: '45%'}}>
                    <NormalButton onClick={async ()=> {
                        setNameerror(false);
                        setDescriptionerror(false);
                        setKeyWorderror(false);
                        setTaskerror(false);
                        if (nameTextRef.current.value.trim() == '')
                        {
                            setNameerror(true);
                        }
                        else if (descriptionTextRef.current.value.trim() == '')
                        {
                            setDescriptionerror(true);
                        }
                        else if ( keywordTextRef.current.value.trim() == '')
                        {
                            setKeyWorderror(true);
                        }
                        else if (taskTextRef.current.value.trim() == '')
                        {
                            setTaskerror(true);
                        }
                        else
                        {
                            try{
                                const patientDocRef = doc(db, "patients", currentPatient.username)
                                await updateDoc(patientDocRef, {
                                    texts: arrayUnion({
                                        name: nameTextRef.current.value,
                                        description: descriptionTextRef.current.value,
                                        keywords: keywordTextRef.current.value.split(","),
                                        response: taskTextRef.current.value
                                    })
                                })
                            }catch(e){
                                alert("Error: " + e);
                            }



                            props.handleClosepop();
                        }
                    }}>
                        Add patient
                    </NormalButton>
                </Box>
            </Box>
        </Modal>
    )
}
