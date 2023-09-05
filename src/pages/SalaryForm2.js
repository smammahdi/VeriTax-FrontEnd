import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm, useField, splitFormProps } from 'react-form';
import { useTable } from 'react-table';

const TableInput = (props) => {
    console.log('TableInput', props);
    const { column, row, cell, updateData } = props;
    const onChange = (e) => updateData(row.index, column.id, e.target.value);
    return <input type="text" value={cell.value} onChange={onChange} />;
};

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    th,
    td {
        width: 30%;
        text-align: center;
        border: 1px solid lightgray;
        padding: 5px;
    }
`;
const ReactTable = React.memo((props) => {
    // console.log('ReactTable', props);

    const { setNetTaxableIncome } = props;

    const columns = React.useMemo(
        () => [
            {
                Header: 'Pay and Allowance',
                accessor: 'payAndAllowance',
            },
            {
                Header: 'Amount of Income (Tk.)',
                accessor: 'incomeAmount',
                Cell: TableInput,
            },
            {
                Header: 'Amount of Exempted Income (Tk.)',
                accessor: 'exemptedAmount',
                Cell: TableInput,
            },
            {
                Header: 'Net Taxable Income (Tk.)',
                accessor: (row) =>
                    Number(row.incomeAmount) - Number(row.exemptedAmount),
                id: 'netTaxableAmount',
            },
        ],
        []
    );
    const initialData = [
        {
            payAndAllowance: 'Basic Pay',
            incomeAmount: '0',
            exemptedAmount: '0',
        },
        {
            payAndAllowance: 'Special Pay',
            incomeAmount: '0',
            exemptedAmount: '0',
        },
        {
            payAndAllowance: 'Conveyance Allowance',
            incomeAmount: '0',
            exemptedAmount: '0',
        },
        {
            payAndAllowance: 'House Rent Allowance',
            incomeAmount: '0',
            exemptedAmount: '0',
        },
        {
            payAndAllowance: 'Medical Allowance',
            incomeAmount: '0',
            exemptedAmount: '0',
        },
        {
            payAndAllowance: 'Overtime Allowance',
            incomeAmount: '0',
            exemptedAmount: '0',
        },
    ];
    const [data, setData] = React.useState(initialData);
    const resetData = () => setData(initialData);
    const updateData = (rowIndex, columnID, value) => {
        setData((oldData) =>
            oldData.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...oldData[rowIndex],
                        [columnID]: value,
                    };
                }
                return row;
            })
        );
    };
    const table = useTable({ columns, data, updateData });
    const { getTableProps, headerGroups, rows, prepareRow } = table;
    const tableSum = rows.reduce(
        (sum, row) => sum + Number(row.values.netTaxableAmount),
        0
    );
    console.log('setNetTaxableIncome', tableSum);
    setNetTaxableIncome(tableSum.toLocaleString('en-IN'));
    return (
        <>
            <StyledTable {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                    <tr>
                        <td colSpan={4}>
                            <button type="button" onClick={resetData}>
                                Reset Table
                            </button>
                        </td>
                    </tr>
                </tbody>
            </StyledTable>
        </>
    );
});

const StyledInput = styled.input`
    flex: 1 1 auto;
    margin: 5px;
    padding: 5px;
`;
const FormInput = React.forwardRef((props, ref) => {
    console.log('FormInput', props);
    const [field, fieldOptions, rest] = splitFormProps(props);
    const inputField = useField(field, fieldOptions);
    const { meta, getInputProps } = inputField;
    const { error, isTouched, isValidating } = meta;
    return (
        <>
            <StyledInput
                key={props.field}
                {...getInputProps({ ref, ...rest })}
            />
            {isValidating ? (
                <em>Validating...</em>
            ) : isTouched && error ? (
                <em>{error}</em>
            ) : null}
        </>
    );
});

const FormStyles = styled.div`
    form {
        margin: 10px;
        label {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        aside {
            display: flex;
            justify-content: space-between;
        }
        section {
            flex: 1 1 auto;
            display: flex;
            flex-flow: column nowrap;
        }
        button {
            margin: 5px;
            padding: 5px;
            width: 100px;
            align-self: flex-end;
        }
    }
`;
const ReactForm = (props) => {
    const { netTaxableAmount, setNetTaxableIncome } = props;

    const onSubmit = async (values, instance) => {
        console.log('Form values:', values);
        instance.reset();
    };
    const form = useForm({ onSubmit });
    const { Form, values, meta } = form;
    const { isSubmitting, canSubmit } = meta;
    const required = React.useCallback(
        (value) => (!value ? 'Required!' : false),
        []
    );
    return (
        <FormStyles>
            <Form>
                <ReactTable setNetTaxableIncome={setNetTaxableIncome} />
                <br />
                <aside>
                    <section>
                        {isSubmitting ? 'Submitting...' : null}
                        <button type="submit" disabled={!canSubmit}>
                            Reset Form
                        </button>
                    </section>
                </aside>
            </Form>
        </FormStyles>
    );
};

const Main = styled.main`
    border-radius: 5px;
    padding: 10px;
    background: white;
    h1 {
        text-align: center;
    }
`;
const SalaryForm2 = () => {
    console.log('Salary Form');
    const [netTaxableIncome, setNetTaxableIncome] = useState('');
    return (
        <Main>
            <h1>Salary Form</h1>
            <ReactForm
                netTaxableAmount={netTaxableIncome}
                setNetTaxableIncome={setNetTaxableIncome}
            />
            <p>Net Taxable Income: {netTaxableIncome}</p>
        </Main>
    );
};

export default SalaryForm2;
