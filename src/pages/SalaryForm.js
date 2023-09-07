import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useForm, useField, splitFormProps } from 'react-form';
import { useTable } from 'react-table';
import numeral from 'numeral'; // Import the currency formatting library
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import '../css/salary.css';

const CurrencyInput = (props) => {
    // console.log('currencyInput', props);

    const {
        column,
        row,
        cell,
        updateData,
        data,
        exemptionRates,
        setFormError,
    } = props;
    const [currencyValue, setCurrencyValue] = useState(cell.value);
    const cellPosition = {
        x: row.index,
        y: column.id,
    };

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

    const calcExemption = (idx, income) => {
        const calcSpecific = (ob) => {
            return Math.min(ob.ceil, Math.floor((income * ob.rate) / 100));
        };

        let ret = 0;
        if (idx === 0) {
            // basic pay
            ret = calcSpecific(exemptionRates.basicPay);
        } else if (idx === 1) {
            // special pay
            ret = calcSpecific(exemptionRates.specialPay);
        } else if (idx === 2) {
            // conveyance allowance
            ret = calcSpecific(exemptionRates.conveyanceAllowance);
        } else if (idx === 3) {
            // house rent allowance
            ret = calcSpecific(exemptionRates.houseRentAllowance);
        } else if (idx === 4) {
            // medical allowance
            ret = calcSpecific(exemptionRates.medicalAllowance);
        } else if (idx === 5) {
            // overtime allowance
            ret = calcSpecific(exemptionRates.overtimeAllowance);
        }
        return ret;
    };

    const handleCurrencyChange = (e) => {
        const inputValue = e.target.value;

        // Parse the input value using numeral
        const parsedValue = numeral(inputValue).value() || 0; // Default to 0 if parsing fails
        console.log('parsedValue', inputValue, parsedValue);
        console.log(
            'formatter',
            new Intl.NumberFormat('en-IN', {
                maximumSignificantDigits: 3,
            }).format(parsedValue)
        );

        // console.log(typeof parsedValue, typeof data[row.index].incomeAmount);

        if (column.id === 'incomeAmount') {
            setCurrencyValue(parsedValue);
            updateData(row.index, column.id, parsedValue);

            // calculate exemption
            const exemption = calcExemption(row.index, parsedValue);
            console.log('exemption', row.index, parsedValue, exemption);
            updateData(row.index, 'exemptedAmount', exemption);
            console.log('data', data);
            setFormError('');
        } else {
            // exemptedAmount
            if (parsedValue <= data[row.index].incomeAmount) {
                setCurrencyValue(parsedValue);

                updateData(row.index, column.id, parsedValue);

                if (
                    parsedValue >
                    calcExemption(row.index, data[row.index].incomeAmount)
                ) {
                    setFormError(
                        'Warning: Claimed exemption exceeds allowable exemption'
                    );
                } else {
                    setFormError('');
                }
            } else {
                // setFormError('Exemption cannot exceed Income');
                setFormError(
                    'Warning: Claimed exemption exceeds allowable exemption'
                );
            }
        }

        // if (
        //     column.id != 'exemptedAmount' ||
        //     parsedValue <= data[row.index].incomeAmount
        // ) {
        //     setCurrencyValue(parsedValue);

        //     updateData(row.index, column.id, parsedValue);
        //     console.log('updateData', row.index, column.id, parsedValue);
        // }
    };

    // const formatter = new Intl.NumberFormat('en-IN', {
    //     style: 'currency',
    //     currency: 'BDT',
    // });

    return (
        <input
            type="text"
            // value={currencyValue} // Format the displayed value
            value={data[cellPosition.x][cellPosition.y]}
            // value={new Intl.NumberFormat('en-IN', {
            //     maximumSignificantDigits: 3,
            // }).format(data[cellPosition.x][cellPosition.y])} // Format the displayed value
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
    console.log('ReactTable', props);
    console.log('test2', props.netTaxableAmount);

    const { setNetTaxableIncome, exemptionRates } = props;

    const { netTaxableAmount } = props;

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
                Header: 'Exemption Rate (%)',
                accessor: 'exemptionRate',
            },
            {
                Header: 'Exemption Ceil (Tk.)',
                accessor: 'exemptionCeil',
            },
            {
                Header: 'Net Taxable Income (Tk.)',
                accessor: (row) =>
                    // new Intl.NumberFormat('en-IN', {
                    //     maximumSignificantDigits: 3,
                    // }).format(
                    //     Number(row.incomeAmount) - Number(row.exemptedAmount)
                    // ),
                    Number(row.incomeAmount) - Number(row.exemptedAmount),
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
    // const resetData = () => setData(initialData);
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

    const [formError, setFormError] = useState('');

    const table = useTable({
        columns,
        data,
        updateData,
        exemptionRates,
        setFormError,
    });
    const { getTableProps, headerGroups, rows, prepareRow } = table;
    // const tableSum = rows.reduce(
    //     (sum, row) =>
    //         sum + parseLocaleNumber(row.values.netTaxableAmount, 'en-IN'),
    //     0
    // );
    const tableSum = rows.reduce(
        (sum, row) => sum + Number(row.values.netTaxableAmount),
        0
    );
    // console.log('setNetTaxableIncome', tableSum);
    setNetTaxableIncome(tableSum.toLocaleString('en-IN'));

    // console.log('data', data);

    return (
        <>
            <table className="centred-table">
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
                        {/* <td colSpan={4}> */}
                        <td>
                            {/* <button type="button" onClick={resetData}>
                                Reset Form
                            </button> */}
                            Net Taxable Amount
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{props.netTaxableAmount}</td>
                    </tr>
                    <tr>
                        <td colSpan={6}>{formError}</td>
                    </tr>
                </tbody>
            </table>
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
    console.log('ReactForm', props);
    console.log('test', props.netTaxableAmount);

    const { setNetTaxableIncome, auth, exemptionRates } = props;
    console.log('test3', props.exemptionRates);
    // const navigate = useNavigate();

    // const { netTaxableAmount } = props;

    // const netTaxableAmount = props.netTaxableAmount;

    const initialData = React.useMemo(
        () => [
            {
                payAndAllowance: 'Basic Pay',
                incomeAmount: '0',
                exemptedAmount: '0',
                exemptionRate: props.exemptionRates
                    ? props.exemptionRates.basicPay.rate
                    : '0',
                exemptionCeil: props.exemptionRates
                    ? props.exemptionRates.basicPay.ceil
                    : '20000',
            },
            {
                payAndAllowance: 'Special Pay',
                incomeAmount: '0',
                exemptedAmount: '0',
                exemptionRate: props.exemptionRates
                    ? props.exemptionRates.specialPay.rate
                    : '4.5',
                exemptionCeil: props.exemptionRates
                    ? props.exemptionRates.specialPay.ceil
                    : '20000',
            },
            {
                payAndAllowance: 'Conveyance Allowance',
                incomeAmount: '0',
                exemptedAmount: '0',
                exemptionRate: props.exemptionRates
                    ? props.exemptionRates.conveyanceAllowance.rate
                    : '7.5',
                exemptionCeil: props.exemptionRates
                    ? props.exemptionRates.conveyanceAllowance.ceil
                    : '20000',
            },
            {
                payAndAllowance: 'House Rent Allowance',
                incomeAmount: '0',
                exemptedAmount: '0',
                exemptionRate: props.exemptionRates
                    ? props.exemptionRates.houseRentAllowance.rate
                    : '15',
                exemptionCeil: props.exemptionRates
                    ? props.exemptionRates.houseRentAllowance.ceil
                    : '20000',
            },
            {
                payAndAllowance: 'Medical Allowance',
                incomeAmount: '0',
                exemptedAmount: '0',
                exemptionRate: props.exemptionRates
                    ? props.exemptionRates.medicalAllowance.rate
                    : '30',
                exemptionCeil: props.exemptionRates
                    ? props.exemptionRates.medicalAllowance.ceil
                    : '20000',
            },
            {
                payAndAllowance: 'Overtime Allowance',
                incomeAmount: '0',
                exemptedAmount: '0',
                exemptionRate: props.exemptionRates
                    ? props.exemptionRates.overtimeAllowance.rate
                    : '12',
                exemptionCeil: props.exemptionRates
                    ? props.exemptionRates.overtimeAllowance.ceil
                    : '20000',
            },
        ],
        []
    );

    // useEffect(() => {
    //     const buildInitialData = () => {

    //     }
    // }, []);

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

        try {
            const description = {
                username: auth.user,
                basicPay: {
                    amount: data[0].incomeAmount,
                    exemption: data[0].exemptedAmount,
                },
                specialPay: {
                    amount: data[1].incomeAmount,
                    exemption: data[1].exemptedAmount,
                },
                conveyanceAllowance: {
                    amount: data[2].incomeAmount,
                    exemption: data[2].exemptedAmount,
                },
                houseRentAllowance: {
                    amount: data[3].incomeAmount,
                    exemption: data[3].exemptedAmount,
                },
                medicalAllowance: {
                    amount: data[4].incomeAmount,
                    exemption: data[4].exemptedAmount,
                },
                overtimeAllowance: {
                    amount: data[5].incomeAmount,
                    exemption: data[5].exemptedAmount,
                },
            };
            const body = { description };
            await fetch('', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            console.log('form submitted', data);

            // window.location = '/'; // refreshes the form input
        } catch (error) {
            console.error(error.message);
        }
    };

    // const handleFormReset = async (e) => {
    //     e.preventDefault(); // default action is reloading the page, so preventing it

    //     // setData(initialData);

    //     console.log('form reset', initialData);
    //     navigate('/salary2');
    // };

    return (
        <FormStyles>
            <Form onSubmit={handleFormSubmit}>
                <ReactTable
                    setNetTaxableIncome={setNetTaxableIncome}
                    data={data}
                    setData={setData}
                    initialData={initialData}
                    exemptionRates={exemptionRates}
                    netTaxableAmount={props.netTaxableAmount}
                />
                <br />
                <aside>
                    <section>
                        {/* {isSubmitting ? 'Submitting...' : null} */}
                        {/* <button type="submit" disabled={!canSubmit}> */}
                        <button disabled style={{ width: '200px' }}>
                            Submit Form
                        </button>
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
    const { auth } = useAuth();
    const [netTaxableIncome, setNetTaxableIncome] = useState('');
    const [exemptionRates, setExemptionRates] = useState();

    useEffect(async () => {
        try {
            const response = await axios.get(
                '/exemption',
                JSON.stringify({ year: '2022' }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );

            console.log(response.data);
            setExemptionRates(response.data);
        } catch (error) {
            console.error(error.message);
            const exemptionRatesResponse = {
                basicPay: {
                    ceil: 20000,
                    rate: 0,
                },
                specialPay: {
                    ceil: 20000,
                    rate: 4.5,
                },
                conveyanceAllowance: {
                    ceil: 20000,
                    rate: 7.5,
                },
                houseRentAllowance: {
                    ceil: 20000,
                    rate: 15,
                },
                medicalAllowance: {
                    ceil: 20000,
                    rate: 30,
                },
                overtimeAllowance: {
                    ceil: 20000,
                    rate: 12,
                },
            };

            setExemptionRates(exemptionRatesResponse);
        }
    }, []);

    console.log('exemptionRates in salary form', exemptionRates);

    return (
        <Main>
            <h1>Salary Form</h1>
            <div className="center-container">
                <ReactForm
                    netTaxableAmount={netTaxableIncome}
                    setNetTaxableIncome={setNetTaxableIncome}
                    auth={auth}
                    exemptionRates={exemptionRates}
                />
            </div>
            {/* <p>Net Taxable Income: {netTaxableIncome}</p> */}
        </Main>
    );
};

export default SalaryForm;
