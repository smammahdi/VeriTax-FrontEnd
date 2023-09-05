import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm, useField, splitFormProps } from 'react-form';
import { useTable } from 'react-table';
import numeral from 'numeral'; // Import the currency formatting library
import { useNavigate } from 'react-router-dom';

const CurrencyInput = (props) => {
    // console.log('currencyInput', props);

    const { column, row, cell, updateData } = props;
    const [currencyValue, setCurrencyValue] = useState(cell.value);

    // function formatIndianStyle(number) {
    //     const strNumber = String(number); // Convert the number to a string
    //     const parts = strNumber.split('.');
    //     const integerPart = parts[0];
    //     const decimalPart = parts[1] || '';

    //     const integerFormatted = integerPart.replace(
    //         /\d(?=(\d{2})+(?!\d))/g,
    //         '$&,'
    //     ); // Add a comma every two digits starting from three digits from the right

    //     // Include decimal part only if it exists
    //     const formattedNumber = decimalPart
    //         ? `${integerFormatted}.${decimalPart}`
    //         : integerFormatted;

    //     return formattedNumber;
    // }

    const handleCurrencyChange = (e) => {
        const inputValue = e.target.value;

        // Parse the input value using numeral
        const parsedValue = numeral(inputValue).value() || 0; // Default to 0 if parsing fails

        setCurrencyValue(parsedValue);

        updateData(row.index, column.id, parsedValue);
    };

    // const formatter = new Intl.NumberFormat('en-IN', {
    //     style: 'currency',
    //     currency: 'BDT',
    // });

    return (
        <input
            type="text"
            value={new Intl.NumberFormat('en-IN', {
                maximumSignificantDigits: 3,
            }).format(currencyValue)} // Format the displayed value
            // value={formatter.format(currencyValue)} // Format the displayed value
            onChange={handleCurrencyChange}
        />
    );
};

const TableInput = (props) => {
    // console.log('TableInput', props);
    // const { column, row, cell, updateData } = props;
    // const onChange = (e) => updateData(row.index, column.id, e.target.value);
    return <CurrencyInput {...props} />;
    // return <input type="text" value={cell.value} onChange={onChange} />;
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

/**
 * Parse a localized number to a float.
 * @param {string} stringNumber - the localized number
 * @param {string} locale - [optional] the locale that the number is represented in. Omit this parameter to use the current locale.
 */
function parseLocaleNumber(stringNumber, locale) {
    var thousandSeparator = Intl.NumberFormat(locale)
        .format(11111)
        .replace(/\p{Number}/gu, '');
    var decimalSeparator = Intl.NumberFormat(locale)
        .format(1.1)
        .replace(/\p{Number}/gu, '');

    return parseFloat(
        stringNumber
            .replace(new RegExp('\\' + thousandSeparator, 'g'), '')
            .replace(new RegExp('\\' + decimalSeparator), '.')
    );
}

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
                    new Intl.NumberFormat('en-IN', {
                        maximumSignificantDigits: 3,
                    }).format(
                        Number(row.incomeAmount) - Number(row.exemptedAmount)
                    ),
                id: 'netTaxableAmount',
            },
        ],
        []
    );

    // const [data, setData] = React.useState(initialData);
    const { data, setData, initialData } = props;
    // setData(initialData);
    // console.log('initialData', initialData);
    // console.log('test', typeof initialData);
    // console.log('data1', data);
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
        (sum, row) =>
            sum + parseLocaleNumber(row.values.netTaxableAmount, 'en-IN'),
        0
    );
    // console.log('setNetTaxableIncome', tableSum);
    setNetTaxableIncome(tableSum.toLocaleString('en-IN'));

    // console.log('data', data);

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
                    {/* <tr>
                        <td colSpan={4}>
                            <button type="button" onClick={resetData}>
                                Reset Form
                            </button>
                        </td>
                    </tr> */}
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
    // console.log('FormInput', props);
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
    const navigate = useNavigate();

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

    const [data, setData] = useState(initialData);

    const onSubmit = async (values, instance) => {
        // console.log('Form values:', values);
        instance.reset();
    };
    const form = useForm({ onSubmit });
    const { Form, values, meta } = form;
    const { isSubmitting, canSubmit } = meta;
    const required = React.useCallback(
        (value) => (!value ? 'Required!' : false),
        []
    );

    const handleFormSubmit = async (e) => {
        e.preventDefault(); // default action is reloading the page, so preventing it

        console.log('form submitted', data);
    };

    const handleFormReset = async (e) => {
        e.preventDefault(); // default action is reloading the page, so preventing it

        // setData(initialData);

        console.log('form reset', initialData);
        navigate('/salary2');
    };

    return (
        <FormStyles>
            <Form onSubmit={handleFormSubmit}>
                <ReactTable
                    setNetTaxableIncome={setNetTaxableIncome}
                    data={data}
                    setData={setData}
                    initialData={initialData}
                />
                <br />
                <aside>
                    <section>
                        {/* {isSubmitting ? 'Submitting...' : null} */}
                        {/* <button type="submit" disabled={!canSubmit}> */}
                        <button>Submit Form</button>
                        {/* <button onClick={handleFormReset}>Reset Form</button> */}
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
const SalaryForm = () => {
    // console.log('Salary Form');
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

export default SalaryForm;
