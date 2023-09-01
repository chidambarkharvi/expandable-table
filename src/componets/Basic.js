
import React, { useState, useEffect } from "react";
import {
  createTable,
  useTableInstance,
  getCoreRowModel,
  getExpandedRowModel,
} from "@tanstack/react-table";
import STUDENTS from "../students.json";
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';
import axios from "axios";

const table = createTable();
const defaultData = [...STUDENTS.slice(0, 5)];

// let columns = [];


const PDFDownloadLink = ({ tableId, fileName }) => {
  const handleDownload = () => {
    const table = document.getElementById(tableId);
    const pdfOptions = {
      margin: [10, 10],
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'letter', orientation: 'landscape' },
    };

    html2pdf().from(table).set(pdfOptions).save();

  };

  return (
    <button onClick={handleDownload}>Download PDF</button>
  );
};



// const defaultColumns = [

//   table.createGroup({
//     header: "Name",
//     columns: [
//       table.createDataColumn("name", {
//         id: "name",
//         header: (props) => (
//           <>
//             <button onClick={props.instance.getToggleAllRowsExpandedHandler()}>
//               {props.instance.getIsAllRowsExpanded() ? "👇" : "👉"}
//             </button>
//             name
//           </> 
//         ),

//         cell: ({ row, getValue }) => (
//           <div
//             style={{
//               // Since rows are flattened by default,
//               // we can use the row.depth property
//               // and paddingLeft to visually indicate the depth
//               // of the row
//               // backgroundColor: COLORS[row.depth],
//               paddingLeft: `${row.depth * 2}rem`,
//             }}
//           >
//             {row.getCanExpand() ? (
//               <button
//                 {...{
//                   onClick: row.getToggleExpandedHandler(),
//                   style: { cursor: "pointer" },
//                 }}
//               >
//                 {row.getIsExpanded() ? "👇" : "👉"}
//               </button>
//             ) : (
//               "🔵"
//             )}
//             {getValue()}
//           </div>
//         ),
//       }),
//       table.createDataColumn("description", {
//         id: "description",
//       }),
//       table.createDataColumn("Number of subRows", {
//         id: "Number of subRows",
//       }),
//     ],
//   }),
//   table.createDataColumn("description", {
//     id: "description",
//   }),
//   table.createDataColumn("Number of subRows", {
//     id: "Number of subRows",
//   }),
//   table.createDataColumn("Average Count", {
//     id: "Average Count",
//   }),
//   table.createDataColumn("count", {
//     id: "count",
//   }),

// ];






const BasicTable = () => {
  const [data, setData] = useState([...defaultData]);
  const [columns, setColumns] = useState([]);
  const [keysData, setkeysData] = useState([]);

  const [expanded, setExpanded] = useState({});


  useEffect(() => {
    console.log(data,"useEffect 1", defaultData ,"==>",[...defaultData])
    if (!(keysData.length > 0)) {
      console.log("useEffect 2")

      callApi()

    }



    // setColumns([
    //       table.createDataColumn("name", {
    //         id: "name",
    //         header: (props) => (
    //           <>
    //             <button onClick={props.instance.getToggleAllRowsExpandedHandler()}>
    //               {props.instance.getIsAllRowsExpanded() ? "👇" : "👉"}
    //             </button>
    //             name
    //           </> 
    //         ),

    //         cell: ({ row, getValue }) => (
    //           <div
    //             style={{
    //               paddingLeft: `${row.depth * 2}rem`,
    //             }}
    //           >
    //             {row.getCanExpand() ? (
    //               <button
    //                 {...{
    //                   onClick: row.getToggleExpandedHandler(),
    //                   style: { cursor: "pointer" },
    //                 }}
    //               >
    //                 {row.getIsExpanded() ? "👇" : "👉"}
    //               </button>
    //             ) : (
    //               "🔵"
    //             )}
    //             {getValue()}
    //           </div>
    //         ),
    //       }),
    //    table.createDataColumn("description", {
    //     id: "description",
    //   }),
    //   table.createDataColumn("Number of subRows", {
    //     id: "Number of subRows",
    //   }),
    //   table.createDataColumn("Average Count", {
    //     id: "Average Count",
    //   }),
    //   table.createDataColumn("count", {
    //     id: "count",
    //   }),

    // ])
  }, []);


  const groupCal = () => {

    console.log(columns, "columns")

  };


  const callApi = async () => {
    console.log("useEffect 3")

    try {
      console.log("useEffect try")

      const response = await axios.post("https://event-manager.tech:3000/api/v1/groups/create-group-report", {
        startDate: "",
        endDate: "",
        groups: ["64f0359ee7ee39aa2bfab9f5", "64f03572e7ee39aa2bfab9dd"],
        filters: ["name", "description", "Number of Subgroups", "Average Count"],
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("useEffect end")

      const data = response.data;
      console.log(data, "report data 1", data.data[0]);
      const keysArray = Object.keys(data.data[0]);
      console.log("useEffect 4")

      console.log(keysArray, "key", !(keysData.length < 0));

      const filteredArray = keysArray.filter(item => item !== 'subgroups');
      setkeysData(filteredArray)
      console.log("useEffect keys", filteredArray)

      const array = []
      if (!(keysData.length > 0)) {

        filteredArray.map((key, ind) => {
          if (ind > 0) {
            const sanitizedKey = key.replace(/[^a-zA-Z0-9]/g, '_'); // Replace non-alphanumeric characters with underscores
            array.push(
              table.createDataColumn(key, {
                id: key,
              })
            );
          }
        });
      }

      if (array.includes('subgroups')) {
        array.unshift(table.createDataColumn(keysArray[0], {
          id: keysArray[0],
          header: (props) => (
            <>
              <button onClick={props.instance.getToggleAllRowsExpandedHandler()}>
                {props.instance.getIsAllRowsExpanded() ? "👇" : "👉"}
              </button>
              {keysArray[0]}
            </>
          ),
  
          cell: ({ row, getValue }) => (
            <div
              style={{
                paddingLeft: `${row.depth * 2}rem`,
              }}
            >
              {row.getCanExpand() ? (
                <button
                  {...{
                    onClick: row.getToggleExpandedHandler(),
                    style: { cursor: "pointer" },
                  }}
                >
                  {row.getIsExpanded() ? "👇" : "👉"}
                </button>
              ) : (
                "🔵"
              )}
              {getValue()}
            </div>
          ),
        }))
      } else {
        array.unshift(  table.createDataColumn(keysArray[0], {
          id: keysArray[0],
        }))
      }

 

      setColumns(array)
      console.log("useEffect 5")

    } catch (error) {
      console.log(error);
    }

  }


  const instance = useTableInstance(table, {
    data,
    columns,
    state: {
      expanded: expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.subgroups,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });
  console.log(instance.getRowModel());




  return (
    <div>
      <button onClick={groupCal}>groupCal</button>
      <PDFDownloadLink tableId="studentTable" fileName="student_data.pdf" />
      <table style={{ borderCollapse: 'collapse', width: '100%' }} id="studentTable" border={1}>
        <thead>
          {instance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th style={tableHeaderStyle} key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : header.renderHeader()}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {instance.getRowModel().rows.map((row) => (
            <tr key={row.id} className={`depth-${row.depth}`}>
              {row.getVisibleCells().map((cell) => (
                <td style={tableCellStyle} key={cell.id}>{cell.renderCell()}</td>
              ))}
            </tr>
          ))}
        </tbody>
        {/* <tfoot>
          {instance.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : header.renderFooter()}
                </th>
              ))}
            </tr>
          ))}
        </tfoot> */}
      </table>
    </div>
  );
};

  const tableHeaderStyle = {
    background: '#f2f2f2',
    padding: '4px',
    border: '1px solid #ddd',
    textAlign: 'left',
    fontWeight: 'bold',
  };

  const tableCellStyle = {
    padding: '4px',
    border: '1px solid #ddd',
    textAlign: 'left',
  };

export default BasicTable;




