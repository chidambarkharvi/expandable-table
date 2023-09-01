import React, { useState, useEffect } from "react";
import {
  createTable,
  useTableInstance,
  getCoreRowModel,
  getExpandedRowModel,
} from "@tanstack/react-table";
import jsPDF from "jspdf";
import html2pdf from "html2pdf.js";
import axios from "axios";

const table = createTable();

const PDFDownloadLink = ({ tableId, fileName }) => {
  const handleDownload = () => {
    const table = document.getElementById(tableId);
    const pdfOptions = {
      margin: [10, 10],
      filename: fileName,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "letter", orientation: "landscape" },
    };

    html2pdf().from(table).set(pdfOptions).save();
  };

  return <button onClick={handleDownload}>Download PDF</button>;
};

const predefinedColumns = [
  table.createDataColumn("name", {
    id: "name",
  }),
  table.createDataColumn("description", {
    id: "description",
  }),
  table.createDataColumn("Number of subRows", {
    id: "Number of subRows",
  }),
  table.createDataColumn("Average Count", {
    id: "Average Count",
  }),
  table.createDataColumn("count", {
    id: "count",
  }),
];

const BasicTable = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    callApi();
  }, []);

  const callApi = async () => {
    try {
      const response = await axios.post(
        "https://event-manager.tech:3000/api/v1/groups/create-group-report",
        {
          startDate: "",
          endDate: "",
          groups: ["64f0359ee7ee39aa2bfab9f5", "64f03572e7ee39aa2bfab9dd"],
          filters: [
            "name",
            "description",
            "Number of Subgroups",
            "Average Count",
            "count",
            "subRows",
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = response.data;
      setData(responseData);
      if (responseData && responseData.length > 0) {
        const newColumns = createColumns(responseData[0]);
        setColumns([...predefinedColumns, ...newColumns]);
      }
      console.log(responseData, "report data");
    } catch (error) {
      console.log(error);
    }
  };

  const createColumns = (sampleRow) => {
    return Object.keys(sampleRow).map((key) => {
      return table.createDataColumn(key, {
        id: key,
      });
    });
  };

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

  return (
    <div>
      <PDFDownloadLink tableId="studentTable" fileName="student_data.pdf" />
      <table
        style={{ borderCollapse: "collapse", width: "100%" }}
        id="studentTable"
        border={1}
      >
        <thead>
          {instance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  style={tableHeaderStyle}
                  key={header.id}
                  colSpan={header.colSpan}
                >
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
                <td style={tableCellStyle} key={cell.id}>
                  {cell.renderCell()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const tableHeaderStyle = {
  background: "#f2f2f2",
  padding: "4px",
  border: "1px solid #ddd",
  textAlign: "left",
  fontWeight: "bold",
};

const tableCellStyle = {
  padding: "4px",
  border: "1px solid #ddd",
  textAlign: "left",
};

export default BasicTable;
