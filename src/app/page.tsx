"use client";
import { Table, Column,ColumnGroup, HeaderCell, Cell, SortType } from 'rsuite-table';
import ArrowUpLineIcon from '@rsuite/icons/ArrowUpLine';
import ArrowDownLineIcon from '@rsuite/icons/ArrowDownLine';
import SortIcon from '@rsuite/icons/Sort';
import 'rsuite-table/dist/css/rsuite-table.css';
import React from 'react';
import {user} from "../app/data"

export interface User {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  last_sign_in_at: string | null;
  created_at: string | null;
  conversations_count: number | null;
}



export default function Home() {
  const [sortColumn, setSortColumn] = React.useState<string>('');
  const [sortType, setSortType] = React.useState<SortType>('asc');
  const [loading, setLoading] = React.useState(false);
  // const [data,setData]=React.useState<User>(user);

  const sortData = () => {
    if (sortColumn && sortType) {
    const sortedData = [...user].sort((a, b) => {
      const aValue = a[sortColumn as keyof User];
      const bValue = b[sortColumn as keyof User];
  
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortType === 'asc' ? aValue - bValue : bValue - aValue;
      } else if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortType === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      return 0; // If types don't match, treat as equal
    });
    console.log("sortedData",sortedData)
    return sortedData;
    
    }
    return user;
  };
  
  
  const handleSortColumn = (sortColumn:string, sortType?: SortType ) => {
    setLoading(true);
  
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      sortType && setSortType(sortType);
    }, 500);
  };
  
  const renderSortIcon = (sortType?:SortType ) => {
    // console.log(sortType);
    const iconStyle = { fontSize: 18 };
  
    if (sortType === 'asc') {
      return <ArrowUpLineIcon style={iconStyle} />;
    } else if (sortType === 'desc') {
      return <ArrowDownLineIcon style={iconStyle} />;
    }
  
    return <SortIcon style={iconStyle} />;
  };



  return (
    <Table
     style={{border:'1px solid red'}}
    height={400}
    headerHeight={80}
    bordered
    cellBordered
    data={sortData()}
    sortColumn={sortColumn}
    sortType={sortType}
    onSortColumn={handleSortColumn}
    loading={loading}
    onRowClick={data => {
      console.log(data);
    }}
  >
    <Column minWidth={300}  flexGrow={2} align="center" fixed sortable verticalAlign="middle">
      <HeaderCell>Id</HeaderCell>
      <Cell dataKey="first_name" >{rowData => (
            <div style={{display:"flex" , flexDirection:"column"}}>
         <div> {rowData.first_name} {rowData.last_name}</div>
          <div>
          {rowData.email}
          </div>
            </div>
          )}</Cell>
    </Column>

    <Column minWidth={300}  flexGrow={2} fixed sortable verticalAlign="middle">
      <HeaderCell renderSortIcon={renderSortIcon}>
        First Name
     
      </HeaderCell>
      <Cell dataKey="conversations_count" />
    </Column>
    <Column minWidth={300}  flexGrow={2} sortable verticalAlign="middle">
      <HeaderCell>Last Name</HeaderCell>
      <Cell dataKey={"last_sign_in_at"} />
    </Column>
    
      <Column minWidth={300}  flexGrow={2} sortable >
        <HeaderCell  renderSortIcon={renderSortIcon}>
          City 
        </HeaderCell>
        <Cell dataKey="last_name" />
      </Column>
    
  
  </Table>
  );
}
