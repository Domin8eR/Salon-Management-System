import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FacialIcon from '@mui/icons-material/Face';
import HairColorIcon from '@mui/icons-material/ColorLens';
import ManicureIcon from '@mui/icons-material/LocalFlorist';
import PedicureIcon from '@mui/icons-material/Spa';
import WaxingIcon from '@mui/icons-material/Waves';
import SpaIcon from '@mui/icons-material/Spa';
import HairstyleIcon from '@mui/icons-material/Brush';
import MakeupIcon from '@mui/icons-material/Face';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function FetchEmployee() {
  const [activitiesData, setActivitiesData] = useState([]);
  const db = getFirestore(); // Initialize Firestore

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'activities_selected'));
      const data = querySnapshot.docs.map(doc => doc.data());
      setActivitiesData(data);
    };

    fetchData();
  }, [db]);

  return (
    <div className="parent">
      <h2>Employee Activities Log</h2>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Activity</TableCell>
              <TableCell>Remarks</TableCell>
              <TableCell>Time Spent (hours)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activitiesData.map((activity, index) => (
              <Row key={index} row={activity} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

function Row(props) {
  const { row } = props;

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
           
          >
            
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.checkedItems.map((item, i) => (
            <div key={i}>
              {item === "Hair Cut" && <HairColorIcon />}
              {item === "Facial" && <FacialIcon />}
              {item === "Hair Coloring" && <HairColorIcon />}
              {item === "Manicure" && <ManicureIcon />}
              {item === "Pedicure" && <PedicureIcon />}
              {item === "Waxing" && <WaxingIcon />}
              {item === "Massage" && <SpaIcon />}
              {item === "Hairstyling" && <HairstyleIcon />}
              {item === "Makeup" && <MakeupIcon />}
              <span>{item}</span>
            </div>
          ))}
        </TableCell>
        <TableCell>{row.remarks}</TableCell>
        <TableCell>{row.timeSpent}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Table size="small" aria-label="purchases">
            <TableBody>
              {row.history && row.history.map((historyRow) => ( // Check if row.history exists
                <TableRow key={historyRow.date}>
                  <TableCell component="th" scope="row">
                    {historyRow.date}
                  </TableCell>
                  <TableCell>{historyRow.customerId}</TableCell>
                  <TableCell align="right">{historyRow.amount}</TableCell>
                  <TableCell align="right">
                    {Math.round(historyRow.amount * row.price * 100) / 100}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default FetchEmployee;
