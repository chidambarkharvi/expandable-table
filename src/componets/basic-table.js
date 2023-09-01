// import React, { useState } from "react";
// import {
//   createTable,
//   useTableInstance,
//   getCoreRowModel,
//   getExpandedRowModel,
// } from "@tanstack/react-table";
// import STUDENTS from "../students.json";
// import jsPDF from "jspdf";
// import html2canvas from 'html2canvas';

// const table = createTable();
// const defaultData = [...STUDENTS.slice(0, 5)];
// const defaultColumns = [
//   table.createGroup({
//     header: "Full Name",
//     columns: [
//       table.createDataColumn("firstName", {
//         id: "First Name",
//         header: (props) => (
//           <>
//             {/* <button onClick={props.instance.getToggleAllRowsExpandedHandler()}>
//               {props.instance.getIsAllRowsExpanded() ? "👇" : "👉"}
//             </button> */}
//             First Name
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
//       table.createDataColumn("middleName", {
//         id: "Middle Name",
//       }),
//       table.createDataColumn("lastName", {
//         id: "Last Name",
//       }),
//     ],
//   }),
//   table.createDataColumn("age", {
//     id: "Age",
//   }),
//   table.createGroup({
//     header: "Phone Number",
//     columns: [
//       table.createDataColumn((row) => row.phone[1], {
//         id: "Phone Number 1",
//       }),
//       table.createDataColumn((row) => row.phone[2], {
//         id: "Phone Number 2",
//       }),
//     ],
//   }),
//   table.createGroup({
//     header: "Date Details",
//     columns: [
//       table.createDataColumn("date_of_birth", {
//         id: "Date of Birth",
//         cell: (props) => new Date(props.getValue()).toDateString(),
//       }),
//       table.createDataColumn("date_of_admission", {
//         id: "Date of Admission",
//         cell: (props) => new Date(props.getValue()).toDateString(),
//       }),
//     ],
//   }),
// ];






// const BasicTable = () => {
//   const [data, setData] = useState([...defaultData]);
//   const [columns, setColumns] = useState([...defaultColumns]);
//   const [expanded, setExpanded] = useState({});
//   const tableRef = React.createRef();

//   const instance = useTableInstance(table, {
//     data,
//     columns,
//     state: {
//       expanded: expanded,
//     },
//     onExpandedChange: setExpanded,
//     getSubRows: (row) => row.subRows,
//     getCoreRowModel: getCoreRowModel(),
//     getExpandedRowModel: getExpandedRowModel(),
//   });
//   console.log(instance.getRowModel());

//   const generatePDF = () => {
//     const input = document.getElementById('pdf-content');
//     html2canvas(input).then((canvas) => {
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF();
//       pdf.addImage(imgData, 'PNG', 10, 10);
//       pdf.save('student_data.pdf');
//     });
//   };
  


//   return (
//     <div>
//  <button onClick={generatePDF}>Download PDF</button>
//     <table  id="pdf-content" border={1}>
//         <thead>
//           {instance.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header) => (
//                 <th key={header.id} colSpan={header.colSpan}>
//                   {header.isPlaceholder ? null : header.renderHeader()}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {instance.getRowModel().rows.map((row) => (
//             <tr key={row.id} className={`depth-${row.depth}`}>
//               {row.getVisibleCells().map((cell) => (
//                 <td key={cell.id}>{cell.renderCell()}</td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//         {/* <tfoot>
//           {instance.getFooterGroups().map((footerGroup) => (
//             <tr key={footerGroup.id}>
//               {footerGroup.headers.map((header) => (
//                 <th key={header.id} colSpan={header.colSpan}>
//                   {header.isPlaceholder ? null : header.renderFooter()}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </tfoot> */}
//       </table>
//     </div>
//   );
// };

// export default BasicTable;






// import React, { useState,useEffect } from "react";
// import {
//   createTable,
//   useTableInstance,
//   getCoreRowModel,
//   getExpandedRowModel,
// } from "@tanstack/react-table";
// import STUDENTS from "../students.json";
// import jsPDF from "jspdf";
// import html2canvas from 'html2canvas';
// import html2pdf from 'html2pdf.js';
// import axios from "axios";

// const table = createTable();
// const defaultData = [...STUDENTS.slice(0, 5)];




// const PDFDownloadLink = ({ tableId, fileName }) => {
//   const handleDownload = () => {
//     const table = document.getElementById(tableId);
//     const pdfOptions = {
//       margin: [10, 10],
//       filename: fileName,
//       image: { type: 'jpeg', quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: 'mm', format: 'letter', orientation: 'landscape' },
//     };

//     html2pdf().from(table).set(pdfOptions).save();
//   };

//   return (
//     <button onClick={handleDownload}>Download PDF</button>
//   );
// };



// const defaultColumns = [
//   table.createGroup({
//     header: "Full Name",
//     columns: [
//       table.createDataColumn("firstName", {
//         id: "First Name",
//         header: (props) => (
//           <>
//             <button onClick={props.instance.getToggleAllRowsExpandedHandler()}>
//               {props.instance.getIsAllRowsExpanded() ? "👇" : "👉"}
//             </button>
//             First Name
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
//       table.createDataColumn("middleName", {
//         id: "Middle Name",
//       }),
//       table.createDataColumn("lastName", {
//         id: "Last Name",
//       }),
//     ],
//   }),
//   table.createDataColumn("age", {
//     id: "Age",
//   }),
//   table.createGroup({
//     header: "Phone Number",
//     columns: [
//       table.createDataColumn((row) => row.phone[1], {
//         id: "Phone Number 1",
//       }),
//       table.createDataColumn((row) => row.phone[2], {
//         id: "Phone Number 2",
//       }),
//     ],
//   }),
//   table.createGroup({
//     header: "Date Details",
//     columns: [
//       table.createDataColumn("date_of_birth", {
//         id: "Date of Birth",
//         cell: (props) => new Date(props.getValue()).toDateString(),
//       }),
//       table.createDataColumn("date_of_admission", {
//         id: "Date of Admission",
//         cell: (props) => new Date(props.getValue()).toDateString(),
//       }),
//     ],
//   }),
// ];




// const BasicTable = () => {
//   const [data, setData] = useState([]);
//   const [columns, setColumns] = useState([...defaultColumns]);
//   const [expanded, setExpanded] = useState({});
  

//   useEffect( () => {
//     callApi()
      
//     }, []);
  
  
//     const callApi = async() =>{
//       try {
//         const response = await axios.post("https://event-manager.tech:3000/api/v1/groups/create-group-report", {
//           startDate: "",
//           endDate: "",
//           groups: ["64f035cee7ee39aa2bfaba0d","64f0359ee7ee39aa2bfab9f5"],
//           filters: ["name", "description"],
//         }, {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
      
//         const data = response.data;
//         setData(data)
//         console.log(data, "report data 1");
//       } catch (error) {
//         console.log(error);
//       }
      
//     }
  

//   // const instance = useTableInstance(table, {
//   //   data,
//   //   columns,
//   //   state: {
//   //     expanded: expanded,
//   //   },
//   //   onExpandedChange: setExpanded,
//   //   getSubRows: (row) => row.subRows,
//   //   getCoreRowModel: getCoreRowModel(),
//   //   getExpandedRowModel: getExpandedRowModel(),
//   // });
//   // console.log(instance.getRowModel());
//   const instance = useTableInstance(table, {
//     data,
//     columns, // Your existing columns configuration
//     state: {
//       expanded: expanded,
//     },
//     onExpandedChange: setExpanded,
//     getSubRows: (row) => row.subgroups, // Get subgroups at each level
//     getCoreRowModel: getCoreRowModel(),
//     getExpandedRowModel: getExpandedRowModel(),
//   });
  
  




//   return (
//     <div>
//  <PDFDownloadLink tableId="studentTable" fileName="student_data.pdf" />
//     <table style={{ borderCollapse: 'collapse', width: '100%' }} id="studentTable" border={1}>
//         <thead>
//           {instance.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header) => (
//                 <th style={tableHeaderStyle} key={header.id} colSpan={header.colSpan}>
//                   {header.isPlaceholder ? null : header.renderHeader()}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {instance.getRowModel().rows.map((row) => (
//             <tr key={row.id} className={`depth-${row.depth}`}>
//               {row.getVisibleCells().map((cell) => (
//                 <td style={tableCellStyle} key={cell.id}>{cell.renderCell()}</td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// const tableHeaderStyle = {
//   background: '#f2f2f2',
//   padding: '4px',
//   border: '1px solid #ddd',
//   textAlign: 'left',
//   fontWeight: 'bold',
// };

// const tableCellStyle = {
//   padding: '4px',
//   border: '1px solid #ddd',
//   textAlign: 'left',
// };

// export default BasicTable;


// import React, { useState, useEffect } from "react";
// import {
//   createTable,
//   useTableInstance,
//   getCoreRowModel,
//   getExpandedRowModel,
// } from "@tanstack/react-table";
// import axios from "axios";

// const table = createTable();

// const BasicTable = () => {
//   const [data, setData] = useState([]);
//   const [columns, setColumns] = useState([]);
//   const [expanded, setExpanded] = useState({});

//   useEffect(() => {
//     fetchApiData();
//   }, []);

//   const fetchApiData = async () => {
//     try {
//       const response = await axios.post(
//         "https://event-manager.tech:3000/api/v1/groups/create-group-report",
//         {
//           startDate: "",
//           endDate: "",
//           groups: ["64f0359ee7ee39aa2bfab9f5", "64f03572e7ee39aa2bfab9dd"],
//           filters: ["name", "description", "Number of Subgroups", "Average Count"],
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const apiData = response.data.data;

//       const dynamicColumns = [
//         table.createDataColumn("name", { id: "Name" }),
//         table.createDataColumn("description", { id: "Description" }),
//         table.createDataColumn("Number of Subgroups", { id: "Subgroups" }),
//         table.createDataColumn("Average Count", { id: "Avg Count" }),
//       ];

//       setColumns(dynamicColumns);
//       setData(apiData);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const instance = useTableInstance(table, {
//     data,
//     columns,
//     state: {
//       expanded: expanded,
//     },
//     onExpandedChange: setExpanded,
//     getSubRows: (row) => row.subgroups || [],
//     getCoreRowModel: getCoreRowModel(),
//     getExpandedRowModel: getExpandedRowModel(),
//   });

//   return (
//     <div>
//       <table style={{ borderCollapse: "collapse", width: "100%" }} id="studentTable" border={1}>
//         <thead>
//           {instance.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header) => (
//                 <th style={tableHeaderStyle} key={header.id} colSpan={header.colSpan}>
//                   {header.isPlaceholder ? null : header.renderHeader()}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {instance.getRowModel().flatRows.map((row) => (
//             <React.Fragment key={row.id}>
//               <tr className={`depth-${row.depth}`}>
//                 {row.getVisibleCells().map((cell) => (
//                   <td style={tableCellStyle} key={cell.id}>
//                     {cell.renderCell()}
//                   </td>
//                 ))}
//               </tr>
//               {row.isExpanded && row.original.subgroups && (
//                 <tr>
//                   <td colSpan={columns.length}>
//                     <BasicTable
//                       data={row.original.subgroups}
//                       columns={columns}
//                     />
//                   </td>
//                 </tr>
//               )}
//             </React.Fragment>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// const tableHeaderStyle = {
//   background: "#f2f2f2",
//   padding: "4px",
//   border: "1px solid #ddd",
//   textAlign: "left",
//   fontWeight: "bold",
// };

// const tableCellStyle = {
//   padding: "4px",
//   border: "1px solid #ddd",
//   textAlign: "left",
// };

// export default BasicTable;

















//




import React, { useState,useEffect } from "react";
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

const defaultColumn  = [
  
  table.createDataColumn("name", {
    id: "name",
  }),
  table.createDataColumn("description", {
    id: "description",
  }),     table.createDataColumn("Number of Subgroup", {
    id: "Number of Subgroup",
  }),     table.createDataColumn("Average Count", {
    id: "Average Count",
  }),   

 ]


// const defaultColumns = [
//   table.createGroup({
//     header: "Full Name",
//     columns: [
//       table.createDataColumn("firstName", {
//         id: "First Name",
//         header: (props) => (
//           <>
//             <button onClick={props.instance.getToggleAllRowsExpandedHandler()}>
//               {props.instance.getIsAllRowsExpanded() ? "👇" : "👉"}
//             </button>
//             First Name
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
//       table.createDataColumn("middleName", {
//         id: "Middle Name",
//       }),
//       table.createDataColumn("lastName", {
//         id: "Last Name",
//       }),
//     ],
//   }),
//   table.createDataColumn("age", {
//     id: "Age",
//   }),
//   table.createGroup({
//     header: "Phone Number",
//     columns: [
//       table.createDataColumn((row) => row.phone[1], {
//         id: "Phone Number 1",
//       }),
//       table.createDataColumn((row) => row.phone[2], {
//         id: "Phone Number 2",
//       }),
//     ],
//   }),
//   table.createGroup({
//     header: "Date Details",
//     columns: [
//       table.createDataColumn("date_of_birth", {
//         id: "Date of Birth",
//         cell: (props) => new Date(props.getValue()).toDateString(),
//       }),
//       table.createDataColumn("date_of_admission", {
//         id: "Date of Admission",
//         cell: (props) => new Date(props.getValue()).toDateString(),
//       }),
//     ],
//   }),
// ];






const BasicTable = () => {
  const [data, setData] = useState([...defaultData]);
  const [columns, setColumns] = useState([]);
  const [expanded, setExpanded] = useState({});
const [defaultColumns, setdefaultColumns] = useState([])
  

  useEffect( () => {
    callApi() 
    }, []);
  
  
    const callApi = async() =>{
      // try {
      //   const response = await axios.post("https://event-manager.tech:3000/api/v1/groups/create-group-report", {
      //     startDate: "",
      //     endDate: "",
      //     groups: ["64f0359ee7ee39aa2bfab9f5","64f03572e7ee39aa2bfab9dd"],
      //     filters: ["name", "description", "Number of Subgroups", "Average Count"],
      //   }, {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });
      
      //   const data = response.data;
      //   console.log(data,"data")
      //   const firstObjectKeys = Object.keys(data.data[0]);
      //   console.log(firstObjectKeys,"firstObjectKeys")

      //   console.log(data, "report data 1");
      //   setData(data)
      //   const defaultColumn  = [
  
      //     table.createDataColumn("name", {
      //       id: "name",
      //     }),
      //     table.createDataColumn("description", {
      //       id: "description",
      //     }),     table.createDataColumn("Number of Subgroup", {
      //       id: "Number of Subgroup",
      //     }),     table.createDataColumn("Average Count", {
      //       id: "Average Count",
      //     }),   

      //    ]

      //   console.log(defaultColumn,"defaultColumn")
      //   setColumns(defaultColumn)
      // } catch (error) {
      //   console.log(error);
      // }
      
    }
  

  const instance = useTableInstance(table, {
    data,
    columns,
    state: {
      expanded: expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });
  console.log(instance.getRowModel());




  return (
    <div>
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